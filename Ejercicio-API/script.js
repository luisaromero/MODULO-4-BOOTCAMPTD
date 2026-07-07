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
        let id = 1
        individualInfo(data, id);
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
    const existing = document.getElementById('results');
    if (existing) existing.remove();
}



function createContainer() {
    const container = document.createElement('div');
    container.id = 'results';
    return container;
}

// Creamos elementos ya que innerhtml es ------> MUY PELIGROSO <-------- tiene riesgos de Cross-Site Scripting 
// es decir riesgo de hackeo ----> ninguna IA lo dice ;)!
// https://medium.com/@dfs.techblog/cross-site-scripting-xss-why-innerhtml-is-dangerous-and-what-else-to-avoid-0a11e550dda9 

function createCharacterCard(character) {
    const card = document.createElement('section');
    card.className = 'character-card';

    //  El tamaño de imagen se controla vía CSS (.character-card img), no con
    // atributos width fijos en JS, para mantener consistencia visual entre vistas.
    // El width no se pide en los requisitos , sólo la imagen.

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

    return card;
}

function renderAllCharacters(data) {
    clearContainer();
    const container = createContainer();

    const cardsContainer = document.createElement('div');
    cardsContainer.className = 'cards-container';


    data.forEach(character => {
        cardsContainer.appendChild(createCharacterCard(character));
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
    container.id = 'results';


    Object.keys(orderBySpecies).sort().forEach(species => {
        const characters = orderBySpecies[species];
        const speciesDiv = document.createElement('div');

        const title = document.createElement('h2');
        title.textContent = species;
        speciesDiv.appendChild(title);

        const list = document.createElement('ul');
        characters.forEach(character => {
            const li = document.createElement('li');
            li.textContent = `${character.name} (ID: ${character.id})`;
            list.appendChild(li);
        });
        speciesDiv.appendChild(list);

        container.appendChild(speciesDiv);
    });

    main.appendChild(container);
}


//  La ficha individual (individualInfo) muestra un personaje fijo (id: 1) 
//  *   en vez de selección dinámica, ya que el enunciado no especifica el método
//  *   de selección ("algún personaje").

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






