let currentPage = 0;
const itemsPerPage = 25;

function createTableau(pokemon) {
    const tableau = document.createElement('tr');
    tableau.classList.add('tr');

    // Définition de l'attribut data-pokemon-id
    tableau.setAttribute('data-pokemon-id', pokemon.pokemon_id);

    let pokemon_image;
    if(pokemon.pokemon_id <= 9) {
        pokemon_image = "00" + pokemon.pokemon_id + ".webp";
    } else if(pokemon.pokemon_id <= 99) {
        pokemon_image = "0" + pokemon.pokemon_id + ".webp";
    } else {
        pokemon_image = pokemon.pokemon_id + ".webp";
    }

    let type = '';
    pokemon.type.forEach(t => {
        type += `${t.type}`;
        if(t != pokemon.type[pokemon.type.length - 1]) {
            type += ' | ';
        }
    });

    tableau.innerHTML = `
        <td class="name">${pokemon.pokemon_name}</td>
        <td class="id">${pokemon.pokemon_id}</td>
        <td class="generation">${pokemon.generation}</td>
        <td class="type">${type}</td>
        <td class="defense">${pokemon.base_stamina}</td>
        <td class="stamina">${pokemon.base_stamina}</td>
        <td class="attaque">${pokemon.base_attack}</td>
        <td><img class="card-image" src="../webp/images/${pokemon_image}" alt="pokemon"></td>
    `;

    tableau.addEventListener('click', showPokemonDetails);

    tbody.appendChild(tableau);
}

function afficherPage() {
    let tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    
    for(let i = (currentPage * itemsPerPage); i < ((currentPage + 1) * itemsPerPage); i++) {
        if(allPokemons[i] !== undefined) {
            createTableau(allPokemons[i]);
        }
    }
}

afficherPage(Pokemon.all_pokemons)

document.getElementById('previousPage').addEventListener('click', previousPage);
document.getElementById('nextPage').addEventListener('click', nextPage);
function nextPage() {
    if (currentPage < Math.floor(allPokemons.length / itemsPerPage)) {
        currentPage++;
        desactiverBouton();
        afficherPage(allPokemons);
    }
}

function previousPage() {
    if (currentPage > 0) {
        currentPage--;
        desactiverBouton();
        afficherPage(allPokemons);
    }
}

let boutonSuivant = document.getElementById('nextPage');
let boutonRetour = document.getElementById('previousPage');

function desactiverBouton() {
    if (currentPage === 0) {
        boutonRetour.disabled = true;
    } else {
        boutonRetour.disabled = false;
    }
    
    if (currentPage === Math.floor(allPokemons.length / itemsPerPage)) {
        boutonSuivant.disabled = true;
    } else {
        boutonSuivant.disabled = false;
    }
}

desactiverBouton();

function showPokemonDetails(event) {
    if (typeof voirPokemonDetails === 'function') {
        voirPokemonDetails(event);
    }
}