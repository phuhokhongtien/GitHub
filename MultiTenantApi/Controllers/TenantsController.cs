using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MultiTenantApi.Data;
using MultiTenantApi.DTOs;
using MultiTenantApi.Models;
using System.Security.Claims;

namespace MultiTenantApi.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TenantsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public TenantsController(ApplicationDbContext context)
    {
        _context = context;
    }

    private int GetCurrentUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        return int.Parse(userIdClaim!);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TenantDto>>> GetMyTenants()
    {
        var userId = GetCurrentUserId();

        var memberships = await _context.TenantMemberships
            .Include(m => m.Tenant)
            .Where(m => m.UserId == userId && m.IsActive)
            .ToListAsync();

        var tenants = memberships.Select(m => new TenantDto
        {
            Id = m.Tenant.Id,
            Name = m.Tenant.Name,
            Description = m.Tenant.Description,
            Slug = m.Tenant.Slug,
            CreatedAt = m.Tenant.CreatedAt,
            IsActive = m.Tenant.IsActive,
            OwnerId = m.Tenant.OwnerId,
            UserRole = m.Role
        });

        return Ok(tenants);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TenantDto>> GetTenant(int id)
    {
        var userId = GetCurrentUserId();

        var membership = await _context.TenantMemberships
            .Include(m => m.Tenant)
            .FirstOrDefaultAsync(m => m.TenantId == id && m.UserId == userId && m.IsActive);

        if (membership == null)
        {
            return NotFound(new { message = "Tenant not found or access denied" });
        }

        var tenant = new TenantDto
        {
            Id = membership.Tenant.Id,
            Name = membership.Tenant.Name,
            Description = membership.Tenant.Description,
            Slug = membership.Tenant.Slug,
            CreatedAt = membership.Tenant.CreatedAt,
            IsActive = membership.Tenant.IsActive,
            OwnerId = membership.Tenant.OwnerId,
            UserRole = membership.Role
        };

        return Ok(tenant);
    }

    [HttpPost]
    public async Task<ActionResult<TenantDto>> CreateTenant(CreateTenantRequest request)
    {
        var userId = GetCurrentUserId();

        if (await _context.Tenants.AnyAsync(t => t.Slug == request.Slug))
        {
            return BadRequest(new { message = "Slug already exists" });
        }

        var tenant = new Tenant
        {
            Name = request.Name,
            Description = request.Description,
            Slug = request.Slug,
            OwnerId = userId
        };

        _context.Tenants.Add(tenant);
        await _context.SaveChangesAsync();

        var membership = new TenantMembership
        {
            UserId = userId,
            TenantId = tenant.Id,
            Role = TenantRole.Owner
        };

        _context.TenantMemberships.Add(membership);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetTenant),
            new { id = tenant.Id },
            new TenantDto
            {
                Id = tenant.Id,
                Name = tenant.Name,
                Description = tenant.Description,
                Slug = tenant.Slug,
                CreatedAt = tenant.CreatedAt,
                IsActive = tenant.IsActive,
                OwnerId = tenant.OwnerId,
                UserRole = TenantRole.Owner
            });
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<TenantDto>> UpdateTenant(int id, UpdateTenantRequest request)
    {
        var userId = GetCurrentUserId();

        var membership = await _context.TenantMemberships
            .Include(m => m.Tenant)
            .FirstOrDefaultAsync(m => m.TenantId == id && m.UserId == userId && m.IsActive);

        if (membership == null)
        {
            return NotFound(new { message = "Tenant not found or access denied" });
        }

        if (membership.Role != TenantRole.Owner && membership.Role != TenantRole.Admin)
        {
            return Forbid();
        }

        if (request.Name != null)
        {
            membership.Tenant.Name = request.Name;
        }

        if (request.Description != null)
        {
            membership.Tenant.Description = request.Description;
        }

        membership.Tenant.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(new TenantDto
        {
            Id = membership.Tenant.Id,
            Name = membership.Tenant.Name,
            Description = membership.Tenant.Description,
            Slug = membership.Tenant.Slug,
            CreatedAt = membership.Tenant.CreatedAt,
            IsActive = membership.Tenant.IsActive,
            OwnerId = membership.Tenant.OwnerId,
            UserRole = membership.Role
        });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTenant(int id)
    {
        var userId = GetCurrentUserId();

        var tenant = await _context.Tenants
            .FirstOrDefaultAsync(t => t.Id == id && t.OwnerId == userId);

        if (tenant == null)
        {
            return NotFound(new { message = "Tenant not found or you are not the owner" });
        }

        tenant.IsActive = false;
        tenant.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpGet("{id}/members")]
    public async Task<ActionResult<IEnumerable<TenantMemberDto>>> GetTenantMembers(int id)
    {
        var userId = GetCurrentUserId();

        var userMembership = await _context.TenantMemberships
            .FirstOrDefaultAsync(m => m.TenantId == id && m.UserId == userId && m.IsActive);

        if (userMembership == null)
        {
            return NotFound(new { message = "Tenant not found or access denied" });
        }

        var members = await _context.TenantMemberships
            .Include(m => m.User)
            .Where(m => m.TenantId == id && m.IsActive)
            .Select(m => new TenantMemberDto
            {
                Id = m.Id,
                User = new UserDto
                {
                    Id = m.User.Id,
                    Email = m.User.Email,
                    FirstName = m.User.FirstName,
                    LastName = m.User.LastName
                },
                Role = m.Role,
                JoinedAt = m.JoinedAt,
                IsActive = m.IsActive
            })
            .ToListAsync();

        return Ok(members);
    }

    [HttpPost("{id}/members")]
    public async Task<ActionResult<TenantMemberDto>> AddMember(int id, AddMemberRequest request)
    {
        var userId = GetCurrentUserId();

        var userMembership = await _context.TenantMemberships
            .FirstOrDefaultAsync(m => m.TenantId == id && m.UserId == userId && m.IsActive);

        if (userMembership == null)
        {
            return NotFound(new { message = "Tenant not found or access denied" });
        }

        if (userMembership.Role != TenantRole.Owner && userMembership.Role != TenantRole.Admin)
        {
            return Forbid();
        }

        var newUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

        if (newUser == null)
        {
            return NotFound(new { message = "User not found" });
        }

        var existingMembership = await _context.TenantMemberships
            .FirstOrDefaultAsync(m => m.TenantId == id && m.UserId == newUser.Id);

        if (existingMembership != null)
        {
            return BadRequest(new { message = "User is already a member of this tenant" });
        }

        var membership = new TenantMembership
        {
            UserId = newUser.Id,
            TenantId = id,
            Role = request.Role
        };

        _context.TenantMemberships.Add(membership);
        await _context.SaveChangesAsync();

        return Ok(new TenantMemberDto
        {
            Id = membership.Id,
            User = new UserDto
            {
                Id = newUser.Id,
                Email = newUser.Email,
                FirstName = newUser.FirstName,
                LastName = newUser.LastName
            },
            Role = membership.Role,
            JoinedAt = membership.JoinedAt,
            IsActive = membership.IsActive
        });
    }

    [HttpPut("{id}/members/{memberId}")]
    public async Task<ActionResult<TenantMemberDto>> UpdateMemberRole(int id, int memberId, UpdateMemberRoleRequest request)
    {
        var userId = GetCurrentUserId();

        var userMembership = await _context.TenantMemberships
            .FirstOrDefaultAsync(m => m.TenantId == id && m.UserId == userId && m.IsActive);

        if (userMembership == null)
        {
            return NotFound(new { message = "Tenant not found or access denied" });
        }

        if (userMembership.Role != TenantRole.Owner && userMembership.Role != TenantRole.Admin)
        {
            return Forbid();
        }

        var membership = await _context.TenantMemberships
            .Include(m => m.User)
            .FirstOrDefaultAsync(m => m.Id == memberId && m.TenantId == id);

        if (membership == null)
        {
            return NotFound(new { message = "Member not found" });
        }

        if (membership.Role == TenantRole.Owner && userMembership.Role != TenantRole.Owner)
        {
            return Forbid();
        }

        membership.Role = request.Role;
        await _context.SaveChangesAsync();

        return Ok(new TenantMemberDto
        {
            Id = membership.Id,
            User = new UserDto
            {
                Id = membership.User.Id,
                Email = membership.User.Email,
                FirstName = membership.User.FirstName,
                LastName = membership.User.LastName
            },
            Role = membership.Role,
            JoinedAt = membership.JoinedAt,
            IsActive = membership.IsActive
        });
    }

    [HttpDelete("{id}/members/{memberId}")]
    public async Task<IActionResult> RemoveMember(int id, int memberId)
    {
        var userId = GetCurrentUserId();

        var userMembership = await _context.TenantMemberships
            .FirstOrDefaultAsync(m => m.TenantId == id && m.UserId == userId && m.IsActive);

        if (userMembership == null)
        {
            return NotFound(new { message = "Tenant not found or access denied" });
        }

        if (userMembership.Role != TenantRole.Owner && userMembership.Role != TenantRole.Admin)
        {
            return Forbid();
        }

        var membership = await _context.TenantMemberships
            .FirstOrDefaultAsync(m => m.Id == memberId && m.TenantId == id);

        if (membership == null)
        {
            return NotFound(new { message = "Member not found" });
        }

        if (membership.Role == TenantRole.Owner)
        {
            return BadRequest(new { message = "Cannot remove the owner" });
        }

        membership.IsActive = false;
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
