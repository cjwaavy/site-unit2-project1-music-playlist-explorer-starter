let active_playlists = [];
const dataResponse = fetch('data/data.json')
    .then(response => response.json())
    .then(data => {
        // console.log(data)
        active_playlists = data
    });