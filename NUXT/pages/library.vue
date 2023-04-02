<template>
  <div>
    <div class="d-flex justify-space-between mb-2 mx-7">
      <h4
        class="background--text w-50"
        :class="$vuetify.theme.dark ? 'text--lighten-3' : 'text--darken-3'"
      >
        Local Playlists
      </h4>
      <v-btn text tile elevation="0" class="w-5-0" @click="dialog = true">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
    <div>
      <playlist-card
        v-for="(playlist, key) in playlists"
        :key="key"
        :playlist="JSON.parse(playlist)"
      />
    </div>

    <v-btn
      text
      class="entry text-left setting-btn no-spacing"
      to="/history"
      nuxt
      :style="{
        borderRadius: `${$store.state.tweaks.roundTweak / 2}rem`,
        paddingLeft:
          $store.state.tweaks.roundTweak > 0 ? '' : '1.5rem !important',
      }"
    >
      <v-icon
        :style="{
          borderRadius: `${$store.state.tweaks.roundTweak / 2}rem`,
        }"
        class=".icon"
        >mdi-history</v-icon
      >
      History
    </v-btn>
    <!-- Create Playlist Dialog -->
    <v-dialog v-model="dialog" width="500">
      <v-card
        class="rounded-lg"
        :class="
          $vuetify.theme.dark ? 'background lighten-1' : 'background darken-1'
        "
      >
        <v-card-title class="text-h5">Create Playlist</v-card-title>
        <v-card-text>
          <v-text-field v-model="playlistName" label="Playlist Name" solo />
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
            {{ lang.cancel }}
          </v-btn>
          <v-btn color="primary" text @click="createPlaylist()">
            {{ lang.create }}
          </v-btn>
        </v-card-actions>
      </v-card></v-dialog
    >
  </div>
</template>

<script>
import playlistCard from "../components/playlistCard.vue";
export default {
  components: { playlistCard },
  data() {
    return {
      dialog: false,
      lang: {},
      playlistName: null,
    };
  },
  computed: {
    playlists() {
      const playlists = this.$store.state.playlist.playlists;
      Object.keys(playlists).forEach(
        (key) => (playlists[key] = JSON.parse(playlists[key]))
      );
      return playlists;
    },
  },
  mounted() {
    const lang = this.$lang();
    this.lang = lang.mods.developer;
  },
  methods: {
    createPlaylist: function () {
      this.$store.commit("playlist/createPlaylist", this.playlistName);
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
.setting-btn {
  /* overrides Vuetify defaults (all caps) */
  text-transform: none !important;
}
.setting-btn:first-letter {
  /* Capitalizes first-letter only */
  text-transform: uppercase !important;
}
.entry {
  width: 100%;
  font-size: 1.2em;
  justify-content: left !important;
  padding: 1.5em 0.5em 1.5em 0.5em !important;
}
.icon {
  margin-right: 0.5em;
}
</style>
