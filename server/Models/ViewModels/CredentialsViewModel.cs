using FluentValidation.Attributes;
namespace PodNoms.Api.Models.ViewModels {
    [Validator(typeof(CredentialsViewModelValidator))]
    public class CredentialsViewModel {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}