<template>
  <div id="userModal" class="fr-modal">
    <!-- Modal content -->
    <div class="fr-modal-content">
      <span @click="closeModal" class="fr-close">&times;</span>

      <h5>Add new user</h5>

      <div v-if="loading" class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>

      <form v-else @submit.prevent="submitForm" disabled>
        <div class="form-group">
          <label for="name">Name</label>
          <input
            v-model="form.name"
            type="text"
            class="form-control"
            placeholder="Enter full name"
          />
        </div>

        <div
          class="alert alert-danger"
          role="alert"
          v-if="form.errors.length > 0"
        >
          <ul>
            <li v-for="(errMessage, index) in form.errors" :key="index">
              {{ errMessage }}
            </li>
          </ul>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
        <button
          type="button"
          class="btn btn-secondary"
          @click.prevent="closeModal"
        >
          Close
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import agent from "../agent";

export default {
  data() {
    return {
      loading: false,
      form: {
        name: "",
        errors: [],
      },
    };
  },
  created() {},
  methods: {
    async submitForm(e) {
      this.form.errors = [];
      if (!this.form.name) {
        this.form.errors.push("Name is required");
      }

      if (this.form.errors.length > 0) return;

      this.loading = true;
      await agent.AppUser.create({
        name: this.form.name,
      });
      this.loading = false;

      this.$emit("on-form-success-submit");
      this.closeModal();
    },
    closeModal() {
      this.form.errors = [];
      this.form.name = "";

      document.getElementById("userModal").style.display = "none";
    },
  },
};
</script>

<style scoped>
</style>