using System;
using System.IO;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace PodNoms.Api.Utils {

    public static class ResourceReader {
        public static async Task<string> ReadResource(string resourceName) {
            string ret = string.Empty;
            var assembly = Assembly.GetEntryAssembly();
            if (assembly != null) {
                var resourceStream = assembly.GetManifestResourceStream($"PodNoms.Api.Resources.{resourceName}");
                if (resourceStream != null) {
                    using (var reader = new StreamReader(resourceStream, Encoding.UTF8)) {
                        ret = reader.ReadToEnd();
                    }
                    return ret;
                } else {
                    //massive HACK here - docker is not reading embedded resource for some reason
                    try {
                        using (StreamReader sr = new StreamReader(File.Open($"/app/Resources/{resourceName}", FileMode.Open))) {
                            // Read the stream to a string, and write the string to the console.
                            string data = await sr.ReadToEndAsync();
                            return data;
                        }
                    } catch (Exception ex) {
                        throw ex;
                    }
                }
            }
            return string.Empty;
        }
    }
}