using Microsoft.EntityFrameworkCore;
using Schat.Models;

namespace Schat.Services
{
    public class SearchService
    {
        private readonly SchatContext _context;

        public SearchService(SchatContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> Search(string key)
        {
            key = key.ToLower();
            return await Task.Run(async () =>
            {
                List<User> users = await _context.Users.ToListAsync();
                users.Sort((User a, User b) =>
                    int.Min(LevenshteinDistance(a.FirstName.ToLower(), key), LevenshteinDistance(a.LastName.ToLower(), key)) -
                    int.Min(LevenshteinDistance(b.FirstName.ToLower(), key), LevenshteinDistance(b.LastName.ToLower(), key))
                );

                return users;
            });
        }

        private int LevenshteinDistance(string s1, string s2)
        {
            int[,] memo = new int[s1.Length + 1, s2.Length + 1];

            for (int i = 0; i < s1.Length + 1; i++)
            {
                memo[i, 0] = i;
            }

            for (int i = 0; i < s2.Length + 1; i++)
            {
                memo[0, i] = i;
            }

            for (int i = 1; i < s1.Length + 1; i++)
            {
                for (int j = 1; j < s2.Length + 1; j++)
                {
                    if (s1[i - 1] == s2[j - 1])
                    {
                        memo[i, j] = memo[i - 1, j - 1];
                    }
                    else
                    {
                        memo[i, j] = 1 + int.Min(memo[i, j - 1], int.Min(memo[i - 1, j], memo[i - 1, j - 1]));
                    }
                }
            }

            return memo[s1.Length, s2.Length];
        }
    }
}
