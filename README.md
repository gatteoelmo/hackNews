# Hacker News Stories Loader

https://haknews.netlify.app/

This project is a simple web application that fetches and displays the latest news from Hacker News. It uses the Hacker News API to retrieve news data and shows it to the user, with the option to load more stories using a "Load More" button.

## Features

- **News Loading**: The `getNews()` function retrieves the latest stories from the Hacker News API, processes the data, and displays it on the web page.
- **News Display**: Each news item is shown with its title, URL, and publication date.
- **Continuous Loading**: A "Load More" button allows users to load and view additional news stories in batches of 10.

## Built with

- **HTML & CSS**
- **JavaSript**
- **Lodash**
- **Axios**
- **Vite**

## Code Structure

1. **Variables and Functions**

   ```javascript
   let lastLoadedIndex = 0;
   ```

   - Variable that tracks the index of the last loaded news stories.

   ```javascript
   function getNews() {
     // Function to load and display news stories
   }
   ```

   - Main function to load and display news stories. It fetches data from the API, determines which story IDs to load, and then displays the fetched stories.

   ```javascript
   function fetchStory(id) {
     // Function to fetch data for a single story using its ID
   }
   ```

   - Function to fetch data for a single story using its ID.

   ```javascript
   function makeButton() {
     // Function to create a "Load More" button
   }
   ```

   - Function to create a "Load More" button that loads additional news stories when clicked.

2. **Initial Loading**

   ```javascript
   getNews();
   setTimeout(makeButton, 1500);
   ```

   - `getNews()`: Called on startup to load the initial news stories.
   - `setTimeout(makeButton, 1500)`: Creates the "Load More" button after a short delay.

## Usage

1. **Include the HTML Code**

   Ensure you have a basic HTML structure with an element with the ID `main` where the news stories will be inserted.

   ```html
   <!DOCTYPE html>
   <html lang="en">
     <head>
       <meta charset="UTF-8" />
       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
       <title>Hacker News Stories Loader</title>
       <style>
         .container {
           margin: 10px;
           padding: 10px;
           border: 1px solid #ddd;
         }
         .newsTitle {
           font-size: 1.2em;
           font-weight: bold;
         }
         .newsUrl {
           color: blue;
         }
         .newsDate {
           font-size: 0.8em;
           color: gray;
         }
       </style>
     </head>
     <body>
       <div id="main"></div>
       <script src="path/to/your/script.js"></script>
     </body>
   </html>
   ```

2. **Include the JavaScript Code**

   Save the JavaScript code in a separate file, for example `script.js`, and include it in your HTML page as shown above.

## Errors and Debugging

- Check the browser console for any errors during the loading of news stories.
- Ensure that your internet connection is active and that the Hacker News API is available.

## Contributing

If you would like to contribute to this project, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
