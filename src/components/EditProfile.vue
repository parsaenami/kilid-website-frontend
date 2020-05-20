<template>
  <div id="edit-profile">
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
            placeholder="شماره‌ی همراه"
            v-model="phone"
            required
          />
        </label>
      </div>
      <div class="auth-input">
        <label>
          <input
            type="text"
            placeholder="ایمیل"
            v-model="email"
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
    <div class="submit-btn jus-center al-center flex-row" @click="sendData">ارسال</div>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "EditProfile",
    data() {
      return {
        firstname: null,
        lastname: null,
        email: null,
        phone: null,
        password: null,
        userId: null,
        admin: null
      }
    },
    methods: {
      authCheck() {
        let token = this.$cookies.get('token');
        if (token === null) {
          confirm('ابتدا باید وارد حساب کاربری خود شوید');
          this.$router.push('auth')
        } else {
          this.userId = this.$cookies.get('token').slice("-")[0];
          this.admin = this.$cookies.get('token').slice("-")[1];
        }
      },
      sendData() {
        axios({
          method: 'put',
          headers: {
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*"
          },
          url: 'http://localhost:5000/api/user/' + this.userId,
          data: {
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            phone: this.phone,
            password: this.password
          }
        })
          .then(response => {
            if (response.status === 200) {
              confirm('اطلاعات پروفایل با موفقیت تغییر یافت');
            }
          })
          .catch(error => {
            confirm(error.response.data.error)
          });
      },
    },
    created() {
      this.authCheck()
    }
  };
</script>

<style scoped>

</style>
