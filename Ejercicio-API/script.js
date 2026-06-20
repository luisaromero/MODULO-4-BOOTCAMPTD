const URL = "https://rickandmortyapi.com/api/character/1,2,3,4,5,6,7,8,9,10"
const fetchButton = document.getElementById('fetchButton');


//ALMACENAMOS EN UNA VARIABLE GLOBAL PARA NO TENER QUE RECARGAR DATOS SI YA EXISTEN
let charactersData = null;



document.getElementById('fetchButton').addEventListener('click', () => {
    if (charactersData) {
        return;
    }

    fetch(URL)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            charactersData = data;
            renderCharacters(charactersData);
        })
        .catch(error => console.error('Error fetching data:', error));
});


function renderCharacters(data) {
    const charactersContainer = document.createElement('div');
    charactersContainer.id = 'characters-container';

    data.forEach(character => {
        const species = character.species
        const characterCard = document.createElement('section');

        // h2
        const title = document.createElement('h2');
        title.textContent = character.name;
        characterCard.appendChild(title);

        // img
        const img = document.createElement('img');
        img.src = character.image;
        img.alt = character.name;
        characterCard.appendChild(img);

        // ID
        const idP = document.createElement('p');
        idP.textContent = `ID: ${character.id}`;
        characterCard.appendChild(idP);

        // species
        const speciesP = document.createElement('p');
        speciesP.textContent = `Species: ${character.species}`;
        characterCard.appendChild(speciesP);

        charactersContainer.appendChild(characterCard);
    });

    document.body.appendChild(charactersContainer);
}




