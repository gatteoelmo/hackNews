import axios from 'axios';
import _ from 'lodash';

const main = document.querySelector("#main");
let lastLoadedIndex = 0;

// Function to fetch new story IDs
async function fetchNewStoryIds() {
    try {
        const response = await axios.get("https://hacker-news.firebaseio.com/v0/newstories.json");
        console.log(`News fetched: `);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(`Error trying to fetch new story IDs: ${error}`);
        throw error;
    }
}

// Function to fetch a single story by ID
async function fetchStory(id) {
    try {
        const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(`Error fetching story with ID ${id}: ${error}`);
        throw error;
    }
}

// Function to load and display stories
async function loadStories() {
    try {
        const allIds = await fetchNewStoryIds();
        if (_.isEmpty(allIds)) { 
            displayNoNewsMessage();
            return;
        }

        const idsToLoad = _.slice(allIds, lastLoadedIndex, lastLoadedIndex + 10);
        lastLoadedIndex += 10;
        console.log(`Stories fetched: `);
        const stories = await Promise.all(_.map(idsToLoad, fetchStory));

        if (_.isEmpty(stories)) { 
            displayNoNewsMessage();
        } else {
            displayStories(stories);
        }
    } catch (error) {
        displayErrorMessage();
    }
}

// Function to display stories
function displayStories(stories) {
    _.forEach(stories, story => {
        const container = document.createElement("div");
        container.classList.add("container");
        container.addEventListener("click", () => {
            window.open(story.url, "_blank");
        });

        // News title
        const newsTitle = document.createElement("div");
        newsTitle.classList.add("newsTitle");
        newsTitle.textContent = story.title;
        container.appendChild(newsTitle);

        // News URL
        const newsUrl = document.createElement("div");
        newsUrl.classList.add("newsUrl");
        newsUrl.textContent = story.url;
        container.appendChild(newsUrl);

        // News date
        const date = new Date(story.time * 1000);
        const newsDate = document.createElement("div");
        newsDate.classList.add("newsDate");
        newsDate.textContent = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
        container.appendChild(newsDate);

        main.appendChild(container);
    });
}

// Function to display a message when no news is found
function displayNoNewsMessage() {
    main.innerHTML = '<div class="message">No news found</div>';
}

// Function to display an error message
function displayErrorMessage() {
    main.innerHTML = '<div class="message">Error fetching news</div>';
}

// Function to create the "Load More" button
function createLoadMoreButton() {
    console.log("Creating Load More button");
    const loadMore = document.createElement("button");
    loadMore.classList.add("container");
    loadMore.textContent = "+";
    main.insertAdjacentElement('beforeend', loadMore);
    console.log("Load More button created successfully");

    loadMore.addEventListener("click", async () => {
        loadMore.remove();
        await loadStories();
        createLoadMoreButton();
    });
}

// Load initial stories and create the button
loadStories().then(() => {
    createLoadMoreButton();
});
