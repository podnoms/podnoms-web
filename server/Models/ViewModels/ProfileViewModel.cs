namespace PodNoms.Api.Models.ViewModels {
    public class ProfileViewModel {
        public int Id { get; set; }
        public string Slug { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ProfileImage { get; set; }
        public string Uid { get; set; }
        public string ApiKey { get; set; }
    }
}