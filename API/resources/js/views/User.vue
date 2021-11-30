<template>
  <div class="container-fluid">
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Users</h1>
    </div>
    <button type="button" class="btn btn-primary" disabled>Add new user</button>
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
          <td>-</td>
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

export default {
  data() {
    return {
      currentPage: 1,
      totalPage: 0,
    };
  },
  components: {
    SlidingPagination,
  },
  methods: {
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
  computed: mapGetters(["paginationAppUser", "appUserLoading"]),
  created() {
    this.loadAppUserPagination(this.currentPage);
  },
};
</script>

<style>

</style>