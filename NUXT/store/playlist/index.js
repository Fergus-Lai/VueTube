export const state = () => ({
  playlists: [],
});

// Shape of playlists
// [playlist, playlist]

// Shape of playlist
// {name: string, videos: []}

export const mutations = {
  initPlaylists(state) {
    if (process.client) {
      // read local storage and parse the list of objects
      state.playlists = JSON.parse(localStorage.getItem("playlists"));
    }
  },
  createPlaylist(state, name) {
    state.playlists.push({ name, videos: [] });
    localStorage.setItem("playlists", JSON.stringify(state.playlists));
  },
  removePlaylist(state, index) {
    state.playlists.splice(index, 1);
    localStorage.setItem("playlists", JSON.stringify(state.playlists));
  },
  addToPlaylist(state, { index, video }) {
    state.playlists[index].video.push(video);
    localStorage.setItem("playlists", JSON.stringify(state.playlists));
  },
  removeFromPlaylist(state, id, videoIndex) {
    state.playlists[id].video.splice(videoIndex, 1);
    localStorage.setItem("playlists", JSON.stringify(state.playlists));
  },
};
