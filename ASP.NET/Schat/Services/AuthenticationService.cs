using System.Security.Claims;

namespace Schat.Services
{
    public class AuthenticationService
    {
        public AuthenticationService() { }

        public int? GetUserId(ClaimsPrincipal user)
        {
            string? nameIdentifier = user.FindFirstValue(ClaimTypes.NameIdentifier);
            if (nameIdentifier == null)
            {
                return null;
            }

            return int.Parse(nameIdentifier);
        }


    }
}
