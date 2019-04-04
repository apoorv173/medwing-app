This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install`
To install the node modules, required to run the app.

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>

### `npm test -- --coverage`
Gives the coverage report of the test cases.

### `TO USE A LIBRARY OR NOT TO - decision not to...`
The first design decision was about using a library to render the maps instead of using the default google object and API.
But after careful consideration and comparing the popularity and the size of various libraries, came to conclusion that the efficient libraries are way too big ranging from 40kb  to 110kb, some other libraries(still ~10kb) were smaller on size but didn't provide enough features to use in a production app.
<br>
REFER TO THE SCREENSHOT IN THE ASSETS FOLDER. Libraries compared:-<br>
    react-google-maps<br>
    google-maps-react<br>
    google-map-react<br>
    google-maps-js

### `Markers`
a) Add marker<br>
Markers can be added from the map as well as the search box, present in the form. When we enter the value in the search box, the marker is not automatically added, by adding a  a break point in the form of a state object called positionObj, which retains the position and if the user clicks on the 'Add marker' button, then only the marker is displayed. This helps the user in a way that, they can also cancel the marker add even after pulling the data from Geocoding.<br>

b) Remove marker<br>
Marker can be removed by clicking the remove button. <br>

c) Edit marker<br>
Markers are edited in a similar way as add marker functionality, when clicked on edit marker button, the marker position is stored in state, and THE MARKER ICON IS CHANGED TO EDIT MODE, so as to reflect an action and have a consistent behaviour. <br>
If the user clicks on the cancel button, then the marker icon is changed to default.<br>
And if the user selects edit marker, then the marker is reflected on the map and the corresponding details in the list at the same index as the original marker.

### `Delay in the search to save API calls`
Added SETIMEOUT AND CLEARTIMEOUT in search box, to trigger the google maps API call only after half a second, so that IT DOES NOT TRIGGER CONCURRENT OR REDUNDANT API calls.


### `Marker list `
The marker list on the right is created with overflow and fixed height so the content of the map and the list remains of the same height, and on add markers the list is added can be easily scrollable without page scroll.


### `React 15 vs 16(And Functional vs class components)`
Used hooks which are in new react 16.8 through out the application, now seggregating the components in separate custom hooks.


Still figuring out a way to write test cases for functional expressions present inside component which can't be exported as separate methods.

I started with TYPESCRIPT(.tsx) modules but didn’t took into care, that google maps CRUD is not a standard app and lot of globals or window object would be associated with it, so, had to move back to jsx syntax. So, a day was wasted just in ironing out these details.