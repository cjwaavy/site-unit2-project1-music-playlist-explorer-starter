console.log("HELLO")
dataResponse.then(() => {

    if(active_playlists.length == 0) {
        console.log("No active playlists found");
    }
    if (active_playlists.length > 0) {
        const featured_playlist = active_playlists[Math.floor(Math.random() * active_playlists.length)]
    
        console.log(featured_playlist);
    
        const featured_playlist_containter = document.querySelector(".featured-playlist-containter")
        featured_playlist_containter.innerHTML = `
            <div class="featured-playlist-info">
                <img src="${featured_playlist.playlist_art}">
                <h2>${featured_playlist.playlist_name}</h2>
            </div>
        `
    
        const featured_songs_container = document.createElement('div')
        featured_songs_container.classList.add("featured-songs-container")
    
        featured_playlist_containter.appendChild(featured_songs_container)
    
        featured_playlist.songs.slice(0, 5).forEach((song) => {
            featured_songs_container.innerHTML += `\n
                <div class="featured-song-item">
                     <img src="assets/img/song.png" alt="song png" />
                        <div class="featured-song-item-text">
                             <h4>${song.title}</h4>
                             <p>${song.artist}</p>
                             <p>${song.album}</p>
                             <p class="duration">${song.duration}</p>
                        </div>
                </div>
            `
        });
    }
})
