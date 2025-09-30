using System.Collections.Generic;
using AIPlanningModule.Models;

namespace AIPlanningModule.Interfaces
{
    public interface IReminderEngine
    {
        List<Reminder> CreateReminders(List<PlanTask> tasks, UserContext userContext);
        List<Reminder> UpdateReminders(List<Reminder> existingReminders, List<PlanTask> tasks, UserContext userContext);
    }
}
