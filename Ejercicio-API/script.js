const URL = "https://rickandmortyapi.com/api/character/1,2,3,4,5,6,7,8,9,10"
const fetchButton = document.getElementById('fetchButton');
const main = document.querySelector('main');

//ALMACENAMOS EN UNA VARIABLE GLOBAL PARA NO TENER QUE RECARGAR DATOS SI YA EXISTEN
let charactersData = null;



fetchButton.addEventListener('click', () => {
    if (charactersData) {
        return;
    }

    fetch(URL)
        .then(response => response.json())
        .then(data => {
            charactersData = data;
            renderCharacters(charactersData);
        })
        .catch(error => console.error('Error fetching data:', error));
});


function renderCharacters(data) {

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
    container.id = 'characters-by-species';


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

            const nameH3 = document.createElement('h3');
            nameH3.textContent = character.name;
            card.appendChild(nameH3);

            const img = document.createElement('img');
            img.src = character.image;
            img.alt = character.name;
            card.appendChild(img);

            const idP = document.createElement('p');
            idP.textContent = `Id: ${character.id}`;
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


// function createCharacterCard(character) {

//     const card = document.createElement('section');
//     card.className = 'character-card';

//     const nameH3 = document.createElement('h3');
//     nameH3.textContent = character.name;
//     card.appendChild(nameH3);

//     const img = document.createElement('img');
//     img.src = character.image;
//     img.alt = character.name;
//     card.appendChild(img);

//     const statusP = document.createElement('p');
//     statusP.textContent = `Status: ${character.status}`;
//     card.appendChild(statusP);

//     const speciesP = document.createElement('p');
//     speciesP.textContent = `Species: ${character.species}`;
//     card.appendChild(speciesP);

//     return card;
// }


// function renderSpecies(species, characters) {

//     const speciesDiv = document.createElement('div');

//     const title = document.createElement('h2');
//     title.textContent = species;
//     speciesDiv.appendChild(title);

//     const cardsContainer = document.createElement('div');
//     cardsContainer.className = 'cards-container';

//     characters.forEach(character => {
//         const card = createCharacterCard(character);
//         cardsContainer.appendChild(card);
//     });

//     speciesDiv.appendChild(cardsContainer);

//     return speciesDiv;
// }
// const charactersContainer = document.createElement('div');
// charactersContainer.id = 'characters-container';


// const characterCard = document.createElement('section');


// // h2
// const title = document.createElement('h2');
// title.textContent = character.name;
// characterCard.appendChild(title);

// // img
// const img = document.createElement('img');
// img.src = character.image;
// img.alt = character.name;
// characterCard.appendChild(img);

// // ID
// const idP = document.createElement('p');
// idP.textContent = `ID: ${character.id}`;
// characterCard.appendChild(idP);

// // species
// const speciesP = document.createElement('p');
// speciesP.textContent = `Species: ${character.species}`;
// characterCard.appendChild(speciesP);

// charactersContainer.appendChild(characterCard);


// document.body.appendChild(charactersContainer);





