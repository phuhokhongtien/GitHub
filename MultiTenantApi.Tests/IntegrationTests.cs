using System.Net;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using MultiTenantApi.Data;
using MultiTenantApi.DTOs;
using MultiTenantApi.Models;

namespace MultiTenantApi.Tests;

/// <summary>
/// Integration tests for the Multi-Tenant API
/// These tests validate the core multi-tenant functionality
/// </summary>
public class IntegrationTests
{
    private readonly WebApplicationFactory<Program> _factory;

    public IntegrationTests()
    {
        _factory = new WebApplicationFactory<Program>().WithWebHostBuilder(builder =>
        {
            builder.ConfigureServices(services =>
            {
                // Remove SQLite and use InMemory database
                var descriptor = services.SingleOrDefault(
                    d => d.ServiceType == typeof(DbContextOptions<ApplicationDbContext>));
                if (descriptor != null) services.Remove(descriptor);

                var dbContextDescriptor = services.SingleOrDefault(
                    d => d.ServiceType == typeof(ApplicationDbContext));
                if (dbContextDescriptor != null) services.Remove(dbContextDescriptor);

                services.AddDbContext<ApplicationDbContext>(options =>
                    options.UseInMemoryDatabase($"IntegrationTest_{Guid.NewGuid()}"));
            });

            builder.UseSetting("ConnectionStrings:DefaultConnection", "");
        });
    }

    [Fact]
    public async Task CompleteUserJourney_RegisterLoginCreateTenant_Success()
    {
        // Arrange
        var client = _factory.CreateClient();
        var email = $"journey{Guid.NewGuid()}@example.com";
        
        // Act 1: Register
        var registerRequest = new RegisterRequest
        {
            Email = email,
            Password = "password123",
            FirstName = "Journey",
            LastName = "Test"
        };
        var registerResponse = await client.PostAsJsonAsync("/api/auth/register", registerRequest);
        
        // Assert 1: Registration succeeds
        Assert.Equal(HttpStatusCode.OK, registerResponse.StatusCode);
        var authResponse = await registerResponse.Content.ReadFromJsonAsync<AuthResponse>();
        Assert.NotNull(authResponse);
        Assert.NotEmpty(authResponse.Token);
        
        // Act 2: Create tenant with token
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", authResponse.Token);
        var createTenantRequest = new CreateTenantRequest
        {
            Name = "Journey Test Company",
            Description = "Integration test tenant",
            Slug = $"journey-test-{Guid.NewGuid()}"
        };
        var createTenantResponse = await client.PostAsJsonAsync("/api/tenants", createTenantRequest);
        
        // Assert 2: Tenant creation succeeds
        Assert.Equal(HttpStatusCode.Created, createTenantResponse.StatusCode);
        var tenant = await createTenantResponse.Content.ReadFromJsonAsync<TenantDto>();
        Assert.NotNull(tenant);
        Assert.Equal(createTenantRequest.Name, tenant.Name);
        Assert.Equal(TenantRole.Owner, tenant.UserRole);
        
        // Act 3: Get user's tenants
        var getTenantsResponse = await client.GetAsync("/api/tenants");
        
        // Assert 3: Can retrieve tenants
        Assert.Equal(HttpStatusCode.OK, getTenantsResponse.StatusCode);
        var tenants = await getTenantsResponse.Content.ReadFromJsonAsync<List<TenantDto>>();
        Assert.NotNull(tenants);
        Assert.Contains(tenants, t => t.Id == tenant.Id);
    }

    [Fact]
    public async Task Authentication_WithoutToken_ReturnsUnauthorized()
    {
        // Arrange
        var client = _factory.CreateClient();

        // Act
        var response = await client.GetAsync("/api/tenants");

        // Assert
        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [Fact]
    public async Task Authentication_InvalidCredentials_ReturnsUnauthorized()
    {
        // Arrange
        var client = _factory.CreateClient();
        var loginRequest = new LoginRequest
        {
            Email = "nonexistent@example.com",
            Password = "wrongpassword"
        };

        // Act
        var response = await client.PostAsJsonAsync("/api/auth/login", loginRequest);

        // Assert
        Assert.Equal(HttpStatusCode.Unauthorized, response.StatusCode);
    }

    [Fact]
    public async Task TenantCreation_ValidData_CreatesWithOwnerRole()
    {
        // Arrange
        var client = _factory.CreateClient();
        var email = $"creator{Guid.NewGuid()}@example.com";
        
        // Register and login
        var registerRequest = new RegisterRequest
        {
            Email = email,
            Password = "password123",
            FirstName = "Creator",
            LastName = "Test"
        };
        var registerResponse = await client.PostAsJsonAsync("/api/auth/register", registerRequest);
        var authResponse = await registerResponse.Content.ReadFromJsonAsync<AuthResponse>();
        
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", authResponse!.Token);
        
        // Act: Create tenant
        var createRequest = new CreateTenantRequest
        {
            Name = "Test Organization",
            Slug = $"test-org-{Guid.NewGuid()}"
        };
        var response = await client.PostAsJsonAsync("/api/tenants", createRequest);
        
        // Assert
        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        var tenant = await response.Content.ReadFromJsonAsync<TenantDto>();
        Assert.NotNull(tenant);
        Assert.Equal(TenantRole.Owner, tenant.UserRole);
        Assert.Equal(authResponse.User.Id, tenant.OwnerId);
    }
}
