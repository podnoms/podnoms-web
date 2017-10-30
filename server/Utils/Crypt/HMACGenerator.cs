using System.Security.Cryptography;
using System.Text;

namespace PodNoms.Api.Utils.Crypt
{

    public class HMACGenerator
    {

        public static byte[] CalculateHMACSHA256(string key, string input)
        {
            return CalculateHMACSHA256(Encoding.ASCII.GetBytes(key), Encoding.ASCII.GetBytes(input));
        }
        public static byte[] CalculateHMACSHA256(byte[] key, byte[] input)
        {
            var hash = new HMACSHA256(key);
            return hash.ComputeHash(input);
        }
    }
}