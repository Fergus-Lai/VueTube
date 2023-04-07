<template>
  <div>
    <playlist-video-card
      v-for="(video, index) in playlist.videos"
      :key="index"
      :video="video"
    />
  </div>
</template>

<script>
import playlistVideoCard from "../components/playlistVideoCard.vue";
export default {
  components: { playlistVideoCard },
  computed: {
    playlist() {
      return this.$store.state.playlist.currentPlaylist;
    },
  },
  methods: {
    deletePlaylistVideo(target) {
      this.$store.commit("playlist/removeFromPlaylist", {
        playlistIndex: this.playlist.index,
        videoIndex: target,
      });
    },
  },
};
</script>
