namespace PodNoms.Api.Models.ViewModels
{
    public class ProcessProgressEvent {
        public double Percentage { get; set; }
        public string TotalSize;
        public string CurrentSpeed { get; set; }
        public string ETA { get; set; }
    }
}