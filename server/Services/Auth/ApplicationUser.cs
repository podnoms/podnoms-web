using Microsoft.AspNetCore.Identity;

namespace PodNoms.Api.Services.Auth {
    public class ApplicationUser : IdentityUser {
        // Extended Properties
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public long? FacebookId { get; set; }
        public string PictureUrl { get; set; }
        public string Slug { get; set; }
    }
}