/**
 * Song Data
 * Free mp3 samples 
 */
const songList = [
    {
        title: "Acoustic Breeze",
        file: "acousticbreeze.mp3",
        cover: "1.jpg"
    },
    {
        title: "A New Beginning",
        file: "anewbeginning.mp3",
        cover: "2.jpg"
    },
    {
        title: "Creative Minds",
        file: "creativeminds.mp3",
        cover: "3.jpg"
    },
]

/* Current Song */
let currentSong = null

/* Capture elements from the DOM */
const songs = document.getElementById("songs")
const audio = document.getElementById("audio")
const cover = document.getElementById("cover")
const title = document.getElementById("title")
const play = document.getElementById("play")
const prev = document.getElementById("prev")
const next = document.getElementById("next")
const progress = document.getElementById("progress")
const progressContainer = document.getElementById("progress-container")

progressContainer.addEventListener("click", setProgress)

/* Listen AUDIO Element */
audio.addEventListener("timeupdate", updateProgress)

/* Listen Click Event in Control Buttons */
play.addEventListener("click", () => {

    if (audio.paused) {
        playSong()
    } else {
        pauseSong()
    }
})

next.addEventListener("click", () => nextSong())
prev.addEventListener("click", () => prevSong())

/* Load & Show song list */

function loadSongs () {
    songList.forEach ((song, index) => {
      // ok -> console.log(index)
      // Create li element
      const li = document.createElement("li");

      // Create a element
      const link = document.createElement("a");

      // Fill a
      link.textContent = song.title;
      link.href = "#";

      /* Listen CLICKs
         Use The arrow function to load the index of elements from the array when
         the user clicks on the song title. 
      */
      link.addEventListener("click", () => loadSong(index));

      // Add li element 
      li.appendChild(link);
      // Add li to ul
      songs.appendChild(li);
    })
}

/* Load selected song */
function loadSong(songIndex) { // console.log(songIndex)

    /**
     * If songIndex is strict unequal (!==) to currentSong it executes
     * 
     */
    if (songIndex !== currentSong) {

        changeActiveClass(currentSong, songIndex)

        // In currentSong save the index of the song that is played
        currentSong = songIndex

        audio.src = "./audio/" + songList[songIndex].file
        playSong()
        changeCover(songIndex)
        changeSongTitle(songIndex)
    }
}

/* Update controls */
function updateControls () {

    if (audio.paused) {
        play.classList.remove("fa-pause")
        play.classList.add("fa-play")
    } else {
        play.classList.add("fa-pause")
        play.classList.remove("fa-play")
    }
}

/* Update Song Progress Bar */
function updateProgress (event) {

    const {duration, currentTime} = event.srcElement
    const percentage = (currentTime / duration) * 100
    progress.style.width = percentage + "%"
}

/* Make clickable Progress Bar */
function setProgress (event) {
    const totalWidth = this.offsetWidth // width 100% progress bar
    const progressWidth = event.offsetX
    const currentPercentage = (progressWidth / totalWidth) * audio.duration
    audio.currentTime = currentPercentage
}

/* Play song */
function playSong () {

    if (currentSong != null) {
        audio.play()
        updateControls()
    }
}

/* Pause song */
function pauseSong () {
    audio.pause()
    updateControls()

}

/* Change Active Class */
function changeActiveClass (lastIndex, newIndex) {

    const links = document.querySelectorAll("a")

    if (lastIndex !== null) {
        links[lastIndex].classList.remove("active")
    }
    links[newIndex].classList.add("active")
}

/* Show & Change song cover */
function changeCover(songIndex) {

    cover.src = "./img/" + songList[songIndex].cover
}

/* Show & Change song title */
function changeSongTitle (songIndex) {
    title.innerText = songList[songIndex].title
}

/* Previous song */
function prevSong () {
    if (currentSong > 0) {
        loadSong(currentSong - 1)
    } else {
        loadSong(songList.length - 1)
    }
}

/* Next song */
function nextSong () {
   if (currentSong < songList.length - 1) {
        loadSong(currentSong + 1)
   } else {
       loadSong(0)
   }
}

/* Launch next song when current song is finished */
audio.addEventListener("ended", () => nextSong())

/* GREAT SUCCESS */
loadSongs()