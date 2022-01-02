<template>
  <div class="container-fluid">
    <UserForm @on-form-success-submit="loadAppUserPagination(currentPage)" />
    <UserSetFacePicture
      :selectedUser="selectedUser"
      @on-form-success-submit="loadAppUserPagination(currentPage)"
    />
    <UserViewFace
      :selectedUser="selectedUser"
      @on-form-success-submit="loadAppUserPagination(currentPage)"
    />
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Users</h1>
    </div>
    <button type="button" class="btn btn-primary" @click="openUserForm">
      Add new user
    </button>
    <table class="table table-bordered" style="margin-top: 1em">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Created</th>
          <th scope="col">Updated</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody v-if="paginationAppUser">
        <tr v-for="appUser in paginationAppUser.data" :key="appUser.id">
          <td>{{ appUser.id }}</td>
          <td>{{ appUser.name }}</td>
          <td>{{ dateStringToLocal(appUser.created_at) }}</td>
          <td>{{ dateStringToLocal(appUser.updated_at) }}</td>
          <td>
            <div class="fr-tooltip" v-if="!appUser.picture_path">
              <button
                class="btn btn-primary"
                @click.prevent="openSetFacePicture(appUser)"
              >
                <i class="fas fa-image"></i>
              </button>
              <span class="fr-tooltiptext">Set face picture</span>
            </div>
            <div class="fr-tooltip" v-else>
              <button
                class="btn btn-success"
                @click.prevent="openViewFace(appUser)"
              >
                <i class="fas fa-eye"></i>
              </button>
              <span class="fr-tooltiptext">View face</span>
            </div>
          </td>
        </tr>
      </tbody>

      <tfoot>
        <td colspan="5">
          <sliding-pagination
            style="float: right"
            :current="currentPage"
            :total="totalPage"
            @page-change="pageChanged"
          ></sliding-pagination>
        </td>
      </tfoot>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { dateStringToLocal } from "../helpers";
import SlidingPagination from "vue-sliding-pagination";
import UserForm from "./UserForm";
import UserSetFacePicture from "./UserSetFacePicture";
import UserViewFace from "./UserViewFace";

export default {
  data() {
    return {
      selectedUser: null,
      currentPage: 1,
      totalPage: 1,
    };
  },
  components: {
    SlidingPagination,
    UserForm,
    UserSetFacePicture,
    UserViewFace,
  },
  methods: {
    openUserForm() {
      document.getElementById("userModal").style.display = "block";
    },
    openSetFacePicture(user) {
      this.selectedUser = user;
      document.getElementById("setPictureModal").style.display = "block";
    },
    openViewFace(user) {
      this.selectedUser = user;
      document.getElementById("viewFaceModal").style.display = "block";
    },
    ...mapActions(["fetchAppUsers"]),
    pageChanged(page) {
      this.loadAppUserPagination(page);
    },
    dateStringToLocal,
    loadAppUserPagination(page) {
      this.fetchAppUsers(page).then(() => {
        this.currentPage = page;
        this.totalPage = this.paginationAppUser.last_page;
      });
    },
  },
  emitters: ["on-form-success-submit"],
  computed: mapGetters(["paginationAppUser", "appUserLoading"]),
  created() {
    this.loadAppUserPagination(this.currentPage);
  },
};
</script>

<style>
</style>