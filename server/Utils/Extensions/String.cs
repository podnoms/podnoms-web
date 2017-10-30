using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;

namespace PodNoms.Api.Utils.Extensions
{
    public static class StringExtensions
    {
        public static string StripNonXMLChars(this string str, float xmlVersion = 1.1f)
        {
            if (string.IsNullOrEmpty(str))
                return string.Empty;
            const string patternVersion1_0 = @"&#x((10?|[2-F])FFF[EF]|FDD[0-9A-F]|7F|8[0-46-9A-F]9[0-9A-F]);";
            const string patternVersion1_1 = @"&#x((10?|[2-F])FFF[EF]|FDD[0-9A-F]|[19][0-9A-F]|7F|8[0-46-9A-F]|0?[1-8BCEF]);";
            string Pattern = xmlVersion == 1.0f ? patternVersion1_0 : patternVersion1_1;
            string newString = string.Empty;
            Regex regex = new Regex(Pattern, RegexOptions.IgnoreCase);
            if (regex.IsMatch(str))
                newString = regex.Replace(str, "");
            else
                newString = str;

            //remove FUCKING EMOJI!!!!!!!!!
            string result = Regex.Replace(newString, @"\p{Cs}", "");
            return result;
        }

        public static string RemoveNonAlphaChars(this string str)
        {
            Regex rgx = new Regex("[^a-zA-Z0-9 -]");
            return rgx.Replace(str, "");
        }
        public static string RemoveInvalidUrlChars(this string str)
        {
            string regexSearch = new string(Path.GetInvalidFileNameChars()) + new string(Path.GetInvalidPathChars());
            Regex r = new Regex(string.Format("[{0}]", Regex.Escape(regexSearch)));
            return r.Replace(str, "");
        }
        public static string Slugify(this string phrase, IEnumerable<string> source)
        {
            string str = phrase.RemoveAccent().ToLower().RemoveInvalidUrlChars().RemoveNonAlphaChars();
            // invalid chars           
            str = Regex.Replace(str, @"[^a-z0-9\s-]", "");
            // convert multiple spaces into one space   
            str = Regex.Replace(str, @"\s+", " ").Trim();
            // cut and trim 
            str = str.Substring(0, str.Length <= 45 ? str.Length : 45).Trim();
            str = Regex.Replace(str, @"\s", "-"); // hyphens   
            str = str.RemoveAccent().ToLower();

            str = str.Replace(" ", "");
            var count = 1;

            while (source != null &&
                !string.IsNullOrEmpty(source.Where(e => e == str).Select(e => e).DefaultIfEmpty("").FirstOrDefault()))
            {
                str = $"{str}_{count++}";
            }
            return str;
        }

        public static string RemoveAccent(this string txt)
        {
            byte[] bytes = System.Text.Encoding.GetEncoding("Cyrillic").GetBytes(txt);
            return System.Text.Encoding.ASCII.GetString(bytes);
        }

        public static string UrlParse(this string url, params string[] parts)
        {
            url = url.TrimEnd('/');
            foreach (var u in parts)
            {
                url = string.Format("{0}/{1}", url, u.TrimStart('/'));
            }
            return url;
        }
    }
}