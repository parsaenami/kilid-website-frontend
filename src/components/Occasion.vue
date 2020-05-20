<template>
  <div id="occasion">
    <div class="header-main buy jus-center flex-col">
      <div class="search-area jus-center al-center flex-col">
        <div class="search-area-title">
          خرید خانه و آپارتمان با کیلید
        </div>
        <div
          style="font-size: medium; margin-bottom: 40px; margin-top: -10px; font-weight: 300; color: #343433;"
        >
          کیلید، شما را در یافتن خانه یاری می‌کند
        </div>
        <div class="search-bar flex-col">
          <div class="search-input flex-row">
            <div class="search-text flex-row">
              <div class="search-left flex-row al-center">
                <img
                  src="../assets/download (1).png"
                  alt="target"
                  style="height: 24px; margin-right: 16px; cursor: pointer;"
                />
                <label>
                  <input class="city" type="text" placeholder="نام شهر"/>
                </label>
                <img
                  class=""
                  src="../assets/C6f.svg"
                  alt="more"
                  style="width: 12px; cursor: pointer;"
                />
              </div>
              <div class="flex-row al-center" style="flex: 1;">
                <input
                  class="place"
                  type="text"
                  placeholder="نام محله، منطقه و یا ایستگاه مترو"
                />
              </div>
            </div>
            <div class="search-bottun">
              <img
                class="search-icon"
                src="../assets/white-search-icon-19.jpg"
                alt="search"
              />
            </div>
          </div>
          <div class="advanced-search flex-row jus-center">
            <div class="box1 jus-center flex-row">
              <span>جستجو پیشرفته</span>
            </div>
            <div class="box2"></div>
            <div class="box3"></div>
            <!--             <div class="cir1"></div>-->
            <!--             <div class="cir2"></div>-->
          </div>
        </div>
      </div>
    </div>

    <section class="flex-col al-center occasion">
      <h2>اکازیون‌های امروز کیلید</h2>
      <div class="flex-row al-center jus-start wrapped container-buy cards">
        <card v-for="(item, index) in items" :key=index :rec-data="item"/>
      </div>
      <div v-if="action" class="flex-row al-center jus-center button">
        <router-link :to="{ name: 'all-occasion', params: { redirectUrl } }">
          {{ action.text }}
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
  import card from "./Card"
  import axios from "axios";

  export default {
    name: "occasion",
    components: {
      card,
    },
    data() {
      return {
        items: null,
        redirectUrl: null,
        action: null
      }
    },
    methods: {
      fetchData() {
        axios
          .get("http://hallows.ir/occasion")
          .then(response => {
            this.items = response.data.items;
            this.redirectUrl = response.data.action.url;
            this.action = response.data.action;
          });
      }
    },
    computed: {},
    mounted() {
    },
    created() {
      this.fetchData();
    }
  };
</script>

<style></style>
