<template>
  <md-app>
    <md-app-toolbar class="md-primary back-p">
      <span class="md-title">داشبورد</span>
      <span class="md-dialog-title">{{userFirstName}} {{userLastName}}</span>
      <span class="md-dialog-title">کاربر {{admin === 'False' ? 'عادی' : 'ادمین'}}</span>
    </md-app-toolbar>

    <md-app-drawer md-permanent="card" class="back-w">
      <md-list>

        <md-list-item :class="row1" @click="row1handler">
          <md-icon :class="row1">account_circle</md-icon>
          <span :class="'md-list-item-text ' + row1">ویرایش پروفایل</span>
        </md-list-item>

        <md-list-item :class="row2" @click="row2handler">
          <md-icon :class="row2">house</md-icon>
          <span :class="'md-list-item-text ' + row2">خانه‌ها</span>
        </md-list-item>

        <md-list-item :class="row3" @click="row3handler">
          <md-icon :class="row3">bookmark</md-icon>
          <span :class="'md-list-item-text ' + row3">نشان‌شده‌ها</span>
        </md-list-item>

        <md-list-item v-if="admin !== 'False'" :class="row4" @click="row4handler">
          <md-icon :class="row4">supervised_user_circle</md-icon>
          <span :class="'md-list-item-text ' + row4">کاربران</span>
        </md-list-item>

        <md-list-item :class="row5" @click="row5handler">
          <md-icon :class="row5">exit_to_app</md-icon>
          <span :class="'md-list-item-text ' + row5">خروج</span>
        </md-list-item>

      </md-list>
    </md-app-drawer>

    <md-app-content>
      <edit-profile v-if="row1 === 'back-p'"/>
      <section v-if="row2 === 'back-p' || row3 === 'back-p'" class="flex-col al-center occasion">
        <div class="flex-row al-center jus-start wrapped container-buy cards">
          <card v-if="row2 === 'back-p' && admin === 'False'" v-for="(properties, index) in properties" :key=index :rec-data="properties"
                :lastname="userLastName" :book="0"/>
          <card v-if="row2 === 'back-p' && admin !== 'False'" v-for="(allProperties, index) in allProperties" :key=index :rec-data="allProperties"
                :lastname="userLastName" :book="0"/>
          <card v-if="row3 === 'back-p'" v-for="(bookmarked, index) in bookmarked" :key=index :rec-data="bookmarked"
                :lastname="userLastName" :book="1"/>
        </div>
      </section>
      <md-card v-if="row4 === 'back-p'" v-for="(user, index) in users" :key="index" md-with-hover>
        <md-ripple>
          <md-card-header>
            <div class="md-title">{{user.firstname}} {{user.lastname}}</div>
            <div class="md-subhead">کاربر {{user.is_admin ? 'ادمین' : 'عادی'}}</div>
          </md-card-header>

          <md-card-content>
            {{user.phone !== null ? 'تلفن همراه: ' + user.phone : ''}}
            <br />
            {{user.email !== null ? 'ایمیل: ' + user.email : ''}}
            <br />
            {{renderTime(parseInt(user.created_at))}} به کیلید پیوسته است
          </md-card-content>

          <md-card-actions>
            <md-button class="md-raised md-accent back-p marg-10" @click="deleteUser(user.id)">حذف</md-button>
            <md-button v-if="user.is_admin === true" class="md-raised md-primary back-g marg-10">ارتقاء به ادمین</md-button>
            <md-button v-else class="md-raised md-primary back-b marg-10" @click="promote(user.id)">ارتقاء به ادمین</md-button>
          </md-card-actions>
        </md-ripple>
      </md-card>
    </md-app-content>
  </md-app>
</template>

