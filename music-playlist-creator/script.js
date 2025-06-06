dataResponse.then(() => {

    const shuffle = (playlists) => {

        return playlists.map(a => ({ sort: Math.random(), innerHTML: a }))
            .sort((a, b) => a.sort - b.sort)
            .map(a => a.innerHTML)
    }
    let song_items = []
    const handleMakeSongItem = (song) => {
        song_items.push(`
                        <img src="assets/img/song.png" alt="song png" />
                        <div class="modal-song-item-text">
                            <p class="duration">${song.duration}</p>
                            <h4>${song.title}</h4>
                            <p>${song.artist}</p>
                            <p>${song.album}</p>
                        </div>
                        `
        )
        console.log("appended song:" + song);

    }

    const handleRenderSongs = () => { //make sure song_items is updated!
        const modal_songs_container = document.querySelector(".modal-songs-container")

        //clear old songs
        modal_songs_container.innerHTML = `
            <button class="shuffle">
                <svg viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="shuffleIconTitle" stroke="#000000" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title id="shuffleIconTitle">Shuffle</title> <path d="M21 16.0399H17.7707C15.8164 16.0399 13.9845 14.9697 12.8611 13.1716L10.7973 9.86831C9.67384 8.07022 7.84196 7 5.88762 7L3 7"></path> <path d="M21 7H17.7707C15.8164 7 13.9845 8.18388 12.8611 10.1729L10.7973 13.8271C9.67384 15.8161 7.84196 17 5.88762 17L3 17"></path> <path d="M19 4L22 7L19 10"></path> <path d="M19 13L22 16L19 19"></path> </g></svg>
                <p>Shuffle<p>
            </button>
        `
        //add shuffle listener
        const shuffle_button = document.querySelector(".shuffle")
        shuffle_button.addEventListener("click", () => {
            song_items = shuffle(song_items)
            handleRenderSongs();
        })


        song_items.forEach((song_innerHTML) => {
            const song_item = document.createElement('div')
            song_item.classList.add('modal-song-item')
            song_item.innerHTML = song_innerHTML
            modal_songs_container.appendChild(song_item)
        })
    }
    // const dataResponse = fetch('data/data.json')
    //     .then(response => response.json())
    //     .then(data => {
    //     })
    //     .catch(error => {
    //         console.error('Failed to load data: ', error);
    //     })
    if (active_playlists.length > 0) {
    const playlist_cards_container = document.querySelector(".playlist-cards")

    active_playlists.forEach((playlist) => {
        const playlist_card_item = document.createElement("div")
        playlist_card_item.classList.add("playlist-card-item")
        playlist_card_item.setAttribute('id', `playlist_id_${playlist.playlistID}`) //Create playlist card item div

        playlist_card_item.innerHTML = `
                <img src="${playlist.playlist_art}" alt="Default_pfp">
                <div class="playlist-info-container">
                    <h4>${playlist.playlist_name}</h4>
                    <p>${playlist.playlist_author}</p>
                </div>
                <div class = "like-container" id="like_container_${playlist.playlistID}">
                    <svg data-testid="geist-icon" height="16" stroke-linejoin="round" class="like-heart" style="color:currentColor" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.06463 3.20474C5.79164 1.93175 3.72772 1.93175 2.45474 3.20474C1.18175 4.47773 1.18175 6.54166 2.45474 7.81465L8 13.3599L13.5453 7.81465C14.8182 6.54166 14.8182 4.47773 13.5453 3.20474C12.2723 1.93175 10.2084 1.93175 8.93537 3.20474L8.53033 3.60979L8 4.14012L7.46967 3.60979L7.06463 3.20474ZM8 2.02321C6.13348 0.286219 3.21165 0.326509 1.39408 2.14408C-0.464694 4.00286 -0.464691 7.01653 1.39408 8.87531L7.46967 14.9509L8 15.4812L8.53033 14.9509L14.6059 8.87531C16.4647 7.01653 16.4647 4.00286 14.6059 2.14408C12.7884 0.326509 9.86653 0.286221 8 2.02321Z" fill="currentColor"></path></svg>
                    <p>${playlist.likeCount}</p>
                </div>
                <svg class="trash-icon" id="trash_icon_${playlist.playlistID}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 6H5H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
        `
        playlist_cards_container.appendChild(playlist_card_item)

        const like_container = document.getElementById(`like_container_${playlist.playlistID}`)
        const like_count_text = document.querySelector(`#like_container_${playlist.playlistID} p`)
        const like_button = document.querySelector(`#like_container_${playlist.playlistID} svg`)

        like_container.addEventListener("click", (event) => {

            like_count_text.innerText = (parseInt(like_count_text.innerText) > playlist.likeCount ? playlist.likeCount : playlist.likeCount + 1)
            event.stopPropagation()
            like_button.setAttribute("style", like_button.getAttribute("style") === "color:red" ? "color:currentColor" : "color:red")

        })

        // Add delete functionality to trash icon
        const trash_icon = document.getElementById(`trash_icon_${playlist.playlistID}`);
        trash_icon.addEventListener("click", (event) => {
            event.stopPropagation();

            // Remove playlist from active_playlists array
            const index = active_playlists.findIndex(p => p.playlistID === playlist.playlistID);
            if (index !== -1) {
                active_playlists.splice(index, 1);
            }

            // Remove playlist card from DOM
            playlist_card_item.remove();

            // Show "No Playlists Added" message if no playlists left
            if (active_playlists.length === 0) {
                const no_playlist_div = document.getElementById("no-playlist");
                no_playlist_div.classList.remove("hide");
            }
        });

    })
    const dialog = document.querySelector(".modal-overlay");
    const playlist_items = document.querySelectorAll(".playlist-card-item")
    const closeButton = document.querySelector(".closeModal")

    let activePlaylist = null;

    closeButton.addEventListener("click", () => {
        dialog.close()
        dialog.classList.remove("open-modal")
    })

    playlist_items.forEach((element) => {
        element.addEventListener("click", () => {
            let index = element.getAttribute("id")
            index = parseInt(index.substring(index.length - 1)) - 1
            console.log("index: " + index);
            activePlaylist = active_playlists[index]
            const modal_playlist_header = document.querySelector(".modal-playlist-header")

            // Load Header info pre-render
            modal_playlist_header.innerHTML = `
                <img src="${activePlaylist.playlist_art}">
                <div class="modal-playlist-header-text">
                    <h2>${activePlaylist.playlist_name}</h2>
                    <p>${activePlaylist.playlist_author}</p>
                </div>
            `
            // Load song info pre-render

            activePlaylist.songs.forEach((song) => {
                handleMakeSongItem(song)
            })
            handleRenderSongs();
            dialog.classList.add("open-modal")
            dialog.showModal()
        })
    })


    }
    else {
    console.log("empty data.json, giving no playlist screen")
    const no_playlist_div = document.getElementById("no-playlist");
    no_playlist_div.classList.remove("hide");
    }
})
