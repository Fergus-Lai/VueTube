import { v4 as uuid } from "uuid";

export const state = () => ({
  playlists: {},
});

// Shape of playlist
// id: { name: string, videos: [] }

const playlistsToString = (playlists) => {
  const tempPlaylists = playlists;
  Object.keys(tempPlaylists).forEach((key) => {
    tempPlaylists[key] = JSON.stringify(tempPlaylists[key]);
  });
  return tempPlaylists;
};

const stringToPlaylists = (playlistsString) => {
  const tempPlaylists = JSON.parse(playlistsString);
  Object.keys(tempPlaylists).forEach((key) => {
    tempPlaylists[key] = JSON.parse(tempPlaylists[key]);
  });
  console.log(tempPlaylists);
  return tempPlaylists;
};

export const mutations = {
  initPlaylists(state) {
    if (process.client) {
      // read local storage and parse the list of objects
      state.playlists = stringToPlaylists(localStorage.getItem("playlists"));
    }
  },
  createPlaylist(state, name) {
    const id = uuid();
    state.playlists[id] = { name, videos: [] };
    localStorage.setItem(
      "playlists",
      JSON.stringify(playlistsToString(state.playlists))
    );
  },
  removePlaylist(state, id) {
    delete state.playlists[id];
    localStorage.setItem(
      "playlists",
      JSON.stringify(playlistsToString(state.playlists))
    );
  },
  addToPlaylist(state, id, video) {
    state.playlists[id].video.push(video);
    localStorage.setItem(
      "playlists",
      JSON.stringify(playlistsToString(state.playlists))
    );
  },
  removeFromPlaylist(state, id, videoIndex) {
    state.playlists[id].video.splice(videoIndex, 1);
    localStorage.setItem(
      "playlists",
      JSON.stringify(playlistsToString(state.playlists))
    );
  },
};
