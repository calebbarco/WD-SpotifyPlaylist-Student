function scrollToApp() {
  document.getElementById("app").scrollIntoView({ behavior: "smooth" });
}

// =====================================================
// STEP 1: Define the playlist data object
// =====================================================
const playlistData = {
  focus: [
    {
      title: "Tycho — Awake",
      cover:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&q=80",
    },
    {
      title: "Lo-fi Beats",
      cover:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&q=80",
    },
    {
      title: "Hans Zimmer — Time",
      cover:
        "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&q=80",
    },
    {
      title: "Bonus: Brian Eno — An Ending",
      cover:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&q=80",
      bonus: true,
    },
  ],
  chill: [
    {
      title: "Frank Ocean — Pink + White",
      cover:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",
    },
    {
      title: "SZA — Good Days",
      cover:
        "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=300&q=80",
    },
    {
      title: "Daniel Caesar — Best Part",
      cover:
        "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&q=80",
    },
    {
      title: "Bonus: Beach House — Space Song",
      cover:
        "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?w=300&q=80",
      bonus: true,
    },
  ],
  hype: [
    {
      title: "Drake — Nonstop",
      cover:
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=300&q=80",
    },
    {
      title: "Travis Scott — SICKO MODE",
      cover:
        "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&q=80",
    },
    {
      title: "Kanye West — POWER",
      cover:
        "https://images.unsplash.com/photo-1464375117522-1311dd6d0cd1?w=300&q=80",
    },
    {
      title: "Bonus: Run The Jewels — Legend Has It",
      cover:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&q=80",
      bonus: true,
    },
  ],
  dreamy: [
    {
      title: "Beach House — Myth",
      cover:
        "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&q=80",
    },
    {
      title: "M83 — Midnight City",
      cover:
        "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&q=80",
    },
    {
      title: "Cigarettes After Sex — Nothing's Gonna Hurt You Baby",
      cover:
        "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?w=300&q=80",
    },
    {
      title: "Bonus: Cocteau Twins — Cherry-coloured Funk",
      cover:
        "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?w=300&q=80",
      bonus: true,
    },
  ],
  party: [
    {
      title: "Dua Lipa — Levitating",
      cover:
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=300&q=80",
    },
    {
      title: "The Weeknd — Blinding Lights",
      cover:
        "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=300&q=80",
    },
    {
      title: "Beyoncé — CUFF IT",
      cover:
        "https://images.unsplash.com/photo-1464375117522-1311dd6d0cd1?w=300&q=80",
    },
    {
      title: "Bonus: Daft Punk — One More Time",
      cover:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&q=80",
      bonus: true,
    },
  ],
  rainy: [
    {
      title: "Bon Iver — Holocene",
      cover:
        "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=300&q=80",
    },
    {
      title: "Billie Eilish — everything i wanted",
      cover:
        "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&q=80",
    },
    {
      title: "Lana Del Rey — Video Games",
      cover:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80",
    },
    {
      title: "Bonus: Phoebe Bridgers — Moon Song",
      cover:
        "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&q=80",
      bonus: true,
    },
  ],
};

/* DOM ELEMENTS */
const selector = document.getElementById("mood-selector");
const modeSelector = document.getElementById("mode-selector");
const container = document.getElementById("playlist-container");
const feedback = document.getElementById("feedback");
const milestone = document.getElementById("milestone");
const repeatToggle = document.getElementById("repeat-toggle");
const shuffleButton = document.getElementById("shuffle-button");
const app = document.getElementById("app");

const selectionMode = document.createElement("select");
selectionMode.id = "selection-mode";
selectionMode.className = "form-select w-50 mb-3";
selectionMode.setAttribute("aria-label", "Choose what to play");
selectionMode.innerHTML = `
  <option value="playlist">Playlist</option>
  <option value="individual">Individual songs</option>
  <option value="type">Songs by type</option>
`;
selector.parentNode.insertBefore(selectionMode, selector);

const songChoices = document.createElement("div");
songChoices.className = "song-choices mb-3";
songChoices.setAttribute("aria-label", "Choose individual songs");
feedback.parentNode.insertBefore(songChoices, feedback);

// Counts songs removed in the current playlist. Will power
// the milestone tracker you build in Step 10.
let songsRemovedCount = 0;
let repeatEnabled = false;

repeatToggle.addEventListener("click", () => {
  repeatEnabled = !repeatEnabled;
  repeatToggle.setAttribute("aria-pressed", String(repeatEnabled));
  repeatToggle.setAttribute(
    "aria-label",
    `Repeat playlist: ${repeatEnabled ? "on" : "off"}`,
  );
  repeatToggle.textContent = `Repeat: ${repeatEnabled ? "On" : "Off"}`;
});

/* =====================================================
   STEP 2: Basic Event Listener Setup
   What is an event? Why "change" instead of "click"?
   The page reacts when the user does something.
   ===================================================== */
selector.addEventListener("change", () => {
  updateSelectionControls();
  buildPlaylist();
});
modeSelector.addEventListener("change", buildPlaylist);
shuffleButton.addEventListener("click", shufflePlaylist);
selectionMode.addEventListener("change", () => {
  updateSelectionControls();
  buildPlaylist();
});

