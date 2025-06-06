
const onFetch = fetch('data/data.json')
.then(response => response.json())
.then(data => {
        console.log(active_playlists)
        const search_bar = document.getElementById('search-bar');
        const search_button = document.getElementById('search-button');
        const filter_options = document.getElementById('filter-options');
        const playlist_card_items = document.querySelectorAll('.playlist-card-item');

        const playlist_cards_container = document.querySelector('.playlist-cards');
        // console.log(filter_options);

        const filterPlaylists = () => {
            // console.log('filtering playlists');
            const query = search_bar.value.toLowerCase();
            const filter = filter_options.value;

            // let playlist_items = playlist_card_items
            let playlist_items = Array.from(playlist_card_items);

            // console.log(data[playlist_items[6].getAttribute('id').slice(-1) - 1]);
            if (filter === 'name') {
                playlist_items.sort((a, b) => active_playlists[a.getAttribute('id').slice(-1) - 1].playlist_name.localeCompare(active_playlists[b.getAttribute('id').slice(-1) - 1].playlist_name));
            } else if (filter === 'likes') {
                playlist_items.sort((a, b) => active_playlists[b.getAttribute('id').slice(-1) - 1].likeCount - active_playlists[a.getAttribute('id').slice(-1) - 1].likeCount);
            } else if (filter === 'author') {
                playlist_items.sort((a, b) => active_playlists[a.getAttribute('id').slice(-1) - 1].playlist_author.localeCompare(active_playlists[b.getAttribute('id').slice(-1) - 1].playlist_author));
            }
            playlist_cards_container.innerHTML = '';
            playlist_items.forEach(card => {
                playlist_cards_container.appendChild(card);
                const title = card.textContent.toLowerCase();
                if (title.includes(query)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });

        }

        search_button.addEventListener('click', filterPlaylists);
        search_bar.addEventListener('input', filterPlaylists);
        filter_options.addEventListener('change', filterPlaylists);
    });
