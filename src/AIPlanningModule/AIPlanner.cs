using System;
using System.Collections.Generic;
using System.Linq;
using AIPlanningModule.Interfaces;
using AIPlanningModule.Models;

namespace AIPlanningModule
{
    public class AIPlanner
    {
        private readonly IDataAnalyzer _dataAnalyzer;
        private readonly IReminderEngine _reminderEngine;

        public AIPlanner(IDataAnalyzer dataAnalyzer, IReminderEngine reminderEngine)
        {
            _dataAnalyzer = dataAnalyzer ?? throw new ArgumentNullException(nameof(dataAnalyzer));
            _reminderEngine = reminderEngine ?? throw new ArgumentNullException(nameof(reminderEngine));
        }

        public Plan GenerateDailyPlan(UserContext userContext)
        {
            var analysis = _dataAnalyzer.AnalyzeUserContext(userContext);
            var tasks = GeneratePrioritizedTasks(analysis, PlanType.Daily);
            var reminders = _reminderEngine.CreateReminders(tasks, userContext);

            return new Plan
            {
                Id = Guid.NewGuid(),
                Type = PlanType.Daily,
                CreatedAt = DateTime.UtcNow,
                Tasks = tasks,
                Reminders = reminders,
                UserContext = userContext
            };
        }

        public Plan GenerateWeeklyPlan(UserContext userContext)
        {
            var analysis = _dataAnalyzer.AnalyzeUserContext(userContext);
            var tasks = GeneratePrioritizedTasks(analysis, PlanType.Weekly);
            var reminders = _reminderEngine.CreateReminders(tasks, userContext);

            return new Plan
            {
                Id = Guid.NewGuid(),
                Type = PlanType.Weekly,
                CreatedAt = DateTime.UtcNow,
                Tasks = tasks,
                Reminders = reminders,
                UserContext = userContext
            };
        }

        public Plan AdaptPlan(Plan existingPlan, UserContext updatedContext)
        {
            var analysis = _dataAnalyzer.AnalyzeUserContext(updatedContext);
            var adaptedTasks = RescheduleTasks(existingPlan.Tasks, analysis);
            var updatedReminders = _reminderEngine.UpdateReminders(existingPlan.Reminders, adaptedTasks, updatedContext);

            return new Plan
            {
                Id = existingPlan.Id,
                Type = existingPlan.Type,
                CreatedAt = existingPlan.CreatedAt,
                UpdatedAt = DateTime.UtcNow,
                Tasks = adaptedTasks,
                Reminders = updatedReminders,
                UserContext = updatedContext
            };
        }

        private List<PlanTask> GeneratePrioritizedTasks(DataAnalysis analysis, PlanType planType)
        {
            var tasks = new List<PlanTask>();
            var recommendations = analysis.Recommendations;

            foreach (var recommendation in recommendations.OrderByDescending(r => r.Priority))
            {
                tasks.Add(new PlanTask
                {
                    Id = Guid.NewGuid(),
                    Title = recommendation.Title,
                    Description = recommendation.Description,
                    Priority = recommendation.Priority,
                    EstimatedDuration = recommendation.EstimatedDuration,
                    Deadline = CalculateDeadline(planType, recommendation.Urgency),
                    Status = TaskStatus.Pending
                });
            }

            return tasks;
        }

        private List<PlanTask> RescheduleTasks(List<PlanTask> tasks, DataAnalysis analysis)
        {
            var rescheduledTasks = new List<PlanTask>();

            foreach (var task in tasks.Where(t => t.Status != TaskStatus.Completed))
            {
                var updatedTask = task.Clone();
                var matchingRecommendation = analysis.Recommendations
                    .FirstOrDefault(r => r.Title == task.Title);

                if (matchingRecommendation != null)
                {
                    updatedTask.Priority = matchingRecommendation.Priority;
                    updatedTask.Deadline = CalculateDeadline(PlanType.Daily, matchingRecommendation.Urgency);
                }

                rescheduledTasks.Add(updatedTask);
            }

            return rescheduledTasks;
        }

        private DateTime CalculateDeadline(PlanType planType, int urgency)
        {
            var baseDate = DateTime.UtcNow;
            var daysToAdd = planType == PlanType.Daily ? 1 : 7;
            var urgencyFactor = Math.Max(0.1, 1.0 - (urgency / 10.0));

            return baseDate.AddDays(daysToAdd * urgencyFactor);
        }
    }
}
