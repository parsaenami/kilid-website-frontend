<template>
  <div id="auth">
    <section>
      <div class="auth-header-main flex-row jus-center al-center">
        <div class="auth-box flex-row">
          <router-link class="auth-exit al-center" to="/">
            <div class="exit-icon"></div>
            <div class="exit-icon"></div>
          </router-link>
          <div class="auth-box-right"></div>
          <div class="auth-box-left jus-center">
            <div class="auth-wrapper flex-col jus-center">
              <div class=" auth-options flex-row">
                <div :class="isSignIn ? 'auth-option active' : 'auth-option'" @click="isSignIn=true">ورود</div>
                <div :class="isSignIn ? 'auth-option' : 'auth-option active'" @click="isSignIn=false">ثبت‌نام</div>
              </div>
              <sign-in v-if="isSignIn === true"/>
              <sign-up v-else-if="isSignIn === false"/>
            </div>
          </div>
          <img class="auth-pic" src="src/assets/Capture3.PNG" alt="properties"/>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import SignUp from "./SignUp";
  import SignIn from "./SignIn";

  export default {
    name: "auth",
    components: {
      SignIn,
      SignUp
    },
    data() {
      return {
        isSignIn: true,
      }
    }
  };
</script>

<style></style>
