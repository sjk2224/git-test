<template>
  <q-layout view="lHh Lpr lFf">
    <div class="row flex flex-center my-login">
      <video
        class="video"
        poster="https://cdn.quasar.dev/img/polina.jpg"
        autoplay
        loop
        muted
      >
        <source
          type="video/webm"
          src="https://cdn.quasar.dev/img/polina.webm"
        />
        <source type="video/mp4" src="https://cdn.quasar.dev/img/polina.mp4" />
      </video>
      <div class="col-md-3 col-sm-12 my-card">
        <q-card
          class="text-center"
          flat
          square
          style="min-width: 400px; min-height: 650px"
        >
          <q-card-section class="flex justify-center">
            <q-card-section style="align-self: center">
              <q-card-section
                class="text-h4 q-mb-xl text-primary text-weight-bold q-mt-sm"
                >Signin</q-card-section
              >
              <SignInForm
                :cbCheckId="cbCheckId"
                :cbCheckEmail="cbCheckEmail"
                :isLoading="isLoading"
                @onSave="save"
              ></SignInForm>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import SignInForm from "../components/auth/SignInForm.vue";
import userApi from "../apis/userApi";

export default defineComponent({
  components: { SignInForm },
  name: "SignIn",
  data() {
    return {
      form: null,
      isLoading: false,
    };
  },
  methods: {
    async cbCheckId(id) {
      const field = "mb_id";
      const value = id;
      const result = await userApi.duplicateCheck(
        `/duplicateCheck/${field}/${value}`
      );
      return result;
    },
    async cbCheckEmail(email) {
      const field = "mb_email";
      const value = email;
      const result = await userApi.duplicateCheck(
        `/duplicateCheck/${field}/${value}`
      );
      return result;
    },
    async save(form) {
      const result = await userApi.create(form);
      if (result.status == 200) {
        this.$q.notify({
          type: "info",
          message: `${result.data.mb_id}님 환영합니다.`,
        });
        this.$router.push("/login");
      }
    },
  }
});
</script>

<style lang="scss">
.my-container {
  margin: 0 auto;
}
.my-login {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  margin: 0px auto;
  position: relative;
}
.my-card {
  margin: 0px auto;
  position: absolute;
}

video {
  height: 100%;
}
</style>