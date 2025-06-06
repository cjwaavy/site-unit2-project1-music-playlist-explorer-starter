console.log("hi")
const featured_button = document.getElementById("featured_button")
const playlist_button = document.getElementById("playlist_button")
console.log(featured_button);

featured_button.addEventListener("click", () =>{
    window.location.href="featured.html"
})
playlist_button.addEventListener("click", () =>{
    window.location.href="index.html"
})