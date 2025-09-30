using AIPlanningModule.Models;

namespace AIPlanningModule.Interfaces
{
    public interface IDataAnalyzer
    {
        DataAnalysis AnalyzeUserContext(UserContext userContext);
    }
}
