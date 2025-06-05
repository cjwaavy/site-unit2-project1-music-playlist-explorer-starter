
const dataResponse = fetch('data/data.json')
    .then(response => response.json())
    .then(data => {
        if(data.length > 0){
            console.log("list longer than 0!:");
            console.log(data)
            console.log('generating content');
            const playlist_cards_container = document.querySelector(".playlist-cards")
            console.log(playlist_cards_container);
            
            data.forEach((playlist) => {
                const playlist_card_item = document.createElement("div")
                playlist_card_item.classList.add("playlist-card-item") //Create playlist card item div

                playlist_card_item.innerHTML = `
                    <div id="playlist_id_${playlist.playlistID}" class="playlist-card-item">
                        <img src="${playlist.playlist_art}" alt="Default_pfp">
                        <div class="playlist-info-container">
                            <h4>${playlist.playlist_name}</h4>
                            <p>${playlist.playlist_author}</p>
                        </div>
                        <div class = "like-container" id="like_container_${playlist.playlistID}">
                            <svg data-testid="geist-icon" height="16" stroke-linejoin="round" class="like-heart" style="color:currentColor" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.06463 3.20474C5.79164 1.93175 3.72772 1.93175 2.45474 3.20474C1.18175 4.47773 1.18175 6.54166 2.45474 7.81465L8 13.3599L13.5453 7.81465C14.8182 6.54166 14.8182 4.47773 13.5453 3.20474C12.2723 1.93175 10.2084 1.93175 8.93537 3.20474L8.53033 3.60979L8 4.14012L7.46967 3.60979L7.06463 3.20474ZM8 2.02321C6.13348 0.286219 3.21165 0.326509 1.39408 2.14408C-0.464694 4.00286 -0.464691 7.01653 1.39408 8.87531L7.46967 14.9509L8 15.4812L8.53033 14.9509L14.6059 8.87531C16.4647 7.01653 16.4647 4.00286 14.6059 2.14408C12.7884 0.326509 9.86653 0.286221 8 2.02321Z" fill="currentColor"></path></svg>
                            <p>${playlist.likeCount}</p>
                        </div>
                    </div>
                `
                playlist_cards_container.appendChild(playlist_card_item)

                const like_container = document.getElementById(`like_container_${playlist.playlistID}`)
                const like_count_text = document.querySelector(`#like_container_${playlist.playlistID} p`)
                const like_button = document.querySelector(`#like_container_${playlist.playlistID} svg`)

                like_container.addEventListener("click",(event) => {
                console.log('like event')
                console.log(parseInt(like_count_text.innerText));
                
                like_count_text.innerText = (parseInt(like_count_text.innerText) > playlist.likeCount ? playlist.likeCount : playlist.likeCount + 1)
                event.stopPropagation()
                like_button.setAttribute("style", like_button.getAttribute("style") === "color:red"  ? "color:currentColor" : "color:red")
                
            } )

            })
            const dialog = document.querySelector("dialog");
            const playlist_items = document.querySelectorAll(".playlist-card-item")
            const closeButton = document.querySelector(".closeModal")
            
            let activePlaylist = null;

            console.log(dialog)
            console.log(playlist_items)
            
            closeButton.addEventListener("click", () => {
                dialog.close()
                dialog.classList.remove("open-modal")
            })

            playlist_items.forEach((element) => {
                element.addEventListener("click", () => {
                    let index = element.getAttribute("id")
                    index = parseInt(index.substring(index.length - 1)) -1
                    console.log("index: " + index);
                    activePlaylist = data[index]
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
                    console.log(activePlaylist)
                    const modal_songs_container = document.querySelector(".modal-songs-container")
                    modal_songs_container.innerHTML = '' //clear old songs
                    activePlaylist.songs.forEach((song) =>{
                        const song_item = document.createElement('div')
                        song_item.classList.add('modal-song-item')
                        console.log(song_item);
                        song_item.innerHTML = `
                                <img src="assets/img/song.png" alt="song png" />
                                <div class="modal-song-item-text">
                                    <p class="duration">${song.duration}</p>
                                    <h4>${song.title}</h4>
                                    <p>${song.artist}</p>
                                    <p>${song.album}</p>
                                </div>
                        `

                        modal_songs_container.appendChild(song_item)
                    })
                    dialog.classList.add("open-modal")
                    dialog.showModal()
                })
            })

            
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


