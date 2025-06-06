const dataResponse = fetch('data/data.json')
    .then(response => response.json())
    .then(data => {
        if(data.length > 0){
            const featured_playlist = data[Math.floor(Math.random() * data.length)]

            console.log( bv);
            
            const featured_playlist_containter = document.querySelector(".featured-playlist-containter")
            featured_playlist_containter.innerHTML = `
                <div class="featured-playlist-info">
                    <img src="${featured_playlist.playlist_art}">
                    <h2>${featured_playlist.playlist_name}</h2>
               </div>
            `
        }
        else{
            console.log("empty data.json, giving no playlist screen")
            const no_playlist_div = document.getElementById("no-playlist");
            no_playlist_div.classList.remove("hide");
        }
    })
    .catch(error => {
        console.error('Failed to load data: ', error);
    })