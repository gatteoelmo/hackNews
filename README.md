# Hacker News Stories Loader

Questo progetto è una semplice applicazione web che carica e visualizza le ultime notizie da Hacker News. Utilizza l'API di Hacker News per ottenere i dati delle notizie e li mostra all'utente, con la possibilità di caricare ulteriori storie tramite un pulsante "Load More".

## Funzionalità

- **Caricamento delle notizie**: La funzione `getNews()` recupera le ultime storie dall'API di Hacker News, elaborandole e visualizzandole sulla pagina web.
- **Visualizzazione delle notizie**: Ogni notizia è mostrata con il titolo, l'URL e la data di pubblicazione.
- **Caricamento continuo**: Un pulsante "Load More" consente di caricare e visualizzare ulteriori notizie in batch di 10.

## Struttura del Codice

1. **Variabili e Funzioni**

   ```javascript
   let lastLoadedIndex = 0;
   ```

   - Variabile che tiene traccia dell'ultimo indice delle notizie caricate.

   ```javascript
   function getNews() {
     // Funzione per caricare e visualizzare le notizie
   }
   ```

   - Funzione principale per caricare e visualizzare le notizie. Recupera i dati dall'API, elenca gli ID delle notizie da caricare, e poi visualizza le notizie recuperate.

   ```javascript
   function fetchStory(id) {
     // Funzione per recuperare i dati di una singola storia utilizzando il suo ID
   }
   ```

   - Funzione per recuperare i dati di una singola storia utilizzando il suo ID.

   ```javascript
   function makeButton() {
     // Funzione per creare un pulsante "Load More"
   }
   ```

   - Funzione per creare un pulsante "Load More" che carica ulteriori notizie quando viene cliccato.

2. **Caricamento iniziale**

   ```javascript
   getNews();
   setTimeout(makeButton, 1500);
   ```

   - `getNews()`: Viene chiamato all'avvio per caricare le prime notizie.
   - `setTimeout(makeButton, 1500)`: Crea un pulsante "Load More" dopo un breve ritardo.

## Come Utilizzare

1. **Includere il Codice HTML**

   Assicurati di avere una struttura HTML di base con un elemento con l'ID `main` dove verranno inserite le notizie.

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

2. **Includere il Codice JavaScript**

   Salva il codice JavaScript in un file separato, ad esempio `script.js`, e includilo nella tua pagina HTML come mostrato sopra.

## Errori e Debug

- Verifica la console del browser per eventuali errori durante il caricamento delle notizie.
- Assicurati che la tua connessione a Internet sia attiva e che l'API di Hacker News sia disponibile.

## Contribuire

Se desideri contribuire a questo progetto, sentiti libero di aprire un issue o inviare una pull request.

## Licenza

Questo progetto è concesso in licenza sotto la [MIT License](LICENSE).
