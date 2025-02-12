// Initialize Variables
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

// All 10 Songs
let songs = [
    { songName: "On & On", filePath: "./songs/1.mp3", coverPath: "./covers/1.jpg" },
    { songName: "Invincible", filePath: "./songs/2.mp3", coverPath: "./covers/2.jpg" },
    { songName: "Mortals", filePath: "./songs/3.mp3", coverPath: "./covers/3.jpg" },
    { songName: "Shine", filePath: "./songs/4.mp3", coverPath: "./covers/4.jpg" },
    { songName: "Why We Lose", filePath: "./songs/5.mp3", coverPath: "./covers/5.jpg" },
    { songName: "Sky High", filePath: "./songs/6.mp3", coverPath: "./covers/6.jpg" },
    { songName: "Symbolism", filePath: "./songs/7.mp3", coverPath: "./covers/7.jpg" },
    { songName: "Heroes Tonight", filePath: "./songs/8.mp3", coverPath: "./covers/8.jpg" },
    { songName: "Feel Good", filePath: "./songs/9.mp3", coverPath: "./covers/9.jpg" },
    { songName: "My Heart", filePath: "./songs/10.mp3", coverPath: "./covers/10.jpg" }
];

// Initialize first song 
audioElement.src = songs[songIndex].filePath;
masterSongName.innerText = songs[songIndex].songName;

// Initialize song list with images and names
const initializeSongItems = () => {
    songItems.forEach((element, i) => {
        element.getElementsByTagName("img")[0].src = songs[i].coverPath;
        element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
        
        // event listener
        element.getElementsByClassName("songItemPlay")[0].addEventListener('click', (e) => {
            makeAllPlays();
            songIndex = i;
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            playSong();
        });
    });
};

// to play specific song i guess it have an error
const playSong = () => {
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
};

// play the next song
const playNextSong = () => {
    songIndex = (songIndex + 1) % songs.length; // Loop back to first song if last song ends
    playSong();
};

// bruhhhh
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playSong();
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
});

audioElement.addEventListener('ended', playNextSong);

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};

document.addEventListener("click", () => {
    audioElement.play().catch(() => {
        console.log("Autoplay blocked. User interaction required.");
    });
});

initializeSongItems();