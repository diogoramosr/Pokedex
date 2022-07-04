function qtdPokemon(quantidade) {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=" + quantidade)
    .then((response) => response.json())
    .then((allpokemon) => {
      let pokemons = [];

      allpokemon.results.map((val) => {
        fetch(val.url)
          .then((response) => response.json())
          .then((pokemonSingle) => {
            pokemons.push({
              id: pokemonSingle.id,
              nome: val.name,
              imagem: pokemonSingle.sprites.front_default,
              types: pokemonSingle.types,
            });

            if (pokemons.length == quantidade) {
              var pokemonSprite = document.querySelector(".pokemon-boxes");
              pokemonSprite.innerHTML = "";

              pokemons.map((val) => {
                const types = val.types.map((typeInfo) => typeInfo.type.name);

                pokemonSprite.innerHTML += `
                <li class="card ${types[0]}">
                    <img class="card-image" src="${val.imagem}" alt="${
                  val.nome
                }">
                    <p class="card-title">${val.id}. ${val.nome}</p>
                    <p class="card-subtitle">${types.join(" | ")}</p>
                </li> `;
              });
            }
          });
      });
    });
}
qtdPokemon(15);
