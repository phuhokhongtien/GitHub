using System;
using System.Collections.Generic;
using System.Linq;
using AIPlanningModule.Interfaces;
using AIPlanningModule.Models;

namespace AIPlanningModule.Services
{
    public class DataAnalyzer : IDataAnalyzer
    {
        public DataAnalysis AnalyzeUserContext(UserContext userContext)
        {
            if (userContext == null)
                throw new ArgumentNullException(nameof(userContext));

            var recommendations = new List<Recommendation>();
            var insightScores = new Dictionary<string, double>();

            // Analyze goals
            foreach (var goal in userContext.Goals)
            {
                var priority = CalculateGoalPriority(goal, userContext);
                var urgency = CalculateGoalUrgency(goal, userContext);

                recommendations.Add(new Recommendation
                {
                    Title = $"Work on: {goal}",
                    Description = $"Make progress towards your goal: {goal}",
                    Priority = priority,
                    Urgency = urgency,
                    EstimatedDuration = TimeSpan.FromHours(2),
                    Category = "Goal"
                });

                insightScores[goal] = priority * urgency / 100.0;
            }

            // Analyze recent activities for patterns
            var activityPatterns = AnalyzeActivityPatterns(userContext.RecentActivities);
            foreach (var pattern in activityPatterns)
            {
                recommendations.Add(pattern);
            }

            // Cross-MCP data analysis - analyze skill levels vs goals
            var skillGapRecommendations = AnalyzeSkillGaps(userContext);
            recommendations.AddRange(skillGapRecommendations);

            var summary = GenerateSummary(recommendations, userContext);

            return new DataAnalysis
            {
                Recommendations = recommendations,
                InsightScores = insightScores,
                Summary = summary
            };
        }

        private int CalculateGoalPriority(string goal, UserContext userContext)
        {
            // Simple priority calculation based on goal position and preferences
            var baseScore = 5;
            var goalIndex = userContext.Goals.IndexOf(goal);
            return Math.Max(1, Math.Min(10, baseScore + (userContext.Goals.Count - goalIndex)));
        }

        private int CalculateGoalUrgency(string goal, UserContext userContext)
        {
            // Calculate urgency based on recent activities
            var recentlyWorkedOn = userContext.RecentActivities.Any(a => a.Contains(goal, StringComparison.OrdinalIgnoreCase));
            return recentlyWorkedOn ? 3 : 7;
        }

        private List<Recommendation> AnalyzeActivityPatterns(List<string> recentActivities)
        {
            var recommendations = new List<Recommendation>();

            if (recentActivities.Count == 0)
            {
                recommendations.Add(new Recommendation
                {
                    Title = "Start tracking activities",
                    Description = "Begin recording your daily activities for better planning",
                    Priority = 6,
                    Urgency = 5,
                    EstimatedDuration = TimeSpan.FromMinutes(30),
                    Category = "Setup"
                });
            }

            return recommendations;
        }

        private List<Recommendation> AnalyzeSkillGaps(UserContext userContext)
        {
            var recommendations = new List<Recommendation>();

            foreach (var goal in userContext.Goals)
            {
                var relatedSkills = userContext.SkillLevels
                    .Where(s => goal.Contains(s.Key, StringComparison.OrdinalIgnoreCase))
                    .ToList();

                foreach (var skill in relatedSkills.Where(s => s.Value < 5.0))
                {
                    recommendations.Add(new Recommendation
                    {
                        Title = $"Improve {skill.Key} skills",
                        Description = $"Enhance your {skill.Key} proficiency to achieve your goals",
                        Priority = 7,
                        Urgency = 6,
                        EstimatedDuration = TimeSpan.FromHours(1),
                        Category = "Skill Development"
                    });
                }
            }

            return recommendations;
        }

        private string GenerateSummary(List<Recommendation> recommendations, UserContext userContext)
        {
            var highPriorityCount = recommendations.Count(r => r.Priority >= 7);
            var totalTasks = recommendations.Count;

            return $"Generated {totalTasks} personalized recommendations for {userContext.UserId}. " +
                   $"{highPriorityCount} high-priority items identified based on your goals and context.";
        }
    }
}
