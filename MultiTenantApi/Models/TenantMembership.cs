using System.ComponentModel.DataAnnotations;

namespace MultiTenantApi.Models;

public enum TenantRole
{
    Owner,
    Admin,
    Member,
    Viewer
}

public class TenantMembership
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int UserId { get; set; }

    public User User { get; set; } = null!;

    [Required]
    public int TenantId { get; set; }

    public Tenant Tenant { get; set; } = null!;

    [Required]
    public TenantRole Role { get; set; } = TenantRole.Member;

    public DateTime JoinedAt { get; set; } = DateTime.UtcNow;

    public bool IsActive { get; set; } = true;
}
