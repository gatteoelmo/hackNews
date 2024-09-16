import axios from 'axios';

const main = document.querySelector("#main");
let lastLoadedIndex = 0;

console.log("Caricamento in corso...");

// Funzione per recuperare gli ID delle nuove storie
async function fetchNewStoryIds() {
    try {
        const response = await axios.get("https://hacker-news.firebaseio.com/v0/newstories.json");
        return response.data;
    } catch (error) {
        console.error(`Errore durante il recupero degli ID delle storie: ${error}`);
        throw error;
    }
}

// Funzione per recuperare una singola storia per ID
async function fetchStory(id) {
    try {
        const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        return response.data;
    } catch (error) {
        console.error(`Errore durante il recupero della storia con ID ${id}: ${error}`);
        throw error;
    }
}

// Funzione per caricare e visualizzare le storie
async function loadStories() {
    try {
        const allIds = await fetchNewStoryIds();
        if (allIds.length === 0) {
            displayNoNewsMessage();
            return;
        }

        const idsToLoad = allIds.slice(lastLoadedIndex, lastLoadedIndex + 10);
        lastLoadedIndex += 10;
        const stories = await Promise.all(idsToLoad.map(fetchStory));

        if (stories.length === 0) {
            displayNoNewsMessage();
        } else {
            displayStories(stories);
        }
    } catch (error) {
        displayErrorMessage();
    }
}

// Funzione per visualizzare le storie
function displayStories(stories) {
    stories.forEach(story => {
        const container = document.createElement("div");
        container.classList.add("container");
        container.addEventListener("click", () => {
            window.open(story.url, "_blank");
        });

        // Titolo della notizia
        const newsTitle = document.createElement("div");
        newsTitle.classList.add("newsTitle");
        newsTitle.textContent = story.title;
        container.appendChild(newsTitle);

        // URL della notizia
        const newsUrl = document.createElement("div");
        newsUrl.classList.add("newsUrl");
        newsUrl.textContent = story.url;
        container.appendChild(newsUrl);

        // Data della notizia
        const date = new Date(story.time * 1000);
        const newsDate = document.createElement("div");
        newsDate.classList.add("newsDate");
        newsDate.textContent = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
        container.appendChild(newsDate);

        main.appendChild(container);
    });
}

// Funzione per visualizzare un messaggio quando non ci sono notizie
function displayNoNewsMessage() {
    main.innerHTML = '<div class="message">Nessuna notizia trovata</div>';
}

// Funzione per visualizzare un messaggio di errore
function displayErrorMessage() {
    main.innerHTML = '<div class="message">Errore durante il recupero delle notizie</div>';
}

// Funzione per creare il pulsante "Carica di più"
function createLoadMoreButton() {
    console.log("Creazione del pulsante Carica di più");
    const loadMore = document.createElement("button");
    loadMore.classList.add("container");
    loadMore.textContent = "+";
    main.insertAdjacentElement('beforeend', loadMore);
    console.log("Pulsante Carica di più creato correttamente");

    loadMore.addEventListener("click", async () => {
        loadMore.remove();
        await loadStories();
        createLoadMoreButton();
    });
}

// Carica le notizie iniziali e crea il pulsante
loadStories().then(() => {
    createLoadMoreButton();
});
