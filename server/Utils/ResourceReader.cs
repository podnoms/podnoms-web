using System;
using System.IO;
using System.Reflection;
using System.Text;
using Microsoft.Extensions.Logging;

namespace PodNoms.Api.Utils {

    public static class ResourceReader {
        public static string ReadResource(string resourceName, ILogger logger) {
            string ret = string.Empty;
            var assembly = Assembly.GetEntryAssembly();
            if (assembly != null) {
                logger.LogDebug($"Entry Assembly: {assembly.Location}");
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
                            string data = sr.ReadToEnd();
                            return data;
                        }
                    } catch (Exception ex) {
                        logger.LogError($"Resource {resourceName} not found in assembly {assembly.Location}");
                        logger.LogError($"{ex.Message}");
                    }
                }
            }
            logger.LogError("Unable to get executing assembly");
            return string.Empty;
        }
    }
}