using System;

namespace PodNoms.Api.Services.Downloader {
    /// <summary>
    /// The event arguement class for passing when progress event is fired
    /// </summary>
    public class ProgressEventArgs : EventArgs {
        public object ProcessObject { get; set; }
        public decimal Percentage { get; set; }
        public string Error { get; set; }

        public ProgressEventArgs():
            base() {

            }
    }

    /// <summary>
    /// The event arguement class for passing when progress event is fired
    /// </summary>
    public class DownloadEventArgs : EventArgs {
        public object ProcessObject { get; set; }
        public DownloadEventArgs():
            base() {

            }

    }
}