using System;
using System.ComponentModel.DataAnnotations;

namespace PodNoms.Api.Models {
    public class User : BaseModel {
        public int Id { get; set; }

        [MaxLength (50)]
        public string Slug { get; set; }

        [MaxLength (100)]
        public string EmailAddress { get; set; }

        [MaxLength (100)]
        public string FullName { get; set; }

        public string ProfileImage { get; set; }

        [MaxLength (50)]
        public string Sid { get; set; }

        [MaxLength (50)]
        public string ProviderId { get; set; }

        [MaxLength (50)]
        public string ApiKey { get; set; }

        public string RefreshToken { get; set; }
        internal string GetUserId () {
            //TODO: Sort this when signalr uses correct id
            return FullName;
        }
    }
}