function renderSongChoices(mood) {
  songChoices.replaceChildren();
  songChoices.dataset.mood = mood;

  const heading = document.createElement("p");
  heading.className = "remove-instructions";
  heading.textContent = "Choose the songs to add to your playlist:";
  songChoices.appendChild(heading);

  playlistData[mood].forEach((song, index) => {
    const label = document.createElement("label");
    label.className = "song-choice";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = String(index);
    checkbox.checked = true;
    checkbox.addEventListener("change", buildPlaylist);

    const title = document.createElement("span");
    title.textContent = song.title;
    label.append(checkbox, title);
    songChoices.appendChild(label);
  });
}

function updateSelectionControls() {
  const isIndividual = selectionMode.value === "individual";
  selector.setAttribute(
    "aria-label",
    selectionMode.value === "type" ? "Choose a song type" : "Choose a mood",
  );
  selector.options[0].textContent =
    selectionMode.value === "type" ? "Select a type" : "Select a mood";
  modeSelector.hidden = selectionMode.value !== "playlist";
  songChoices.hidden = !isIndividual;

  if (
    isIndividual &&
    selector.value &&
    Object.prototype.hasOwnProperty.call(playlistData, selector.value) &&
    songChoices.dataset.mood !== selector.value
  ) {
    renderSongChoices(selector.value);
  }
}

function buildPlaylist() {
  let mood = selector.value;
  const selection = selectionMode.value;
  if (!mood) {
    feedback.textContent = "Your personalized playlist will appear here.";
    feedback.className = "feedback-box";
    renderPlaylist([]);
    app.removeAttribute("data-mood");
    milestone.textContent = "";
    songsRemovedCount = 0;
    return;
  }

  const moodUnavailable = !Object.prototype.hasOwnProperty.call(
    playlistData,
    mood,
  );
  if (moodUnavailable) {
    mood = "focus";
    selector.value = mood;
    updateSelectionControls();
  }
  app.dataset.mood = mood;

  const allSongs = playlistData[mood];
  let songs = [];

  if (selection === "playlist" && modeSelector.value === "quickPlay") {
    songs = allSongs.slice(0, 3);
  } else if (selection === "playlist" && modeSelector.value === "fullSession") {
    songs = allSongs;
  } else if (selection === "playlist" && modeSelector.value === "singleTrack") {
    songs = allSongs.slice(0, 1);
  } else if (selection === "playlist" && modeSelector.value === "bonusTracks") {
    songs = allSongs.filter((song) => song.bonus);
  } else if (selection === "individual") {
    const selectedIndexes = new Set(
      [...songChoices.querySelectorAll("input:checked")].map((input) =>
        Number(input.value),
      ),
    );
    songs = allSongs.filter((song, index) => selectedIndexes.has(index));
  } else if (selection === "type") {
    songs = allSongs;
  }

  songsRemovedCount = 0;
  milestone.textContent = "";

  renderPlaylist(songs);

  if (songs.length === 0) {
    feedback.textContent = moodUnavailable
      ? "That mood isn't available. Showing Focus, but no songs matched this selection."
      : "No songs found. Choose at least one song.";
    feedback.className = "feedback-box error";
    return;
  }

  feedback.textContent = moodUnavailable
    ? `That mood isn't available. Showing Focus with ${songs.length} song${songs.length === 1 ? "" : "s"}.`
    : `${songs.length} song${songs.length === 1 ? "" : "s"} loaded.`;
  feedback.className = "feedback-box success";
}

function renderPlaylist(songs) {
  container.replaceChildren();
  shuffleButton.disabled = songs.length < 2;
  songs.forEach((song) => {
    const row = document.createElement("div");
    row.className = "song-row";
    row.style.setProperty("--song-index", String(container.children.length));

    const image = document.createElement("img");
    image.className = "album-art";
    image.src = song.cover;
    image.alt = song.title;
    image.onerror = function () {
      this.onerror = null;
      this.src = "https://placehold.co/60x60?text=Music";
    };

    const title = document.createElement("span");
    title.textContent = song.title;

    const removeHint = document.createElement("span");
    removeHint.className = "remove-hint";
    removeHint.textContent = "click to remove";

    row.append(image, title, removeHint);
    row.addEventListener("click", () => {
      if (row.classList.contains("removing")) {
        return;
      }

      row.classList.add("removing");
      window.setTimeout(() => {
        if (row.parentNode !== container) {
          return;
        }

        row.remove();
        songsRemovedCount += 1;
        const remainingSongs = container.children.length;
        shuffleButton.disabled = remainingSongs < 2;
        feedback.textContent = remainingSongs
          ? `${remainingSongs} song${remainingSongs === 1 ? "" : "s"} remaining.`
          : "Playlist cleared.";
        feedback.className = "feedback-box success";
        updateMilestone();
      }, 200);
    });
    container.appendChild(row);
  });
}

function shufflePlaylist() {
  const rows = [...container.children];
  for (let index = rows.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [rows[index], rows[swapIndex]] = [rows[swapIndex], rows[index]];
  }
  container.append(...rows);
}

function updateMilestone() {
  const milestones = [
    { count: 1, message: "First song cleared!" },
    { count: 2, message: "Two songs cleared!" },
    { count: 3, message: "Three songs cleared!" },
  ];

  const matchedMilestone = milestones.find(
    (item) => songsRemovedCount === item.count,
  );
  milestone.textContent = matchedMilestone ? matchedMilestone.message : "";
}

updateSelectionControls();
