
const dataResponse = fetch('data/data.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Failed to load data: ', error);
    })

const dialog = document.querySelector("dialog");
const playlist_items = document.querySelectorAll(".playlist-card-item")
const closeButton = document.querySelector(".closeModal")

console.log(dialog)
console.log(playlist_items)

closeButton.addEventListener("click", () => {
    dialog.close()
    dialog.classList.remove("open-modal")
})
playlist_items.forEach((element) => {
    element.addEventListener("click", () => {
        dialog.classList.add("open-modal")
        console.log("opening dialog")
        dialog.showModal()
    })
})

