namespace Schat.Models
{
	public class RegisterRequest
	{
		public string FirstName { get; set; } = null!;
		public string LastName { get; set; } = null!;
		public string Nationality { get; set; } = null!;
		public Gender Gender { get; set; } = Gender.Male;
		public string Email { get; set; } = null!;
		public string Password { get; set; } = null!;
	}
}
