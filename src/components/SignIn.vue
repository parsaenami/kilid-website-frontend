<template>
  <div id="sign-in">
    <div class="flex-col">
      <div class="auth-input">
        <label>
          <input
            type="text"
            placeholder="شماره‌ی همراه یا ایمیل"
            v-model="username"
            required
          />
        </label>
      </div>
      <div class="auth-input">
        <label>
          <input
            type="password"
            placeholder="رمز عبور"
            v-model="password"
            required
          />
        </label>
      </div>
    </div>
    <div class="auth-forget flex-row jus-center">
      <span>رمز خود را <a href="">فراموش کرده ‌اید؟</a></span>
    </div>
    <div class="submit-btn jus-center al-center flex-row" @click="sendData">ارسال</div>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "sign-in",
    data() {
      return {
        username: null,
        password: null
      }
    },
    methods: {
      sendData() {
        axios({
          method: 'post',
          headers: {
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*"
          },
          url: 'http://localhost:5000/api/login',
          data: {
            email_phone: this.username,
            password: this.password
          }
        })
          .then(response => {
            confirm(response.data.msg);
            if (response.status === 200) {
              console.log(response.data);
              this.$cookies.set("token", response.data.token, "30d");
              this.$router.push('dashboard')
            }
          })
          .catch(error => {
            confirm(error.response.data.error)
          });
      },
    },
  };
</script>

<style></style>
