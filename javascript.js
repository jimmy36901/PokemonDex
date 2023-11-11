let pokemonItem = document.getElementById("pokemon_Item"); //remember to add 雙引號

const fetchPokemon = () => {
  const PROMISES = [];
  for (let i = 1; i <= 150; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    PROMISES.push(fetch(url).then((res) => res.json()));
  }
  Promise.all(PROMISES)
    .then((result) => {
      const pokemon = result.map((data) => ({
        name: data.name,
        id: data.id,
        image: data.sprites["front_default"],
        type: data.types.map((type) => type.type.name).join(" ,"),
      }));
      displayPokemon(pokemon); //他要一起放進來！！
      // console.log(result);
    })

    .catch((err) => {
      console.log(err);
    });
};
const displayPokemon = (pokemon) => {
  console.log(pokemon);
  const pokemonText = pokemon
    .map(
      (item) => `
  <li class="pokemonBox">
    <img src="${item.image}" class="item_img"/>
    <h2 class="item_title">${item.id}. ${item.name}</h2>
    <p class="item_type">Type: ${item.type}</p>
  </li>
  
  `
    )
    .join("");
  pokemonItem.innerHTML = pokemonText;
};
fetchPokemon();
