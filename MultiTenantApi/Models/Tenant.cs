using System.ComponentModel.DataAnnotations;

namespace MultiTenantApi.Models;

public class Tenant
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? Description { get; set; }

    [Required]
    [MaxLength(50)]
    public string Slug { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    
    public DateTime? UpdatedAt { get; set; }

    public bool IsActive { get; set; } = true;

    [Required]
    public int OwnerId { get; set; }

    public User Owner { get; set; } = null!;

    public ICollection<TenantMembership> TenantMemberships { get; set; } = new List<TenantMembership>();
}
