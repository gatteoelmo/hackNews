const main = document.querySelector("#main");
let lastLoadedIndex = 0; // Indice per tenere traccia dell'ultimo ID caricato

// Funzione per ottenere gli articoli
function getNews() {
    fetch("https://hacker-news.firebaseio.com/v0/newstories.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log("Fetched data:", data);
            
            // Determinare gli ID degli articoli da caricare
            const idsToLoad = data.slice(lastLoadedIndex, lastLoadedIndex + 10);
            lastLoadedIndex += 10; // Aggiornare l'indice per i prossimi articoli
            const storyPromises = idsToLoad.map((id) => fetchStory(id));
            return Promise.all(storyPromises);
        })
        .then((stories) => {
            console.log("Fetched story data:", stories);
            stories.forEach((story) => {
                const container = document.createElement("div");
                container.classList.add("container");
                container.addEventListener("click", () => {
                    window.open(story.url, "_blank");
                })
                
                const newsTitle = document.createElement("div");
                newsTitle.classList.add("newsTitle");
                newsTitle.innerHTML = story.title;
                container.appendChild(newsTitle);

                const newsUrl = document.createElement("div");
                newsUrl.classList.add("newsUrl");
                newsUrl.innerHTML = `Url: ${story.url}`;
                container.appendChild(newsUrl);

                const date = new Date(story.time * 1000);
                const newsDate = document.createElement("div");
                newsDate.classList.add("newsDate");
                newsDate.innerHTML = `Date: ${date}`;
                container.appendChild(newsDate);

                main.appendChild(container);
            });
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}

// Funzione per recuperare i dati di una storia
function fetchStory(id) {
    return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error fetching story: ${response.status}`);
            }
            return response.json();
        });
}

// Funzione per creare il pulsante
function makeButton() {
    console.log("Funzione makeButton chiamata");
    const loadMore = document.createElement("button");
    loadMore.classList.add("container");
    loadMore.innerHTML = "Load More";
    main.insertAdjacentElement('beforeend', loadMore);
    console.log("Pulsante Load More creato correttamente");

    loadMore.addEventListener("click", () => {
        loadMore.remove();
        getNews();
        setTimeout(makeButton, 1000);
    });
}

// Caricare gli articoli iniziali e il pulsante
getNews();
setTimeout(makeButton, 1000);

