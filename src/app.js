mapboxgl.accessToken =
  'pk.eyJ1IjoienltYW50YXN2ZW5jbCIsImEiOiJjbHd2MTAzOXcwbTlsMm1zN2tneW8zdnEwIn0.U6c1Y5WaVmPsaizZXIL8Ow';

const ships = [{ id: 1, name: 'Ship A', coordinates: [19.8633, 58.488] }];

const shipsTravelPath = [
  {
    id: 1,
    path: [
      [19.8633, 58.488],
      [20, 59],
      [21, 60],
      [22, 61],
    ],
  },
];

/**
 * The path of the ships predicted by the ML model. Which ships are going to meet each other.
 */
const shipsGuessedPath = [];

window.addEventListener('DOMContentLoaded', () => {
  initMap();
});

let map = null;

function initMap() {
  map = new mapboxgl.Map({
    container: 'map', // container ID
    // style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [19.8633, 58.488], // starting position [lng, lat]
    zoom: 9, // starting zoom
  });

  initShips();

  shipsTravelPath.forEach((ship) => {
    const path = ship.path;
    const line = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'LineString',
        coordinates: path,
      },
    };

    map.on('load', () => {
      map.addSource(`line-${ship.id}`, {
        type: 'geojson',
        data: line,
      });

      map.addLayer({
        id: `line-${ship.id}`,
        type: 'line',
        source: `line-${ship.id}`,
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#888',
          'line-width': 8,
        },
      });
    });
  });
}

function initShips() {
  ships.forEach((ship) => {
    new mapboxgl.Marker()
      .setLngLat(ship.coordinates)
      // .setHTML(`<h1>${ship.name}</h1>`)
      .addTo(map);

    const labelEl = document.createElement('div');
    labelEl.innerHTML = ship.name;

    new mapboxgl.Marker({
      element: labelEl,
      anchor: 'top-left',
      offset: [25, -25], // Adjust the offset as needed
    })
      .setLngLat(ship.coordinates)
      .addTo(map);
  });
}

// async function fetchData() {
//   try {
//     const response = await fetch('https://api.example.com/data');
//     if (!response.ok) {
//       throw new Error('Network response was not ok ' + response.statusText);
//     }
//     const data = await response.json();
//     // Update the DOM with the fetched data
//     dataContainer.textContent = JSON.stringify(data, null, 2);
//   } catch (error) {
//     console.error('Fetch error:', error);
//     dataContainer.textContent = 'Error fetching data';
//   }
// }

// // Fetch data immediately on load
// fetchData();

// // Fetch data every X seconds (e.g., every 5 seconds)
// const interval = 5000; // 5000 milliseconds = 5 seconds
// setInterval(fetchData, interval);
