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

/* custom modal */
.fr-modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}

.fr-modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 50%;
}

.fr-close {
  color: #aaaaaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.fr-close:hover,
.fr-close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

/* Tool tip */
.fr-tooltip {
  position: relative;
  display: inline-block;
}

.fr-tooltip .fr-tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  
  /* Position the tooltip */
  position: absolute;
  z-index: 1;
  bottom: 100%;
  left: 50%;
  margin-left: -60px;

}

.fr-tooltip:hover .fr-tooltiptext {
  visibility: visible;
}
</style>