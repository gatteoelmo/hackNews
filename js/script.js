const main = document.querySelector("#main");
/* initializing a variable `lastLoadedIndex` with an initial
value of 0. This variable is used to keep track of the index of the last loaded story from the
Hacker News API. It is incremented by 10 each time a batch of stories is loaded, so that the next
batch can start from the correct index in the data array. This helps in fetching and displaying
stories in batches rather than all at once. */
let lastLoadedIndex = 0; 


/**
 * The function `getNews` fetches new stories from Hacker News API, processes the data, and displays
 * the stories on the webpage.
 */
function getNews() {
    // Fetch the new stories from the Hacker News API
    fetch("https://hacker-news.firebaseio.com/v0/newstories.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log("Fetched data:", data);
            // Determine the IDs of the articles to load
            const idsToLoad = data.slice(lastLoadedIndex, lastLoadedIndex + 10);
            lastLoadedIndex += 10; // Update the index for the next batch of articles
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
                
                // Add the news title
                const newsTitle = document.createElement("div");
                newsTitle.classList.add("newsTitle");
                newsTitle.innerHTML = story.title;
                container.appendChild(newsTitle);

                // Add the news url
                const newsUrl = document.createElement("div");
                newsUrl.classList.add("newsUrl");
                newsUrl.innerHTML = `${story.url}`;
                container.appendChild(newsUrl);

                // Add the news date
                const date = new Date(story.time * 1000);
                const newsDate = document.createElement("div");
                newsDate.classList.add("newsDate");
                newsDate.innerHTML = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
                container.appendChild(newsDate);

                main.appendChild(container);
            });
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}

// function to fetch a single story
function fetchStory(id) {
    return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error fetching story: ${response.status}`);
            }
            return response.json();
        });
}

// Function to create the button
function makeButton() {
    console.log("Function makeButton called");
    const loadMore = document.createElement("button");
    loadMore.classList.add("container");
    loadMore.innerHTML = "Load More";
    main.insertAdjacentElement('beforeend', loadMore);
    console.log("Button Load More created correctly");

    loadMore.addEventListener("click", () => {
        loadMore.remove();
        getNews();
        setTimeout(makeButton, 1500);
    });
}

// charge the news and the button
getNews()
setTimeout(makeButton, 1500);