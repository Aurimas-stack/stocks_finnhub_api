# React, Node.js & MongoDB project: "Finnhub_stocks_app".

## Short Description:
* API: https://finnhub.io/api/v1/ .
* Front-end part: Get needed company profile, symbols & stock information.
* Back-end part: Post searched stocks & company name to the node.js console when looking up stock information. Send the same information to MongoDB database.

### Detailed description:
* On page load input and button are displayed.
* Input is validated this way:
    - HTML: `maximum length`.
    - JS: `empty string`, `maximum word length` and by testing if the word only contains `spaces and letters`.
* Input validation errors are displayed above the input as the user types.
* Input has `select` option, which allows to look up company profile or symbols.
* Input has `word counter` which displays amount of words left to type. Styles of the counter change depending if the needed length is reached.
* Search can be done with either `click` or `enter`.
* While data is being fetched, a spinning element is displayed on the main screen:
    - Once data was fetched, or if there was no data, or if there was an error, element is hidden.
* For the most part, the component's state is managed with `userReducer`, some components use `useState`.
* Once the data was fetched, depending on the `select` option, a component is rendered: a Symbol lookup component or a Company profile component.
* Company profile component displays:
    - `Stock search button`.
    - Information about company (name, currency, symbol, url).
* Symbol lookup component displays:
    - `Stock search button` / Symbol.
    - Company name.
* Clicking `stock search button` opens a `modal` window.
* `Modal` has these inputs:
    - Input for start date,
    - Input for end date,
    - Input for stock resolution.
    - Search button
* Clicking `modal search button` starts stock data fetch for the selected company.
    - While data is being fetched a spinning element is displayed.
* Once stock data was fetched, a graphical respresentation is displayed:
    - A stock "candles" chart,
    - A "volume" area chart,
    - User can change the charts by clicking button above the chart.
* Information about stocks (company name and stock information) is sent to backend and displayed to the node.js console and sent to mongoDB Atlas database.
* `Modal` can be closed by clicking on ("X") button or on the backdrop.
* Errors for symbol, company profile & stock information are displayed in the appropriate positions.
________________________________________________________________________________________________________________

* For styling purposes SASS (`.scss`) is used for custom styles.
* Styling is responsive to the different screen sizes.
* "React-boostrap" was used for the buttons in the symbol lookup window.
* Charts are created using "React Apex Chart" open-source library.
________________________________________________________________________________________________________________

* There are tests written for some of the components.
________________________________________________________________________________________________________________

* Before running project API Key is needed: `../stocks/src/utils/get-response.js`.