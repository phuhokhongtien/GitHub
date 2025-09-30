using System.Collections.Generic;

namespace AIPlanningModule.Models
{
    public class DataAnalysis
    {
        public List<Recommendation> Recommendations { get; set; } = new List<Recommendation>();
        public Dictionary<string, double> InsightScores { get; set; } = new Dictionary<string, double>();
        public string Summary { get; set; }
    }

    public class Recommendation
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public int Priority { get; set; }
        public int Urgency { get; set; }
        public System.TimeSpan EstimatedDuration { get; set; }
        public string Category { get; set; }
    }
}
