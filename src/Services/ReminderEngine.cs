using System;
using System.Collections.Generic;
using System.Linq;
using AIPlanningModule.Interfaces;
using AIPlanningModule.Models;

namespace AIPlanningModule.Services
{
    public class ReminderEngine : IReminderEngine
    {
        public List<Reminder> CreateReminders(List<PlanTask> tasks, UserContext userContext)
        {
            var reminders = new List<Reminder>();

            foreach (var task in tasks)
            {
                // Create deadline reminder
                var deadlineReminder = CreateDeadlineReminder(task, userContext);
                reminders.Add(deadlineReminder);

                // Create contextual reminder based on working hours
                var contextualReminder = CreateContextualReminder(task, userContext);
                if (contextualReminder != null)
                {
                    reminders.Add(contextualReminder);
                }
            }

            // Add daily digest reminder
            var dailyDigest = CreateDailyDigest(tasks, userContext);
            reminders.Add(dailyDigest);

            return reminders;
        }

        public List<Reminder> UpdateReminders(List<Reminder> existingReminders, List<PlanTask> tasks, UserContext userContext)
        {
            var updatedReminders = new List<Reminder>();

            // Keep sent reminders for history
            updatedReminders.AddRange(existingReminders.Where(r => r.IsSent));

            // Create new reminders for updated tasks
            foreach (var task in tasks.Where(t => t.Status != TaskStatus.Completed))
            {
                var existingReminder = existingReminders.FirstOrDefault(r => r.TaskId == task.Id && !r.IsSent);
                
                if (existingReminder != null)
                {
                    // Update existing reminder
                    existingReminder.ScheduledTime = CalculateReminderTime(task, userContext);
                    updatedReminders.Add(existingReminder);
                }
                else
                {
                    // Create new reminder
                    updatedReminders.Add(CreateDeadlineReminder(task, userContext));
                }
            }

            return updatedReminders;
        }

        private Reminder CreateDeadlineReminder(PlanTask task, UserContext userContext)
        {
            var reminderTime = CalculateReminderTime(task, userContext);

            return new Reminder
            {
                Id = Guid.NewGuid(),
                TaskId = task.Id,
                Message = $"Reminder: '{task.Title}' is due soon. Deadline: {task.Deadline:g}",
                ScheduledTime = reminderTime,
                Type = ReminderType.BeforeDeadline,
                IsSent = false
            };
        }

        private Reminder CreateContextualReminder(PlanTask task, UserContext userContext)
        {
            if (userContext.WorkingHours == null)
                return null;

            var now = DateTime.UtcNow;
            var nextWorkingDay = FindNextWorkingDay(now, userContext.WorkingHours);
            var reminderTime = nextWorkingDay.Date.Add(userContext.WorkingHours.StartTime).AddHours(1);

            if (reminderTime > task.Deadline)
                return null;

            return new Reminder
            {
                Id = Guid.NewGuid(),
                TaskId = task.Id,
                Message = $"Good time to work on: '{task.Title}' (Priority: {task.Priority})",
                ScheduledTime = reminderTime,
                Type = ReminderType.Contextual,
                IsSent = false
            };
        }

        private Reminder CreateDailyDigest(List<PlanTask> tasks, UserContext userContext)
        {
            var now = DateTime.UtcNow;
            var digestTime = now.Date.AddDays(1).AddHours(8); // 8 AM next day

            var pendingTasksCount = tasks.Count(t => t.Status == TaskStatus.Pending);
            var highPriorityCount = tasks.Count(t => t.Priority >= 7);

            return new Reminder
            {
                Id = Guid.NewGuid(),
                TaskId = Guid.Empty,
                Message = $"Daily Plan Digest: {pendingTasksCount} tasks pending, {highPriorityCount} high priority",
                ScheduledTime = digestTime,
                Type = ReminderType.DailyDigest,
                IsSent = false
            };
        }

        private DateTime CalculateReminderTime(PlanTask task, UserContext userContext)
        {
            // Remind 2 hours before deadline or at start of working day before deadline
            var twoHoursBefore = task.Deadline.AddHours(-2);
            var now = DateTime.UtcNow;

            if (twoHoursBefore <= now)
                return now.AddMinutes(15);

            if (userContext.WorkingHours != null)
            {
                var deadlineDay = task.Deadline.Date;
                var workStartTime = deadlineDay.Add(userContext.WorkingHours.StartTime);

                if (workStartTime < task.Deadline)
                    return workStartTime;
            }

            return twoHoursBefore;
        }

        private DateTime FindNextWorkingDay(DateTime from, WorkingHours workingHours)
        {
            var current = from.Date;
            
            while (!workingHours.WorkingDays.Contains(current.DayOfWeek))
            {
                current = current.AddDays(1);
            }

            return current;
        }
    }
}
