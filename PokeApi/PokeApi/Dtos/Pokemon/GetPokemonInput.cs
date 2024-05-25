using System.ComponentModel.DataAnnotations;

namespace PokeApi.Dtos.Pokemon
{
    public class GetPokemonInput
    {
        [Range(0, 10)]
        public int MaxResult { get; set; }

    }
}
