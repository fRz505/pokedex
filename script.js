async function fetchPokemon(id) {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
  const response = await fetch(url);
  return response.ok ? await response.json() : null;
}

async function displayPokemon(pokemon) {
  const pokemonName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
  const pokemonDescription = `Tipo: ${pokemon.types
    .map((type) => type.type.name)
    .join(", ")}`;
  const pokemonHeight = `Altura: ${pokemon.height / 10} m`;
  const pokemonWeight = `Peso: ${pokemon.weight / 10} kg`;
  const pokemonAbilities = `Habilidades: ${pokemon.abilities
    .map((ability) => ability.ability.name)
    .join(", ")}`;
  const pokemonImg = pokemon.sprites.front_default;

  document.getElementById("pokemon-name").textContent = pokemonName;
  document.getElementById("pokemon-description").textContent =
    pokemonDescription;
  document.getElementById("pokemon-img").src = pokemonImg;

  const details = `${pokemonHeight} | ${pokemonWeight} | ${pokemonAbilities}`;
  document.getElementById("pokemon-details").textContent = details;
}

async function getRandomPokemon() {
  const randomId = Math.floor(Math.random() * 898) + 1;
  const pokemon = await fetchPokemon(randomId);
  await displayPokemon(pokemon);
}

function showModal(message) {
  document.getElementById("modal-message").textContent = message;
  document.getElementById("modal").style.display = "block";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
}

async function searchPokemon() {
  const searchInput = document
    .getElementById("pokemon-search")
    .value.toLowerCase();
  if (!searchInput) {
    showModal("Por favor ingresa un nombre o ID de Pokémon");
    return;
  }
  const pokemon = await fetchPokemon(searchInput);
  if (pokemon) {
    await displayPokemon(pokemon);
  } else {
    showModal("Pokémon no encontrado");
    document.getElementById("pokemon-search").value = "";
  }
}

document
  .getElementById("random-pokemon-btn")
  .addEventListener("click", getRandomPokemon);
document
  .getElementById("search-pokemon-btn")
  .addEventListener("click", searchPokemon);
document.getElementById("close-modal").addEventListener("click", closeModal);
window.addEventListener("click", function (event) {
  if (event.target === document.getElementById("modal")) {
    closeModal();
  }
});

(async () => {
  const initialPokemon = await fetchPokemon(1);
  await displayPokemon(initialPokemon);
})();
