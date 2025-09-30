using System;
using System.Collections.Generic;

namespace AIPlanningModule.Models
{
    public class Plan
    {
        public Guid Id { get; set; }
        public PlanType Type { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public List<PlanTask> Tasks { get; set; } = new List<PlanTask>();
        public List<Reminder> Reminders { get; set; } = new List<Reminder>();
        public UserContext UserContext { get; set; }
    }

    public enum PlanType
    {
        Daily,
        Weekly
    }
}
