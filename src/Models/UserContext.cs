using System;
using System.Collections.Generic;

namespace AIPlanningModule.Models
{
    public class UserContext
    {
        public string UserId { get; set; }
        public List<string> Goals { get; set; } = new List<string>();
        public Dictionary<string, object> Preferences { get; set; } = new Dictionary<string, object>();
        public List<string> RecentActivities { get; set; } = new List<string>();
        public Dictionary<string, double> SkillLevels { get; set; } = new Dictionary<string, double>();
        public TimeZoneInfo TimeZone { get; set; }
        public WorkingHours WorkingHours { get; set; }
    }

    public class WorkingHours
    {
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public List<DayOfWeek> WorkingDays { get; set; } = new List<DayOfWeek>();
    }
}
