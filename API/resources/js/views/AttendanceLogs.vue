<template>
  <div class="container-fluid">
    <!-- Page Heading -->
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Attendance Logs</h1>
    </div>

    <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Temperature</th>
          <th scope="col">Time In</th>
        </tr>
      </thead>
      <tbody v-if="paginationAttendanceLogs">
        <tr
          v-for="attendanceLog in paginationAttendanceLogs.data"
          :key="attendanceLog.id"
        >
          <td>{{ attendanceLog.app_user.name }}</td>
          <td>{{ attendanceLog.temperature }}</td>
          <td>{{ dateStringToLocal(attendanceLog.created_at) }}</td>
        </tr>
      </tbody>
      <tbody
        v-if="
          paginationAttendanceLogs &&
          paginationAttendanceLogs.data &&
          paginationAttendanceLogs.data.length === 0
        "
      >
        <tr colspan="100%">
          <div style="padding: 2em">No records.</div>
        </tr>
      </tbody>
      <tfoot>
        <th colspan="3">
          <sliding-pagination
            style="float: right"
            :current="currentPage"
            :total="totalPage"
            @page-change="pageChanged"
          ></sliding-pagination>
        </th>
      </tfoot>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SlidingPagination from "vue-sliding-pagination";
import { dateStringToLocal } from "../helpers";
export default {
  data() {
    return {
      currentPage: 1,
      totalPage: 1,
    };
  },
  components: { SlidingPagination },
  methods: {
    ...mapActions(["fetchAttendanceLogs"]),
    dateStringToLocal,
    loadAttendanceLogsPagination(page) {
      this.fetchAttendanceLogs(page).then(() => {
        this.currentPage = page;
        this.totalPage = this.paginationAttendanceLogs.last_page;
      });
    },
    pageChanged(page) {
      this.loadAttendanceLogsPagination(page);
    },
  },
  computed: mapGetters(["paginationAttendanceLogs"]),
  created() {
    this.loadAttendanceLogsPagination(this.currentPage);
  },
};
</script>

<style scoped>
</style>