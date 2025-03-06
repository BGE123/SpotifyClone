//alert("Note: This is just a clone and most features arent available for use");
let playlistsCreated = false;
let playlists = []; //Array to hold created playlists
const pls = {
  myPlaylist: [], // Can have multiple playlists if you want
};

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
  let top = document.querySelector(".top");
  let numOfSongs = document.querySelector(".playlist span");
  let popup = document.querySelector(".popup");
  let popupImg = document.querySelector(".square6 img");
  let popupTitle = document.querySelector(".txtcon5 h2");
  let popupArtist = document.querySelector(".txtcon5 p");
  let mark = document.querySelector(".mark");
  let every = document.querySelector(".everything");
  const mainSection = document.getElementById("main-display");
  const psection = document.getElementById("psection");
  let playlist = document.getElementById("playlist");
  let others = document.getElementById("others");
  let playPop = document.querySelector(".playlist-pop");
  const playlistImageFile = document.getElementById("playlistImageFile");
  const imagePreview = document.getElementById("imagePreview");
  const imagePreviewText = document.getElementById("imagePreviewText");
  const createPlaylistBtn = document.getElementById("createPlaylistBtn");
  const playlistNameInput = document.getElementById("playlistName");
  const playlistList = document.getElementById("playlistList");
  const listOfPlay = document.querySelector(".listofplay");

  let selectedImageDataUrl = null;
  let currentTrack = null;

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
      const allNames = document.querySelectorAll(".names");
      allNames.forEach((name) => {
        name.classList.add("hidden");
      });
      const allDesc = document.querySelectorAll(".desc");
      allDesc.forEach((desc) => {
        desc.style.width = "unset";
      });
    } else {
      middle.style.width = "75vw";
      middle.style.marginLeft = "17.5vw";
      side.classList.add("expand");
      setTimeout(() => {
        const allNames = document.querySelectorAll(".names");
        allNames.forEach((name) => {
          name.classList.remove("hidden");
        });
        const allDesc = document.querySelectorAll(".desc");
        allDesc.forEach((desc) => {
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

  bottom.addEventListener("click", function () {
    popup.style.top = "9%";
  });
  mark.addEventListener("click", function () {
    popup.style.top = "100%";
  });

  document.getElementById("searchButton").addEventListener("click", searchSong);

  async function searchSong() {
    const query = document.getElementById("searchInput").value.trim();

    if (query === "") {
      alert("Please enter a search term!");
      return;
    }

    try {
      const response = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(
          query
        )}&media=music&limit=10`
      );
      const data = await response.json();
      displayResults(data.results);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch songs. Please try again.");
    }
  }

  function displayResults(tracks) {
    const resultsList = document.getElementById("results");
    resultsList.classList.remove("hidden");
    resultsList.innerHTML = ""; // Clear old results

    if (tracks.length === 0) {
      resultsList.innerHTML = "<li>No results found.</li>";
      return;
    }

    tracks.forEach((track) => {
      const li = document.createElement("li");
      li.classList.add("track-item");

      const albumCover = document.createElement("img");
      albumCover.src = track.artworkUrl100;
      albumCover.alt = track.collectionName;
      albumCover.classList.add("album-cover");

      const trackInfo = document.createElement("div");
      trackInfo.innerHTML = `
              <strong>${track.trackName}</strong> by ${track.artistName} <br>
          `;

      li.appendChild(albumCover);
      li.appendChild(trackInfo);
      resultsList.appendChild(li);

      li.addEventListener("click", () => {
        displayTrackInMainSection(track);
      });
    });
    // Add click-outside logic to hide the results
    document.addEventListener("click", handleOutsideClick);
  }

  function handleOutsideClick(event) {
    const resultsList = document.getElementById("results");
    const searchButton = document.getElementById("searchButton");
    const searchInput = document.getElementById("searchInput");

    if (
      !resultsList.contains(event.target) &&
      event.target !== searchButton &&
      event.target !== searchInput
    ) {
      resultsList.classList.add("hidden"); // Hide results
      document.removeEventListener("click", handleOutsideClick); // Clean up listener
    }
  }

  function formatDuration(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  function formatReleaseDate(isoString) {
    const date = new Date(isoString);

    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function displayTrackInMainSection(track) {
    currentTrack = track; // Store the current track so "Add to Playlist" knows what to add
    every.classList.add("hidden");
    mainSection.classList.remove("hidden");
    psection.classList.add("hidden");
    const highQualityImage = track.artworkUrl100.replace("100x100", "600x600");
    const duration = formatDuration(track.trackTimeMillis);
    const releaseDate = formatReleaseDate(track.releaseDate); // Format release date

    mainSection.innerHTML = `
        <div class="main-track-info">
          <div class="begin2">
            <div class="square7">
              <img id="album-cover-image" src="${highQualityImage}" alt="${track.collectionName}  class="main-album-cover" />
            </div>
              <div class="track-details">
                  <h2>${track.trackName}</h2>
                  <p>by ${track.artistName}</p>
                  <p><strong>Album:</strong> ${track.collectionName}</p>
              </div>
          </div>
            <div class="rest2" id="others">
              <div class="bar">
                <div>
                  <div class="circle2"><i class="fa-solid fa-play fa-lg"></i></div>
                  <div class="circle3"><i class="fa-solid fa-ellipsis"></i></div>
                  <div class="dropdown-menu hidden" id="dropdown">
                    <p class="add">Add to Playlist</p>
                    <p>Remove from Playlist</p>
                  </div>
                </div>
                <div>
                  <p>List</p>
                  <i class="fa-solid fa-list-ul"></i>
                </div>
              </div>
              <div class="row1">
                <p>#</p>
                <p>Title</p>
                <p>Album</p>
                <p>Date released</p>
                <i class="fa-regular fa-clock"></i>
              </div>
              <div class="songRows" id="row">
                <div class="songs" id ="playNow">
                  <p>1</p>
                  <div class="r">
                    <div class="square4"><img src="${highQualityImage}" /></div>
                    <div class="txtcon3">
                      <h4>${track.trackName}</h4>
                      <p>${track.artistName}</p>
                    </div>
                  </div>
                  <p>${track.collectionName}</p>
                  <p>${releaseDate}</p>
                  <p>${duration}</p>
                </div>
              </div>
        </div>
    `;

    // When the image loads, extract color and set background
    const albumImage = document.getElementById("album-cover-image");
    albumImage.crossOrigin = "Anonymous"; // To avoid cross-origin issues
    albumImage.onload = () => {
      const colorThief = new ColorThief();
      const dominantColor = colorThief.getColor(albumImage);

      // Convert to rgb string
      const backgroundColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;

      // Set background
      mainSection.style.background = `linear-gradient(to bottom, ${backgroundColor}, #111)`;
      others.style.background = `linear-gradient(to bottom, ${backgroundColor}, #111)`;
    };
    document.getElementById("results").classList.add("hidden");
    document.removeEventListener("click", handleOutsideClick);
    function change() {
      bottomPlayerArtist.textContent = `${track.artistName}`;
      bottomPlayerTitle.textContent = `${track.trackName}`;
      bottomPlayerImage.src = `${highQualityImage}`;

      song.src = `${track.previewUrl}`;
      song.play();

      sidePlayerArtist.textContent = `${track.artistName}`;
      sidePlayerTitle.textContent = `${track.trackName}`;
      sidePlayerImage.src = `${highQualityImage}`;
      playPause();
      changeColour();
    }
    document.getElementById("playNow").addEventListener("click", change);
    document.querySelector(".circle2").addEventListener("click", change);
    document.querySelector(".circle3").addEventListener("click", () => {
      if (document.getElementById("dropdown").classList.contains("hidden")) {
        document.getElementById("dropdown").classList.remove("hidden");
      } else {
        document.getElementById("dropdown").classList.add("hidden");
      }
      document.querySelector(".add").addEventListener("click", () => {
        addTrackToPlaylist(currentTrack); // currentTrack should be the track you're viewing
      });
    });
  }

  playlist.addEventListener("click", function () {
    mainSection.classList.add("hidden");
    psection.classList.add("hidden");
    every.classList.remove("hidden");
  });
  //Playlists stuff
  //Create and add playlists
  document.getElementById("addPlayBtn").addEventListener("click", function () {
    playPop.style.display = "unset";
    document.querySelector(".backdrop").style.display = "unset";
  });
  //Clear inputs when cancel is clicked
  function clearInputs() {
    const playlistNameInput = document.getElementById("playlistName");
    const playlistImageFile = document.getElementById("playlistImageFile");
    const imagePreview = document.getElementById("imagePreview");
    const imagePreviewText = document.getElementById("imagePreviewText");

    playlistNameInput.value = ""; // Clear text input
    playlistImageFile.value = ""; // Clear file input
    selectedImageDataUrl = null; // Clear stored image data URL
    imagePreview.src = ""; // Remove preview image
    imagePreview.style.display = "none"; // Hide preview image
    imagePreviewText.style.display = "block"; // Show "Click to select image" text
  }
  //Cancel button event
  document.getElementById("closePopup").addEventListener("click", function () {
    playPop.style.display = "none";
    document.querySelector(".backdrop").style.display = "none";
    clearInputs();
  });
  //select image when box is clicked
  document.getElementById("imageUploadBox").addEventListener("click", () => {
    playlistImageFile.click();
    console.log("clicked");
  });
  //change box to selected image from storage
  playlistImageFile.addEventListener("change", () => {
    const file = playlistImageFile.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        selectedImageDataUrl = e.target.result;
        imagePreview.src = selectedImageDataUrl;
        imagePreview.style.display = "block";
        imagePreviewText.style.display = "none";
      };
      reader.readAsDataURL(file);
    }
  });
  createPlaylistBtn.addEventListener("click", () => {
    const name = playlistNameInput.value.trim();
    if (name && selectedImageDataUrl) {
      addPlaylistToSidebar(name, selectedImageDataUrl);
      savePlaylistToStorage(name, selectedImageDataUrl);
      playPop.style.display = "none";
      clearInputs();
    } else {
      alert("Please enter a playlist name and select an image.");
    }
  });

  function addPlaylistToSidebar(name, imageURL) {
    playlistsCreated = true; // Set to true when a playlist is created
    playlists.push({ name, imageURL, tracks: [] }); // Add the playlist to the array
    const playlistDiv = document.createElement("div");
    playlistDiv.classList.add("desc", "playlist-item");
    playlistDiv.setAttribute("id", "playlist");

    playlistDiv.innerHTML = `
        <div class="square">
            <img src="${imageURL}" />
        </div>
        <div class="names hidden">
            <p>${name}</p>
            <p>Playlist</p>
        </div>
    `;
    playlistDiv.addEventListener("click", () => {
      psection.classList.remove("hidden");
      every.classList.add("hidden");
      mainSection.classList.add("hidden");
      const playlistHeader = `
      <div class="main-track-info">
          <div class="begin2">
              <div class="square7">
                  <img id="album-image" src="${imageURL}" alt="${name}" class="main-album-cover" />
              </div>
              <div class="playlist">
                  <h1>${name}</h1>
              </div>
          </div>
          <div class="rest2" id="others">
              <div class="bar">
                  <div>
                      <div class="circle2"><i class="fa-solid fa-play fa-lg"></i></div>
                      <i class="fa-solid fa-ellipsis"></i>
                  </div>
                  <div>
                      <p>List</p>
                      <i class="fa-solid fa-list-ul"></i>
                  </div>
              </div>
              <div class="row1">
                  <p>#</p>
                  <p>Title</p>
                  <p>Album</p>
                  <p>Date released</p>
                  <i class="fa-regular fa-clock"></i>
              </div>
              <div class="songRows" id="playlistRows"></div>
          </div>
      </div>
  `;

      psection.innerHTML = playlistHeader;

      const playlistRowsContainer = document.getElementById("playlistRows");
      renderPlaylistTracks(playlistRowsContainer);
      // Use a small delay to ensure the DOM is updated
      setTimeout(() => {
        const albumImage = document.querySelector("#album-image");
        if (albumImage) {
          albumImage.onload = () => {
            const colorThief = new ColorThief();
            const dominantColor = colorThief.getColor(albumImage);

            const backgroundColor = `rgb(${dominantColor[0]}, ${dominantColor[1]}, ${dominantColor[2]})`;

            psection.style.background = `linear-gradient(to bottom, ${backgroundColor}, #111)`;
            others.style.background = `linear-gradient(to bottom, ${backgroundColor}, #111)`;
          };
          // Trigger load event in case image is already cached
          if (albumImage.complete) albumImage.onload();
        } else {
          console.error("album-image not found");
        }
      }, 50); // Short delay to let the DOM update
    });

    playlistList.appendChild(playlistDiv);
    playPop.style.display = "none";
    document.querySelector(".backdrop").style.display = "none";
    clearInputs();
    console.log(playlists);
  }
  function showAddToPlaylistPopup() {
    listOfPlay.classList.remove("hidden");
    if (!playlistsCreated) {
      alert("No playlists created");
      return;
    } else {
      listOfPlay.innerHTML = ""; // Clear previous entries
      // Loop through the playlists array and create a checkbox for each
      const phead = document.createElement("h3");
      phead.textContent = "Playlists";
      listOfPlay.appendChild(phead);
      playlists.forEach((playlist) => {
        const playlistItem = document.createElement("div");
        playlistItem.innerHTML = `
            <input type="checkbox" id="${playlist.name}" />
            <label for="${playlist.name}">${playlist.name}</label>
        `;

        listOfPlay.appendChild(playlistItem);
      });
      // Create Save button
      const saveButton = document.createElement("button");
      saveButton.textContent = "Save";
      saveButton.addEventListener("click", () => {
        const checkedPlaylists = [
          ...document.querySelectorAll('input[type="checkbox"]:checked'),
        ].map((cb) => cb.id);

        // Add the track to each checked playlist
        checkedPlaylists.forEach((playlistName) => {
          const playlist = playlists.find((pl) => pl.name === playlistName);
        });
      });

      const cancelButton = document.createElement("button");
      cancelButton.textContent = "Cancel";
      cancelButton.addEventListener("click", () => {
        listOfPlay.classList.add("hidden");
        document.querySelector(".backdrop").style.display = "none";
        clearInputs();
      });

      // Append buttons to the popup
      listOfPlay.appendChild(saveButton);
      listOfPlay.appendChild(cancelButton);

      document.querySelector(".backdrop").style.display = "unset";
    }
  }
  //function to add track to new playlist
  function addTrackToPlaylist(track) {
    pls.myPlaylist.push(track);
    alert(`Added "${track.trackName}" to Playlist!`);
  }
  function renderPlaylistTracks(container) {
    container.innerHTML = ""; // Clear old tracks

    pls.myPlaylist.forEach((track, index) => {
      const highQualityImage = track.artworkUrl100.replace(
        "100x100",
        "600x600"
      );
      const duration = formatDuration(track.trackTimeMillis);
      const releaseDate = formatReleaseDate(track.releaseDate);

      const trackRowElement = document.createElement("div");
      trackRowElement.classList.add("songs");
      trackRowElement.innerHTML = `
    <p class="track-index">${index + 1}</p>
    <div class="r">
        <div class="square4"><img src="${highQualityImage}" /></div>
        <div class="txtcon3">
            <h4>${track.trackName}</h4>
            <p>${track.artistName}</p>
        </div>
    </div>
    <p>${track.collectionName}</p>
    <p>${releaseDate}</p>
    <p>${duration}</p>
`;

      trackRowElement.addEventListener("click", () => {
        bottomPlayerArtist.textContent = `${track.artistName}`;
        bottomPlayerTitle.textContent = `${track.trackName}`;
        bottomPlayerImage.src = `${highQualityImage}`;
        song.src = `${track.previewUrl}`;
        song.play();
        sidePlayerArtist.textContent = `${track.artistName}`;
        sidePlayerTitle.textContent = `${track.trackName}`;
        sidePlayerImage.src = `${highQualityImage}`;
        playPause();
        changeColour();
      });

      container.appendChild(trackRowElement);
    });
    setupTrackRemoval();
  }
  function setupTrackRemoval() {
    const trackIndexes = document.querySelectorAll(".track-index");
    trackIndexes.forEach((trackIndex) => {
      trackIndex.addEventListener("click", () => {
        trackIndex.parentElement.classList.add("playN");
        setTimeout(() => {
          trackIndex.parentElement.remove();
          updateTrackNumbers();
        }, 300);
      });
    });
  }

  function updateTrackNumbers() {
    const tracks = document.querySelectorAll(".songs");
    tracks.forEach((track, index) => {
      const indexElement = track.querySelector(".track-index");
      if (indexElement) {
        indexElement.textContent = index + 1;
      }
    });
  }
});
