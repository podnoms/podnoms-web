using System.ComponentModel.DataAnnotations;

namespace PodNoms.Api.Models.ViewModels {
    public class ForgotPasswordViewModel {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}