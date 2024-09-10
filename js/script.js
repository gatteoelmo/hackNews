const main = document.querySelector("#main");
const container = document.querySelector("#container");


function getNews() {
    fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log("Fetched data:", data);
            for (let i = 0; i < 10; i++) {
                fetch(`https://hacker-news.firebaseio.com/v0/item/${data[i]}.json`)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(`Error fetching story: ${response.status}`);
                        }
                        return response.json();
                    })
                    .then((data) => {
                        console.log("Fetched story data:", data);
                        const container = document.createElement("div");
                        container.classList.add("container");
                        // Add story content to container
                        
                        
                        const newsTitle = document.createElement("div");
                        newsTitle.classList.add("newsTitle");
                        container.appendChild(newsTitle);
                        newsTitle.innerHTML = `Title: ${data.title}`;


                        const newsUrl = document.createElement("div");
                        newsUrl.classList.add("newsUrl");
                        container.appendChild(newsUrl);
                        newsUrl.innerHTML = `Url: ${data.url}`;

                        const date = new Date(data.time * 1000);
                        const newsDate = document.createElement("div");
                        newsDate.classList.add("newsDate");
                        container.appendChild(newsDate);
                        newsDate.innerHTML = `Date: ${date}`;
                        
                        
                        main.appendChild(container);
                    })
                    .catch((error) => {
                        console.error("Error fetching story:", error);
                    });
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}

getNews()