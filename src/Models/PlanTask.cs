using System;

namespace AIPlanningModule.Models
{
    public class PlanTask
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Priority { get; set; }
        public TimeSpan EstimatedDuration { get; set; }
        public DateTime Deadline { get; set; }
        public TaskStatus Status { get; set; }

        public PlanTask Clone()
        {
            return new PlanTask
            {
                Id = this.Id,
                Title = this.Title,
                Description = this.Description,
                Priority = this.Priority,
                EstimatedDuration = this.EstimatedDuration,
                Deadline = this.Deadline,
                Status = this.Status
            };
        }
    }

    public enum TaskStatus
    {
        Pending,
        InProgress,
        Completed,
        Cancelled
    }
}
