using System.Globalization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace PodNoms.Api.Utils.RemoteParsers {
    internal static class MixcloudJsonConverter {
        public static readonly JsonSerializerSettings Settings = new JsonSerializerSettings {
            MetadataPropertyHandling = MetadataPropertyHandling.Ignore,
            DateParseHandling = DateParseHandling.None,
            Converters = {
                new IsoDateTimeConverter { DateTimeStyles = DateTimeStyles.AssumeUniversal }
            },
        };
    }
}