using System;

namespace PodNoms.Api.Utils.Extensions
{

    public static class DateTimeExtensions {
        public static string ToRFC822String (this DateTime datetime) {
            return datetime.ToString ("ddd',' d MMM yyyy HH':'mm':'ss") +
                " " +
                datetime.ToString ("zzzz").Replace (":", "");
        }
    }
}