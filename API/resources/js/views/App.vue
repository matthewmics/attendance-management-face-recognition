<template>
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

.c-sliding-pagination__list-element {
  background: white;
  font-size: 14px;
}
.c-sliding-pagination__list-element a {
  color: black !important;
  padding: 12px;
}

.c-sliding-pagination__list-element:hover {
  background: #e1f5fe;
}

.c-sliding-pagination__list-element.c-sliding-pagination__list-element--active {
  background: #4e73df;
}
.c-sliding-pagination__list-element.c-sliding-pagination__list-element--active
  a {
  color: white !important;
}

.c-sliding-pagination__list > li {
  margin: 0px !important;
}
</style>