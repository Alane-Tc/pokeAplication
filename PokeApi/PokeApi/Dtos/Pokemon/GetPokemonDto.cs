using Microsoft.AspNetCore.Mvc;

namespace PokeApi.Dtos.Pokemon
{
    public class GetPokemonDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Url {get; set;}
        public List<PokemonDto> pokemonDto { get; set;}
    }
}
