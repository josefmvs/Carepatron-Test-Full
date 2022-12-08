using api.Dtos;
using FluentValidation;

namespace api.Validations
{
    public class ClientValidator : AbstractValidator<ClientDto>
    {
        public ClientValidator() 
        {
            RuleFor(x => x.FirstName).NotEmpty();
            RuleFor(x => x.LastName).NotEmpty();
            RuleFor(x => x.Email).NotEmpty();
            RuleFor(x => x.PhoneNumber).NotEmpty();
        }
    }
}
