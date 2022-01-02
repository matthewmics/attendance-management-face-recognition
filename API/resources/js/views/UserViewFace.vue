<template>
  <div id="viewFaceModal" class="fr-modal">
    <!-- Modal content -->
    <div class="fr-modal-content">
      <span @click="closeModal" class="fr-close">&times;</span>

      <h5>
        <b> {{ selectedUser ? selectedUser.name : "" }} </b>
      </h5>

      <br />

      <!-- preview -->
      <div>
        <img
          :src="faceUrl"
          style="
            width: 100%;
            height: auto;
            margin-bottom: 1em;
            padding: 0% 20%;
            box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
          "
        />
      </div>

      <br />

      <h6>Update picture</h6>
      <hr />

      <div v-if="loading" class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <form v-else @submit.prevent="submitForm">
        <div class="form-group">
          <label>Face Image</label>
          <input
            id="inputUpdateFaceImage"
            class="form-control-file"
            type="file"
            name="myImage"
            accept="image/*"
            @change="onImageChange"
          />
        </div>

        <img
          id="updateFacePreview"
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
import { apiUrl } from "../env";
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
      console.log("image changing");
      var output = document.getElementById("updateFacePreview");
      output.src = URL.createObjectURL(e.target.files[0]);
      console.log(output.src);
      //   output.onload = function () {
      //     URL.revokeObjectURL(output.src);
      //   };
    },
    closeModal() {
      document.getElementById("updateFacePreview").src = "";
      document.getElementById("inputUpdateFaceImage").value = "";
      document.getElementById("viewFaceModal").style.display = "none";
    },
    async submitForm(e) {
      const inputUpdateFaceImage = document.getElementById(
        "inputUpdateFaceImage"
      );

      if (inputUpdateFaceImage.files.length === 0) {
        alert("No file chosen");
        return;
      }

      this.loading = true;
      await agent.AppUser.uploadFaceImage(
        inputUpdateFaceImage.files[0],
        this.selectedUser.id
      );
      this.loading = false;
      setTimeout(() => {
        this.$emit("on-form-success-submit");
        this.closeModal();
      }, 250);
    },
  },
  computed: {
    faceUrl: function () {
      if (this.selectedUser) {
        return apiUrl + this.selectedUser.picture_path + "?" + Date.now();
      }

      return "";
    },
  },
};
</script>