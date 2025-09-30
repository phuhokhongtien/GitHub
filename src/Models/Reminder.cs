using System;

namespace AIPlanningModule.Models
{
    public class Reminder
    {
        public Guid Id { get; set; }
        public Guid TaskId { get; set; }
        public string Message { get; set; }
        public DateTime ScheduledTime { get; set; }
        public ReminderType Type { get; set; }
        public bool IsSent { get; set; }
        public DateTime? SentAt { get; set; }
    }

    public enum ReminderType
    {
        BeforeDeadline,
        DailyDigest,
        WeeklyDigest,
        Contextual
    }
}
