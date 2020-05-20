<template>
  <div class="flex-col al-center listing-card">
    <router-link
      class="flex-col kilid-card"
      id="listing-card"
      :to="'/house/' + recData.id"
    >
      <div class="image-holder"
           :style="'background-image:url(' + (recData.pics[0].path).toString().replace(/\\/g, '\\\\').replace('E:\\\\Development\\\\WP\\\\9531908_HW3\\\\', '') + ')'"
      >
        <div class="save-icon">
          <div v-if="(recData.bookers).includes(parseInt(userId))" class="part-container">
            <div class="part1 booked"></div>
            <div class="part2 booked"></div>
            <div class="part3 booked"></div>
          </div>
          <div v-else class="part-container">
            <div class="part1"></div>
            <div class="part2"></div>
            <div class="part3"></div>
          </div>
        </div>
        <div v-if="recData.star" class="promoted">
          <img src="../assets/star.svg" alt="star"/>
          <div class="promoted-shadow"></div>
          <div class="promoted-background"
          ></div>
        </div>
        <div class="flex-row al-end jus-between images-detail">
          <div class="flex-col address-and-title">
            <span class="address">{{recData.locality}}</span><strong
            class="card-title">{{recData.title}}</strong>
          </div>
          <div class="flex-row al-center number-of-images">
            <span>{{recData.images_count}}</span>
            <img src="../assets/camera.svg" alt="camera">
          </div>
        </div>
      </div>
      <div class="flex-col card-detail-holder">
        <div class="flex-row al-center property-info">
          <div class="flex-row jus-center single-info date-info">
            {{renderTime(parseInt(recData.created_at))}}
          </div>
          <div class="flex-row jus-center single-info">
            {{recData.bedroom}} خوابه
          </div>
          <div class="flex-row jus-center single-info">
            <span>{{recData.area}}</span> متر
          </div>
          <div class="flex-row jus-center single-info">
            {{recData.type}}
          </div>
        </div>
        <div class="flex-row price-holder jus-between">
          <div class="flex-col sale-prices">
            <div
              class="flex-row single-price price"
            >
              <div class="flex-row al-center title">
                قیمت:
              </div>
              <span>{{renderPrice(recData.price)}} تومان</span>
            </div>
            <div class="flex-row single-price unit-price">
              <div class="flex-row al-center title">
                مترمربع:
              </div>
              <span>{{renderPrice((recData.price / recData.area))}} تومان</span>
            </div>
          </div>
          <div class="flex-col al-center jus-around agency-holder">
            <img
              src="src/assets/real-madrid.jpg"
              alt="logo"
            /><span>{{lastname}}</span>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "card",
    props: {
      recData: {
        id: String,
        title: String,
        price: Number,
        type: String,
        area: Number,
        bedroom: Number,
        locality: String,
        images_count: Number,
        star: Boolean,
        // bookmark: Boolean,
        created_at: String,
        pics: Array,
        bookers: [],
        comments: [],
        breadcrumb: [],
      },
      lastname: String,
      book: Number
    },
    data() {
      return {
        bookmark: null,
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
      // isBookmarked(p_id) {
      //   if (this.$props.book === 1) {
      //     this.bookmark = 1;
      //   } else {
      //     axios({
      //       method: 'get',
      //       url: 'http://localhost:5000/api/property/bookmark/' + this.userId + '/' + p_id.toString(),
      //     })
      //       .then(response => {
      //         if (response.status === 200) {
      //           console.log(response.data);
      //           this.bookmark = response.data.bookmarked;
      //         }
      //       })
      //       .catch(error => {
      //         confirm(error.response.data.error)
      //       })
      //   }
      // },
      renderPrice(num) {
        // let num = parseFloat(numb.toFixed(2));
        let price = num.toLocaleString().split(',');
        let tag = "";
        let digits = 0;
        switch (price.length) {
          case 4:
            tag = " میلیارد";
            digits = num / 10 ** 9;
            break;

          case 3:
            tag = " میلیون";
            digits = num / 10 ** 6;
            break;

          case 2:
            tag = " هزار";
            digits = num / 10 ** 3;
            break;
        }
        digits = parseFloat(digits.toFixed(2));
        return digits.toString() + tag;
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
      console.warn(typeof (this.$data.userId))
      // console.warn((this.$props.recData.bookers).includes(8))
      console.warn((this.$props.recData.bookers).includes((this.$data.userId)))
      // this.isBookmarked(this.$props.recData.id);
    }
  };
</script>

<style></style>
