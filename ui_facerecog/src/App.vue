<template>
  <div id="app">
    <router-view v-if="!authLoading"></router-view>
    <div v-else class="center-screen">
      <div
        style="width: 3rem; height: 3rem"
        class="spinner-grow text-primary"
        role="status"
      >
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  created() {
    this.currentUser();
  },
  computed: mapGetters(["authLoading"]),
  methods: {
    ...mapActions(["currentUser"]),
  },
};
</script>

<style>
.center-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 100vh;
}
</style>
