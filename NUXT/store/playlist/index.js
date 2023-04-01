import { v4 as uuid } from "uuid";

export const state = () => ({
  playlists: {},
});

// Shape of playlist
// id: { name: string, videos: [] }

export const mutations = {
  initPlaylists(state) {
    if (process.client) {
      // read local storage and parse the list of objects
      state.playlists = localStorage
        .getItem("playlists")
        .split(",")
        .map((playlist) => JSON.parse(playlist));
    }
  },
  createPlaylist(state, name) {
    const id = uuid();
    state.playlists[id] = { name, videos: [] };
    localStorage.setItem(
      "playlists",
      state.playlists.map((playlist) => JSON.stringify(playlist))
    );
  },
  removePlaylist(state, id) {
    delete state.playlists[id];
    localStorage.setItem(
      "playlists",
      state.playlists.map((playlist) => JSON.stringify(playlist))
    );
  },
  addToPlaylist(state, id, video) {
    state.playlists[id].video.push(video);
    localStorage.setItem(
      "playlists",
      state.playlists.map((playlist) => JSON.stringify(playlist))
    );
  },
  removeFromPlaylist(state, id, videoIndex) {
    state.playlists[id].video.splice(videoIndex, 1);
    localStorage.setItem(
      "playlists",
      state.playlists.map((playlist) => JSON.stringify(playlist))
    );
  },
};
