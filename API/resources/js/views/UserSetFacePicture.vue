<template>
  <div id="setPictureModal" class="fr-modal">
    <!-- Modal content -->
    <div class="fr-modal-content">
      <span @click="closeModal" class="fr-close">&times;</span>

      <h5>
        Set picture |<b> {{ selectedUser ? selectedUser.name : "" }} </b>
      </h5>

      <br />

      <div v-if="loading" class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>

      <form v-else @submit.prevent="submitForm">
        <div class="form-group">
          <label>Face Image</label>
          <input
            id="inputFaceImage"
            class="form-control-file"
            type="file"
            name="myImage"
            accept="image/*"
            @change="onImageChange"
          />
        </div>

        <img
          id="facePreview"
          style="
            width: 100%;
            height: auto;
            margin-bottom: 1em;
            padding: 0% 20%;
            box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
          "
        />

        <br />

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
  props: {
    selectedUser: {
      type: Object,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    onImageChange(e) {
      var output = document.getElementById("facePreview");
      output.src = URL.createObjectURL(e.target.files[0]);
      output.onload = function () {
        URL.revokeObjectURL(output.src);
      };
    },
    closeModal() {
      document.getElementById("facePreview").src = "";
      document.getElementById("inputFaceImage").value = "";
      document.getElementById("setPictureModal").style.display = "none";
    },
    async submitForm(e) {
      const inputFaceImage = document.getElementById("inputFaceImage");

      if (inputFaceImage.files.length === 0) {
        alert("No file chosen");
        return;
      }

      this.loading = true;
      await agent.AppUser.uploadFaceImage(
        inputFaceImage.files[0],
        this.selectedUser.id
      );
      this.loading = false;
      setTimeout(() => {
        this.$emit("on-form-success-submit");
        this.closeModal();
      }, 250);
    },
  },
};
</script>