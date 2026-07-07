const URL = "https://rickandmortyapi.com/api/character/1,2,3,4,5,6,7,8,9,10"
const listOfCharacters = document.getElementById('listOfCharacters');
const showBySpecies = document.getElementById('showBySpecies');
const getUniqueCharacter = document.getElementById('getUniqueCharacter');
const main = document.querySelector('main');

//ALMACENAMOS EN UNA VARIABLE GLOBAL PARA NO TENER QUE RECARGAR DATOS SI YA EXISTEN
let charactersData = null;



listOfCharacters.addEventListener('click', async () => {
    try {
        const data = await getData();
        renderAllCharacters(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});


showBySpecies.addEventListener('click', async () => {
    try {
        const data = await getData();
        renderCharactersBySpecies(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});


getUniqueCharacter.addEventListener('click', async () => {
    try {
        const data = await getData();
        individualInfo(data, 2);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

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



function createContainer() {
    const container = document.createElement('div');
    container.id = 'show-data';
    return container;
}


function renderAllCharacters(data) {
    clearContainer();
    const container = createContainer();

    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'cards-container';

    data.forEach(character => {
        const card = document.createElement('section');
        card.className = 'character-card';

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
        speciesP.textContent = `Especie: ${character.species}`;
        card.appendChild(speciesP);

        cardsContainer.appendChild(card);
    });

    container.appendChild(cardsContainer);
    main.appendChild(container);
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


    Object.entries(orderBySpecies).sort().forEach(entry => {
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

function individualInfo(data, id) {
    const character = data.find(c => c.id === id);
    if (!character) {
        console.error('Personaje no encontrado');
        return;
    }

    clearContainer();
    const card = document.createElement('section');
    card.className = 'character-card';
    const container = createContainer();

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

    container.appendChild(card);

    main.appendChild(container);


}






