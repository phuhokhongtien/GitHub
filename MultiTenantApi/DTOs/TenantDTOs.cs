using System.ComponentModel.DataAnnotations;
using MultiTenantApi.Models;

namespace MultiTenantApi.DTOs;

public class CreateTenantRequest
{
    [Required]
    public string Name { get; set; } = string.Empty;

    public string? Description { get; set; }

    [Required]
    public string Slug { get; set; } = string.Empty;
}

public class UpdateTenantRequest
{
    public string? Name { get; set; }
    public string? Description { get; set; }
}

public class TenantDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string Slug { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public bool IsActive { get; set; }
    public int OwnerId { get; set; }
    public TenantRole UserRole { get; set; }
}

public class AddMemberRequest
{
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    public TenantRole Role { get; set; }
}

public class UpdateMemberRoleRequest
{
    [Required]
    public TenantRole Role { get; set; }
}

public class TenantMemberDto
{
    public int Id { get; set; }
    public UserDto User { get; set; } = null!;
    public TenantRole Role { get; set; }
    public DateTime JoinedAt { get; set; }
    public bool IsActive { get; set; }
}
