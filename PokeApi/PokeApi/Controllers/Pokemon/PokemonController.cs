using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using PokeApi.Dtos.Pokemon;
using System.Web;

namespace PokeApi.Controllers.Pokemon
{
    [ApiController]
    [Route("api/[controller]")]
    public class PokemonController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public PokemonController(HttpClient httpClient) { 
            _httpClient = httpClient;
        }

        [HttpGet]
        public async Task<ActionResult<GetPokemonDto>> GetPokemonList([FromQuery] GetPokemonInput input)
        {
            try {

                string url = $"https://pokeapi.co/api/v2/pokemon?limit={input.MaxResult}&offset=0";

                List<GetPokemonDto> pokemonDtos = new List<GetPokemonDto>();

                HttpResponseMessage response = await _httpClient.GetAsync(url);

                response.EnsureSuccessStatusCode();

                string responseBody = await response.Content.ReadAsStringAsync();

                var pokemondata = JsonConvert.DeserializeObject<dynamic>(responseBody);

                int idCounter = 1;

                foreach (var item in pokemondata["results"])
                {
                    var pokemonUrl = await GetPokemonUrl((string)item.url);
                    var test = item.url;
                    var pokemondto = new GetPokemonDto
                    {
                        Id = idCounter,
                        Name = item.name,
                        Url = item.url,
                        pokemonDto = pokemonUrl
                    };

                    pokemonDtos.Add(pokemondto);

                    idCounter++;
                }

                return Ok(pokemonDtos);


            }
            catch (HttpRequestException e)
            {
                return StatusCode(500, $"Error al realizar la petición: {e.Message}");
            }
        }

        private async Task<List<PokemonDto>> GetPokemonUrl(string url)
        {

            string decodedUrl = HttpUtility.UrlDecode(url);
            List<PokemonDto> pokemons = new List<PokemonDto>();
            using (var httpClient = new HttpClient())
            {
                try
                {
                    HttpResponseMessage response = await _httpClient.GetAsync(decodedUrl);
                    response.EnsureSuccessStatusCode();
                    string responseBody = await response.Content.ReadAsStringAsync();
                    var pokemondata = JsonConvert.DeserializeObject<dynamic>(responseBody);

                    var pokemonDto = new PokemonDto
                    {
                        Id = pokemondata["id"],
                        Name = pokemondata["name"]
                        //UrlImage = pokemondata["forms"][0].url
                    };

                    pokemons.Add(pokemonDto);

                    return pokemons;
                }
                catch (HttpRequestException e)
                {

                    return pokemons;
                }

            } 
        }
    }
}
