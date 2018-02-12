using System;
using Newtonsoft.Json;
using PodNoms.Api.Models.ViewModels;
using System.Diagnostics;
using System.Dynamic;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace PodNoms.Api.Services.Downloader {
    public class AudioDownloader {
        private readonly string _url;
        private readonly string _downloader;
        public dynamic Properties { get; private set; }
        protected const string DOWNLOADRATESTRING = "iB/s";
        protected const string DOWNLOADSIZESTRING = "iB";
        protected const string ETASTRING = "ETA";
        protected const string OFSTRING = "of";

        public event EventHandler<ProcessProgressEvent> DownloadProgress;
        public event EventHandler<String> PostProcessing;
        public AudioDownloader (string url, string downloader) {
            this._url = url;
            this._downloader = downloader;
        }

        public static string GetVersion (string downloader) {
            try {
                var proc = new Process {
                    StartInfo = new ProcessStartInfo {
                    FileName = downloader,
                    Arguments = $"--version",
                    UseShellExecute = false,
                    RedirectStandardOutput = true,
                    CreateNoWindow = true
                    }
                };
                var br = new StringBuilder ();
                proc.Start ();
                while (!proc.StandardOutput.EndOfStream) {
                    br.Append (proc.StandardOutput.ReadLine ());
                }
                return br.ToString ();
            } catch (Exception ex) {
                return $"{{\"Error\": \"{ex.Message}\"}}";
            }
        }
        public async Task<bool> CheckUrlValid () {
            var proc = new Process {
                StartInfo = new ProcessStartInfo {
                FileName = this._downloader,
                Arguments = $"\"{this._url}\" -j",
                UseShellExecute = false,
                RedirectStandardOutput = true,
                CreateNoWindow = true
                }
            };
            proc.Start ();
            await (Task.Run (() => proc.WaitForExit ()));
            return (proc.ExitCode == 0);
        }

        public string DownloadAudio (string uid) {
            var outputFile = Path.Combine (Path.GetTempPath (), $"{uid}.mp3");
            var templateFile = Path.Combine (Path.GetTempPath (), $"{uid}.%(ext)s");
            var proc = new Process {
                StartInfo = new ProcessStartInfo {
                FileName = this._downloader,
                Arguments = $"-o \"{templateFile}\" --audio-format mp3 -x \"{this._url}\"",
                UseShellExecute = false,
                RedirectStandardOutput = true,
                CreateNoWindow = true
                }
            };

            StringBuilder br = new StringBuilder ();
            proc.Start ();
            while (!proc.StandardOutput.EndOfStream) {
                string output = proc.StandardOutput.ReadLine ();
                if (output.Contains ("%")) {
                    var progress = _parseProgress (output);
                    if (DownloadProgress != null) {
                        DownloadProgress (this, progress);
                    }
                } else {
                    if (PostProcessing != null) {
                        PostProcessing (this, output);
                    }
                }
            }

            if (File.Exists (outputFile)) {
                return outputFile;
            }
            return string.Empty;
        }

        public void DownloadInfo () {
            var proc = new Process {
                StartInfo = new ProcessStartInfo {
                FileName = "youtube-dl",
                Arguments = $"-j {this._url}",
                UseShellExecute = false,
                RedirectStandardOutput = true,
                CreateNoWindow = true
                }
            };

            StringBuilder br = new StringBuilder ();
            proc.Start ();
            while (!proc.StandardOutput.EndOfStream) {
                br.Append (proc.StandardOutput.ReadLine ());
            }
            Properties = JsonConvert.DeserializeObject<ExpandoObject> (br.ToString ());
        }

        private ProcessProgressEvent _parseProgress (string output) {

            var result = new ProcessProgressEvent ();

            int progressIndex = output.LastIndexOf (' ', output.IndexOf ('%')) + 1;
            string progressString = output.Substring (progressIndex, output.IndexOf ('%') - progressIndex);
            result.Percentage = (int) Math.Round (double.Parse (progressString));

            int sizeIndex = output.LastIndexOf (' ', output.IndexOf (DOWNLOADSIZESTRING)) + 1;
            string sizeString = output.Substring (sizeIndex, output.IndexOf (DOWNLOADSIZESTRING) - sizeIndex + 2);
            result.TotalSize = sizeString;

            if (output.Contains (DOWNLOADRATESTRING)) {
                int rateIndex = output.LastIndexOf (' ', output.LastIndexOf (DOWNLOADRATESTRING)) + 1;
                string rateString = output.Substring (rateIndex, output.LastIndexOf (DOWNLOADRATESTRING) - rateIndex + 4);
                result.CurrentSpeed = rateString;
            }

            if (output.Contains (ETASTRING)) {
                result.ETA = output.Substring (output.LastIndexOf (' ') + 1);
            }
            return result;
        }
    }
}