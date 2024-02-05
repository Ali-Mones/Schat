using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Schat.Models;
using Schat.Services;

namespace Schat.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class UsersController : ControllerBase
    {
        private readonly SchatContext _context;
        private readonly AuthenticationService _authService;

        public UsersController(SchatContext context, AuthenticationService authService)
        {
            _context = context;
            _authService = authService;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/friends/id
        [HttpGet("friends")]
        public async Task<ActionResult<IEnumerable<User>>> GetFriends()
        {
            int? id = _authService.GetUserId(HttpContext.User);
            if (id == null)
            {
                return BadRequest();
            }

            return Ok(
                await _context.Set<User>()
                .Where(pt => pt.Id == id)
                .Select(pt => pt.User2s)
                .FirstAsync()
            );
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("add-friend/{friendId}")]
        public async Task<ActionResult> AddFriend(int friendId)
        {
            int? userId = _authService.GetUserId(HttpContext.User);
            if (userId == null)
            {
                return BadRequest();
            }

            User? user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return NotFound("user not found");
            }

            User? friend = await _context.Users.FindAsync(friendId);
            if (friend == null)
            {
                return NotFound("friend not found");
            }

            user.User2s.Add(friend);
            await _context.SaveChangesAsync();
            return Ok();
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
