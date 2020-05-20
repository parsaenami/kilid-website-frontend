<template>
  <div id="sign-up">
    <div class="flex-col">
      <div class="auth-input">
        <label>
          <input type="text" placeholder="نام" v-model="firstname" required/>
        </label>
      </div>
      <div class="auth-input">
        <label>
          <input type="text" placeholder="نام خانوادگی" v-model="lastname" required/>
        </label>
      </div>
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
          <input type="password" placeholder="رمز عبور" v-model="password" required/>
        </label>
      </div>
    </div>
    <div class="signup-setting flex-row">
      <div class="newsteller flex-row al-center">
        <label class="container flex-row al-center">
          <input class="trad-check" type="checkbox"/>
          <div class="custom-check flex-row al-center jus-center"></div>
          <div class="tick"></div>
          دریافت خبرنامه
        </label>
      </div>
      <div class="flex-row al-center">
        ثبت‌نام به معنی قبول
        <span class="rules"> قوانین و مقررات‌</span>
        است
      </div>
    </div>
    <div class="submit-btn jus-center al-center flex-row" @click="sendData">ارسال</div>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "sign-up",
    data() {
      return {
        firstname: null,
        lastname: null,
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
          url: 'http://localhost:5000/api/register',
          data: {
            firstname: this.firstname,
            lastname: this.lastname,
            mail_phone: this.username,
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
