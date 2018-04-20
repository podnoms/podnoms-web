using System;
using System.Diagnostics;
using System.Dynamic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using NYoutubeDL;
using NYoutubeDL.Models;
using PodNoms.Api.Models.ViewModels;
using PodNoms.Api.Utils.Extensions;
using static NYoutubeDL.Helpers.Enums;

namespace PodNoms.Api.Services.Downloader {
    public class AudioDownloader {

        private readonly string _url;
        private readonly string _downloader;

        private DownloadInfo _properties;
        public VideoDownloadInfo Properties => _properties is VideoDownloadInfo ? (VideoDownloadInfo)_properties : null;
        public DownloadInfo RawProperties => _properties;

        protected const string DOWNLOADRATESTRING = "iB/s";
        protected const string DOWNLOADSIZESTRING = "iB";
        protected const string ETASTRING = "ETA";
        protected const string OFSTRING = "of";

        public event EventHandler<ProcessProgressEvent> DownloadProgress;
        public event EventHandler<String> PostProcessing;
        public AudioDownloader(string url, string downloader) {
            this._url = url;
            this._downloader = downloader;
        }

        public static string GetVersion(string downloader) {
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
                var br = new StringBuilder();
                proc.Start();
                while (!proc.StandardOutput.EndOfStream) {
                    br.Append(proc.StandardOutput.ReadLine());
                }
                return br.ToString();
            } catch (Exception ex) {
                return $"{{\"Error\": \"{ex.Message}\"}}";
            }
        }
        public async Task<AudioType> GetInfo() {
            var ret = AudioType.Invalid;
            await Task.Run(() => {
                var youtubeDl = new YoutubeDL();
                youtubeDl.VideoUrl = this._url;
                var info = youtubeDl.GetDownloadInfo();

                if (info != null &&
                   (info.Errors.Count == 0 || info.VideoSize != null)) {
                    this._properties = info;
                    // have to dump playlist handling for now
                    if (false && info is PlaylistDownloadInfo && ((PlaylistDownloadInfo)info).Videos.Count > 0) {
                        ret = AudioType.Playlist;
                    } else if (info is VideoDownloadInfo) {
                        ret = AudioType.Valid;
                    }
                }
            });
            return ret;
        }

        public string DownloadAudio(string uid) {
            var outputFile = Path.Combine(Path.GetTempPath(), $"{uid}.mp3");
            var templateFile = Path.Combine(Path.GetTempPath(), $"{uid}.%(ext)s");

            var yt = new YoutubeDL();
            yt.Options.FilesystemOptions.Output = templateFile;
            yt.Options.PostProcessingOptions.ExtractAudio = true;
            yt.Options.PostProcessingOptions.AudioFormat = AudioFormat.mp3;

            yt.VideoUrl = this._url;

            yt.StandardOutputEvent += (sender, output) => {
                if (output.Contains("%")) {
                    var progress = _parseProgress(output);
                    if (DownloadProgress != null) {
                        DownloadProgress(this, progress);
                    }
                } else {
                    if (PostProcessing != null) {
                        PostProcessing(this, output);
                    }
                }
            };
            yt.PrepareDownload();

            Console.WriteLine(yt.RunCommand);

            Process yp = yt.Download();
            yp.WaitForExit();
            return File.Exists(outputFile) ? outputFile : string.Empty;
        }

        private ProcessProgressEvent _parseProgress(string output) {

            var result = new ProcessProgressEvent();

            int progressIndex = output.LastIndexOf(' ', output.IndexOf('%')) + 1;
            string progressString = output.Substring(progressIndex, output.IndexOf('%') - progressIndex);
            result.Percentage = (int)Math.Round(double.Parse(progressString));

            int sizeIndex = output.LastIndexOf(' ', output.IndexOf(DOWNLOADSIZESTRING)) + 1;
            string sizeString = output.Substring(sizeIndex, output.IndexOf(DOWNLOADSIZESTRING) - sizeIndex + 2);
            result.TotalSize = sizeString;

            if (output.Contains(DOWNLOADRATESTRING)) {
                int rateIndex = output.LastIndexOf(' ', output.LastIndexOf(DOWNLOADRATESTRING)) + 1;
                string rateString = output.Substring(rateIndex, output.LastIndexOf(DOWNLOADRATESTRING) - rateIndex + 4);
                result.CurrentSpeed = rateString;
            }

            if (output.Contains(ETASTRING)) {
                result.ETA = output.Substring(output.LastIndexOf(' ') + 1);
            }
            return result;
        }
    }
}