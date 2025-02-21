document.addEventListener("DOMContentLoaded", function () {
  //Loads the page before doing anything else
  let progress = document.getElementById("progress");
  let progress2 = document.getElementById("progress2");
  let song = document.getElementById("song");
  let play = document.getElementById("play");
  let back = document.getElementById("backwards");
  let forward = document.getElementById("forward");
  let shuffle = document.getElementById("shuffle");
  let bottom = document.querySelector(".bottom");
  let bottomPlayerTitle = document.querySelector(".txtcon2 h4");
  let bottomPlayerArtist = document.querySelector(".txtcon2 p");
  let bottomPlayerImage = document.querySelector(".square2 img");
  let audioSource = song.querySelector("source");
  let songs = document.querySelectorAll(".songs");
  let currentSongIndex = 0;
  let volumeBar = document.getElementById("volume");
  let volumeIcon = document.getElementById("volicon");
  let volumeValue = document.getElementById("volumeValue");
  const middle = document.querySelector(".middle");
  let middleEnd = document.querySelector(".middle-end");
  let left = document.getElementById("left");
  let songInfo = document.getElementById("songin");
  let head = document.querySelector(".head");
  let songtitl = document.querySelector(".txtcon4");
  let expand = document.getElementById("expand");
  let side = document.querySelector(".side");
  let sidePlayerTitle = document.querySelector(".txtcon4 h2");
  let sidePlayerArtist = document.getElementById("artiste");
  let sidePlayerImage = document.querySelector(".square5 img");
  let begin = document.getElementById("begin");
  let begin2 = document.getElementById("begin2");
  let squares = document.querySelectorAll(".square");
  let names = document.querySelectorAll(".names");
  let description = document.querySelectorAll(".desc");
  let top = document.querySelector(".top");
  let numOfSongs = document.querySelector(".playlist span");
  let popup = document.querySelector(".popup");
  let popupImg = document.querySelector(".square6 img");
  let popupTitle = document.querySelector(".txtcon5 h2");
  let popupArtist = document.querySelector(".txtcon5 p");
  let mark = document.querySelector(".mark");

  middleEnd.addEventListener("mouseenter", function () {
    middle.style.width = "92vw"; // Shrink the middle
    middleEnd.style.width = "2.5vw"; // Expand the middle-end
    middleEnd.style.transform = "translateX(-0.5vw)";
  });

  middleEnd.addEventListener("mouseleave", function () {
    middle.style.width = "92.5vw"; // Reset to original width
    middleEnd.style.width = "2vw";
    middleEnd.style.transform = "translateX(0)";
    left.classList.add("fa-angle-left");
    middleEnd.classList.remove("no-align");
    songInfo.classList.add("hidden");
    head.classList.add("hidden");
    songtitl.classList.add("hidden");
  });
  middleEnd.addEventListener("click", function () {
    middle.style.width = "75vw";
    middleEnd.style.width = "19.5vw";
    middleEnd.style.transform = "translateX(-17.5vw)";
    middleEnd.classList.add("no-align");
    left.classList.remove("fa-angle-left");

    setTimeout(() => {
      songInfo.classList.remove("hidden");
      head.classList.remove("hidden");
      songtitl.classList.remove("hidden");
    }, 300);
  });
  // Set max progress bar value when metadata loads
  song.onloadedmetadata = function () {
    progress.max = song.duration; //Maximum val of the progress bar is set to the songs total time
    progress.value = song.currentTime;
    progress2.max = song.duration;
    progress2.value = song.currentTime;
  };

  // Function to update progress bar as song plays
  function updateProgress() {
    progress.value = song.currentTime; // Every second, the progress bar moves a tiny bit forward to match the song
    progress2.value = song.currentTime;
  }
  //Function to change bar color when clicked or played, for volume as well
  function changeColour() {
    progress.style.background = "#00f356";
    progress.classList.add("white-thumb");
    volumeBar.style.background = "#00f356";
    volumeBar.classList.add("white-thumb");
  }
  numOfSongs.innerHTML = `${songs.length + 1} songs`;

  // Function to play/pause song
  function playPause() {
    if (song.paused) {
      song.play();
      play.classList.remove("fa-play");
      play.classList.add("fa-pause");
    } else {
      song.pause();
      play.classList.remove("fa-pause");
      play.classList.add("fa-play");
      changeColour();
    }
  }

  // Update progress bar every 500ms while playing
  setInterval(updateProgress, 500);

  // Seek song when progress bar is manually changed
  progress.addEventListener("input", function () {
    song.currentTime = (progress.value / progress.max) * song.duration;
  });

  //Change volume when slider moves
  volumeBar.addEventListener("input", function () {
    song.volume = volumeBar.value;
    volumeValue.textContent = Math.round(volumeBar.value * 100) + "%"; //Change percentage when moved
  });

  //When volume icon is clickec event
  volumeIcon.addEventListener("click", function () {
    if (volumeIcon.classList.contains("fa-volume-high")) {
      volumeIcon.classList.remove("fa-volume-high");
      volumeIcon.classList.add("fa-volume-xmark");
      song.volume = 0;
      volumeBar.value = 0;
    } else {
      volumeIcon.classList.remove("fa-volume-xmark");
      volumeIcon.classList.add("fa-volume-high");
      song.volume = 1;
      volumeBar.value = 1;
    }
  });
  // Function to load and play a song
  function playSong(index) {
    if (index < 0 || index >= songs.length) return; // Prevent invalid index

    let selectedSong = songs[index];
    let songTitle = selectedSong.querySelector(".txtcon3 h4").textContent;
    let songArtist = selectedSong.querySelector(".txtcon3 p").textContent;
    let songImage = selectedSong.querySelector(".square4 img").src;
    let songFile =
      "Assets/" + songTitle.replace(/\s+/g, "").toLowerCase() + ".mp3";

    // Update bottom player info
    bottomPlayerTitle.textContent = songTitle;
    bottomPlayerArtist.textContent = songArtist;
    bottomPlayerImage.src = songImage;

    // Update Side info
    sidePlayerTitle.textContent = songTitle;
    sidePlayerArtist.textContent = songArtist;
    sidePlayerImage.src = songImage;

    //Update popup info
    popupTitle.textContent = songTitle;
    popupArtist.textContent = songArtist;
    popupImg.src = songImage;

    progress.value = 0;
    song.currentTime = 0;

    // Change audio source and play
    audioSource.src = songFile;
    song.load();
    song.play();
    play.classList.remove("fa-play");
    play.classList.add("fa-pause");

    // Update current song index
    currentSongIndex = index;

    changeColour();
  }

  // Click event for selecting a song
  songs.forEach((songElement, index) => {
    songElement.addEventListener("click", function () {
      playSong(index);
      console.log(songElement);
    });
  });

  // Play/Pause button event
  begin.addEventListener("click", function (event) {
    event.stopPropagation();
    playPause();
  });
  begin2.addEventListener("click", playPause);

  function nextbut() {
    let nextIndex = (currentSongIndex + 1) % songs.length;
    playSong(nextIndex);
  }

  // Next song button
  forward.addEventListener("click", function (event) {
    event.stopPropagation();
    nextbut();
  });

  if (middleEnd) {
    middleEnd.addEventListener("scroll", function () {
      if (middleEnd.scrollTop > 0) {
        // Adjust threshold as needed
        head.style.backgroundColor = "rgba(0, 0, 0)"; // Change to any color
        head.style.boxShadow = "0 6px 10px rgba(0, 0, 0, 0.8)"; // Blur only at the bottom
      } else {
        head.style.backgroundColor = "transparent"; // Original color
        head.style.boxShadow = "none"; // Remove blur effect
      }
      console.log("scrolling");
    });
  }

  window.addEventListener("scroll", function () {
    if (this.window.scrollY > 30) {
      top.classList.add("hidden");
      console.log("scrolled");
    }
  });

  let isExpanded = false;

  expand.addEventListener("click", function () {
    //Increae width on click and reduce it back to original on second click
    if (isExpanded) {
      middle.style.width = "92.5vw";
      side.classList.remove("expand");
      middle.style.marginLeft = "0";
      side.style.justifyItems = "center";
      side.style.paddingLeft = "0";
      side.style.transition = "none";
      names.forEach((name) => {
        name.classList.add("hidden");
      });
      description.forEach((desc) => {
        desc.style.width = "unset";
      });
    } else {
      middle.style.width = "75vw";
      middle.style.marginLeft = "17.5vw";
      side.classList.add("expand");
      setTimeout(() => {
        names.forEach((name) => {
          name.classList.remove("hidden");
        });
        description.forEach((desc) => {
          desc.style.width = "98%";
        });
      }, 300);
      console.log("expanded");
      side.style.justifyItems = "unset";
      side.style.paddingLeft = "8px";
      side.style.transition = "width 0.3s ease-in-out";
    }
    isExpanded = !isExpanded;
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === " ") {
      playPause();
      console.log("jey");
    }
  });

  bottom.addEventListener("click", function () {
    popup.style.top = "9%";
  });
  mark.addEventListener("click", function () {
    popup.style.top = "100%";
  });
});

const clientId = "68cc5f49399f49a5a2de8841eeef3fc9";
const clientSecret = "c46bfeefbeab4691b98761fa37bdd3db";

// Function to get an access token from Spotify
async function getAccessToken() {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  return data.access_token;
}

// Function to search for a song and display its details
async function searchSong(songName) {
  const token = await getAccessToken();

  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      songName
    )}&type=track&limit=1`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const data = await response.json();
  const track = data.tracks.items[0];

  if (track) {
    displaySong(track);
  } else {
    document.getElementById("song-container").innerHTML =
      "<p>Song not found.</p>";
  }
}

// Function to display song details in the HTML
function displaySong(track) {
  const songContainer = document.getElementById("song-container");

  songContainer.innerHTML = `
    <img src="${track.album.images[1].url}" alt="Album Cover" width="200">
    <h2>${track.name}</h2>
    <p>Artist: ${track.artists.map((artist) => artist.name).join(", ")}</p>
    <audio controls>
      <source src="${track.preview_url}" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
  `;
  console.log(track);
}

// Call function with a song name
searchSong("Reach out to the truth");