<script>
  import axios from "axios";
  import EditProfile from "./EditProfile";
  import Card from "./Card";

  export default {
    name: "dashboard",
    components: {Card, EditProfile},
    data() {
      return {
        row1: 'back-p',
        row2: 'back-w',
        row3: 'back-w',
        row4: 'back-w',
        row5: 'back-w',
        userId: null,
        admin: null,
        properties: null,
        allProperties: null,
        bookmarked: null,
        users: null,
        userFirstName: null,
        userLastName: null,
        bookmark: null
      }
    },
    methods: {
      row1handler() {
        this.row1 = 'back-p';
        this.row2 = 'back-w';
        this.row3 = 'back-w';
        this.row4 = 'back-w';
        this.row5 = 'back-w';
      },
      row2handler() {
        this.row1 = 'back-w';
        this.row2 = 'back-p';
        this.row3 = 'back-w';
        this.row4 = 'back-w';
        this.row5 = 'back-w';
        if (this.admin === 'False') {
          this.getProperties(0)
        } else {
          this.getAllProperties()
        }
      },
      row3handler() {
        this.row1 = 'back-w';
        this.row2 = 'back-w';
        this.row3 = 'back-p';
        this.row4 = 'back-w';
        this.row5 = 'back-w';
        this.getProperties(1)
      },
      row4handler() {
        this.row1 = 'back-w';
        this.row2 = 'back-w';
        this.row3 = 'back-w';
        this.row4 = 'back-p';
        this.row5 = 'back-w';
      },
      row5handler() {
        this.row1 = 'back-w';
        this.row2 = 'back-w';
        this.row3 = 'back-w';
        this.row4 = 'back-w';
        this.row5 = 'back-p';
        this.logout(parseInt(this.userId))
      },
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
      getProperties(bookmark) {
        axios({
          method: 'get',
          url: 'http://localhost:5000/api/user/property/' + this.userId + '?bookmark=' + bookmark.toString(),
        })
          .then(response => {
            if (response.status === 200) {
              console.log(response.data);
              if (bookmark === 0) {
                this.properties = response.data.all;
              } else {
                this.bookmarked = response.data.all;
              }
            }
          })
          .catch(error => {
            confirm(error.response.data.error)
          });
      },
      getUsers() {
        if (this.admin === 'False') {
          confirm('تنها ادمین اجازه‌ی دسترسی دارد')
          return
        }
        axios({
          method: 'get',
          url: 'http://localhost:5000/api/user/all',
        })
          .then(response => {
            if (response.status === 200) {
              console.log(response.data);
              this.users = response.data.all
            }
          })
          .catch(error => {
            confirm(error.response.data.error)
          });
      },
      deleteUser(uid) {
        if (this.admin === 'False') {
          confirm('تنها ادمین اجازه‌ی دسترسی دارد')
          return
        }
        axios({
          method: 'delete',
          url: 'http://localhost:5000/api/user/' + uid.toString(),
        })
          .then(response => {
            if (response.status === 200) {
              console.log(response.data);
              confirm(response.data.msg);
              window.location.reload()
            }
          })
          .catch(error => {
            confirm(error.response.data.error)
          });
      },
      logout(uid) {
        axios({
          method: 'post',
          url: 'http://localhost:5000/api/logout',
          data: {
            user_id: parseInt(uid)
          }
        })
          .then(response => {
            if (response.status === 200) {
              console.log(response.data);
              // confirm(response.data.msg);
              this.$cookies.remove('token');
              window.location = '#/'
            }
          })
          .catch(error => {
            confirm(error.response.data.error)
          });
      },
      promote(uid) {
        if (this.admin === 'False') {
          confirm('تنها ادمین اجازه‌ی دسترسی دارد')
          return
        }
        axios({
          method: 'put',
          url: 'http://localhost:5000/api/promote',
          data: {
            user_id: uid
          }
        })
          .then(response => {
            if (response.status === 200) {
              console.log(response.data);
              confirm(response.data.msg);
              window.location.reload()
            }
          })
          .catch(error => {
            confirm(error.response.data.error)
          });
      },
      getAllProperties() {
        if (this.admin === 'False') {
          confirm('تنها ادمین اجازه‌ی دسترسی دارد')
          return
        }
        axios({
          method: 'get',
          url: 'http://localhost:5000/api/property',
        })
          .then(response => {
            if (response.status === 200) {
              console.log(response.data);
              this.allProperties = response.data.all
            }
          })
          .catch(error => {
            confirm(error.response.data.error)
            window.location.reload()
          });
      },
      getUser() {
        axios({
          method: 'get',
          url: 'http://localhost:5000/api/user/' + this.userId,
        })
          .then(response => {
            if (response.status === 200) {
              console.log(response.data);
              this.userFirstName = response.data.firstname;
              this.userLastName = response.data.lastname;
            }
          })
          .catch(error => {
            confirm(error.response.data.error)
          });
      },
      renderTime(ms) {
        let time = Math.round((Date.now() - ms) / (1000 * 60));  // min
        let tag = null;

        if (time < 60) {
          tag = " دقیقه"
        } else {
          time = Math.round(time / 60);  // hour
          if (time < 24) {
            tag = " ساعت"
          } else {
            time = Math.round(time / 24);  // day
            if (time < 30) {
              tag = " روز"
            } else {
              time = Math.round(time / 30);  // month
              if (time < 12) {
                tag = " ماه"
              } else {
                time = Math.round(time / 12);  // year
                tag = " سال"
              }
            }
          }
        }
        return time + tag + " پیش"
      }
    },
    created() {
      this.authCheck();
      this.getUser();
      // this.getAllProperties();
      this.getUsers();
    }
  }
</script>

<style scoped>
  .md-app {
    min-height: 350px;
    /*border: 1px solid red;*/
  }

  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }

  .md-list-item-content > .md-icon:first-child {
    margin-left: 32px;
    margin-right: 0px;
  }
</style>
