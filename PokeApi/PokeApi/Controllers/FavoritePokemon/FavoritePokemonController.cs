using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PokeApi.Data;

namespace PokeApi.Controllers.FavoritePokemon
{
    [ApiController]
    [Route("[controller]")]
    public class FavoritePokemonController: ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public FavoritePokemonController(ApplicationDbContext context) { 
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<PokeApi.Models.FavoritePokemon>> GetFavoritePokemons()
        {
            return await _context.FavoritePokemons.ToListAsync();
        }

        //public CreateFavoritePokemon()
        //{
            
        //}
    }
}
