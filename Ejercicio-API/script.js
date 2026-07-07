const URL = "https://rickandmortyapi.com/api/character/1,2,3,4,5,6,7,8,9,10"
const fetchButton = document.getElementById('fetchButton');
const showBySpecies = document.getElementById('showBySpecies');
const getUniqueCharacter = document.getElementById('getUniqueCharacter');
const main = document.querySelector('main');

//ALMACENAMOS EN UNA VARIABLE GLOBAL PARA NO TENER QUE RECARGAR DATOS SI YA EXISTEN
let charactersData = null;



// showBySpecies.addEventListener('click', () => {
//     if (charactersData) {
//         renderCharacters(charactersData);
//         return;
//     }

//     fetch(URL)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('No se pudo conectar')
//             }
//             return response.json()
//         })

//         .then(data => {
//             charactersData = data;
//             renderCharacters(charactersData);
//         })
//         .catch(error => console.error('Error fetching data:', error));
// });
showBySpecies.addEventListener('click', async () => {
    try {
        const data = await getData();
        renderCharactersBySpecies(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});
// getUniqueCharacter.addEventListener('click', () => {
//      if (charactersData) {
//         renderCharacters(charactersData);
//         return;
//     }
//     else {
//         getData()
//     }
//     const character = personajesCache.find(x => x.id === id);


// });

async function getData() {
    if (charactersData) {
        console.log('Mostrando desde memoria local');
        return charactersData;
    }

    const response = await fetch(URL);
    if (!response.ok) {
        throw new Error('No se pudo conectar');
    }

    const data = await response.json();
    charactersData = data;
    console.log('Datos recibidos de la API:', data);
    return data;
}

function clearContainer() {
    const existing = document.getElementById('show-data');
    if (existing) existing.remove();
}


function renderCharactersBySpecies(data) {
    clearContainer()
    //Alcenamos en un obj los personajes por especie , lo inicializamos vacío

    const orderBySpecies = {};
    data.forEach(character => {
        const specie = character.species;

        // Si no existe la especie la creamos con un array vacío
        if (!orderBySpecies[specie]) {
            orderBySpecies[specie] = [];
        }

        // por el contrario si existe la especie , se hace crea un obj en 
        // el array correspondiente de la especie
        orderBySpecies[specie].push(character);
    });
    const container = document.createElement('div');
    container.id = 'show-data';


    Object.entries(orderBySpecies).forEach(entry => {
        const species = entry[0];
        const characters = entry[1];

        const speciesDiv = document.createElement('div');

        // Título de la especie
        const title = document.createElement('h2');
        title.textContent = species;
        speciesDiv.appendChild(title);

        // Contenedor de cards de esta especie
        const cardsContainer = document.createElement('div');
        cardsContainer.className = 'cards-container';

        characters.forEach(character => {
            const card = document.createElement('section');
            card.className = 'character-card';


            // Cremos elementos ya que innerhtml es MUY PELIGROSO tiene riesgos de Cross-Site Scripting 
            // ninguna IA te dice esto ajá! 
            const img = document.createElement('img');
            img.src = character.image;
            img.alt = character.name;
            card.appendChild(img);

            const nameH3 = document.createElement('h3');
            nameH3.textContent = character.name;
            card.appendChild(nameH3);

            const idP = document.createElement('p');
            idP.textContent = `ID: ${character.id}`;
            card.appendChild(idP);

            const speciesP = document.createElement('p');
            speciesP.textContent = `Species: ${character.species}`;
            card.appendChild(speciesP);

            cardsContainer.appendChild(card);
        });

        speciesDiv.appendChild(cardsContainer);
        container.appendChild(speciesDiv);
    });

    main.appendChild(container);
}

function individualInfo(id) {

    // primero tengo que limpiar el contenedor ya que puede haber existido alguna peticion de otra data antes
    //debo agregar la card con un id 


}






