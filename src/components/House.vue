<template>
  <div id="house" class="">
    <article class="flex-row container-house single-listing-page">
      <div class="side-bar-holder">
        <div class="property-details">
          <div class="flex-row al-center jus-between date-and-code">
            <div class="code">کد ملک: {{info.id}}</div>
            <div class="date">{{renderTime(info.created_at * 1000)}}</div>
          </div>
          <h1 class="page-title">
            {{info.title}}
          </h1>
          <div class="prices">
            <div class="sale-type">
              <div class="single-price price">
                <span class="title">قیمت:</span>
                <span>
                  {{renderPrice(info.price)}}
                  تومان
                </span>
              </div>
              <div class="single-price unit-price">
                <span class="title">قیمت هر مترمربع:</span>
                <span>
                  {{renderPrice(info.price / info.area)}}
                  میلیون تومان
                </span>
              </div>
            </div>
          </div>
          <hr class="divider"/>
          <div class="details">
            <div class="flex-row al-center detail">
              <span class="flex-row icon">
                <img src="src/assets/type.jpg" alt="type"/>
              </span>
              <span>{{info.type}}</span>
            </div>
            <div class="flex-row al-center detail">
              <span class="flex-row icon">
                <img src="src/assets/room.jpg" alt="room"/>
              </span>
              <span>{{info.bedrooms}} خوابه</span>
            </div>
            <div class="flex-row al-center detail">
              <span class="flex-row icon">
                <img src="src/assets/area.jpg" alt="area"/>
              </span>
              <span>{{info.area}} متر</span>
            </div>
            <div v-if="info.parkings !== 0" class="flex-row al-center detail">
              <span class="flex-row icon">
                <img src="src/assets/park.jpg" alt="park"/>
              </span>
              <span>پارکینگ {{info.parkings}} عدد</span>
            </div>
          </div>
        </div>

        <div class="flex-col single-agency-holder">
          <div class="flex-col al-center single-agency-header">
            <div class="agency-logo" :style="'background-image:url(' + info.estate.logo + ')'"></div>
            <span class="agency-name">{{info.estate.name}}</span>
          </div>
          <p class="agency-description"></p>
          <span class="agency-manager"></span>
          <a
            class="flex-row al-center jus-center agency-info-button"
            @click="show = true"
          >{{hideNumber()}}</a>
        </div>
      </div>
      <div class="main-content">
        <div class="flex-row align-center breadcrumb-holder">
          <div v-for="part in info.breadcrumb">
            <a class="breadcrumb-part">{{part.name}}</a>
            <i class="fa fa-angle-left" aria-hidden="true"/>
          </div>
        </div>
        <div class="flex-col image-gallery">
          <div class="desktop-image-preview">
            <div class="flex-row current-image">
              <button
                class="flex-row align-center justify-center arrows right"
                @click="navigation('next')"
              >
                <i class="fa fa-angle-right"
                   style="font-size: 55px; color: rgba(236, 230, 227, 0.8);"
                   aria-hidden="true"
                />
              </button>
              <div
                class="flex-row align-center justify-center index-of-image"
                dir="ltr"
              >{{index + 1}}/{{info.pic.number}}
              </div>
              <img class="image" :src="info.pic.images[index]"/>
              <button
                class="flex-row align-center justify-center arrows left"
                @click="navigation('previous')"
              >
                <i class="fa fa-angle-left"
                   style="font-size: 55px; color: rgba(236, 230, 227, 0.8);"
                   aria-hidden="true"
                />
              </button>
            </div>
            <div class="flex-row rest-of-images-row">
              <div v-for="img in row" class="single-rest" :style="'background-image: url(' + img + ')'"></div>
              <div v-if="this.other" class="more-pics flex-col al-center jus-center">
                <div class="circle"></div>
                <div class="circle"></div>
                <div class="circle"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-col map-container">
          <div class="map-title">نقشه</div>
          <div class="map-holder">
            <g-map class="map2" :lat="info.location.lat" :long="info.location.long"/>
          </div>
        </div>
        <div class="flex-col chart-container">
          <div class="map-title">اطلاعات بازار مسکن</div>
          <chart/>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
  import axios from "axios";
  import GMap from "./Map";
  import Chart from "./Chart";

  export default {
    name: "house",
    components: {
      Chart,
      GMap
    },
    data() {
      return {
        info: null,
        show: false,
        index: 0,
        row: [],
        other: null
      }
    },
    methods: {
      fetchData() {
        axios
          .get("http://hallows.ir/house/" + this.$route.params.id)
          .then(response => {
            this.info = response.data;
            this.row = response.data.pic.images.slice(0, 4);
            this.other = response.data.pic.number > 4;
          });
      },
      hideNumber() {
        if (!this.show) {
          return this.info.estate.phone.slice(0, 4) + "xxxx" + this.info.estate.phone.slice(8, 11);
        } else {
          return this.info.estate.phone;
        }
      },
      navigation(direction) {
        switch (direction) {
          case 'previous':
            if (this.index === 0) {
              this.index = this.info.pic.number - 1;
            } else {
              this.index -= 1;
            }
            break;
          case 'next':
            this.index += 1;
            this.index %= this.info.pic.number;
            break;
        }
        this.picRow(this.index);
      },
      picRow(index) {
        let images = this.info.pic.images;
        let number = this.info.pic.number;
        if (number <= 4) {
          this.other = false;
          this.row = images.slice(0, 4);
        } else {
          this.other = true;
          this.row.length = 0;
          for (let i = index; i < index + 4; i++) {
            this.row.push(images[i % number]);
          }
        }
      },
      renderPrice(num) {
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
      this.fetchData();
      this.picRow();
    },
    watch: {
      '$route': 'fetchData'
    }
  };
</script>

<style></style>
