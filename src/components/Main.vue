<template>
  <div id="main">
    <div class="header-main jus-center flex-col">
      <div class="search-area jus-center al-center flex-col">
        <div class="search-area-title">
          کیلید، سامانه‌ی هوشمند مسکن
        </div>
        <div class="search-bar flex-col">
          <div class="flex-row">
            <div class="category selected jus-center al-center">
              <span>خرید</span>
            </div>
            <div class="category notselected jus-center al-center">
              <span>رهن و اجاره</span>
            </div>
            <div class="category notselected jus-center al-center">
              <span>قیمت خانه‌ی شما؟</span>
            </div>
          </div>
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
            <!-- <div class="cir1"></div> -->
            <!-- <div class="cir2"></div> -->
          </div>
        </div>
        <span class="down jus-center al-center">
          <img src="../assets/C6f.svg" alt="down"/>
        </span>
      </div>
    </div>

    <section class="eval-sec al-center jus-center flex-row">
      <div class="eval-txt flex-col jus-center">
        <span class="eval-title">بازار مسکن را ارزیابی کنید</span>
        <span class="eval-desc">
          در بازار مسکن، داشتن اطلاعات و داده‌های دقیق «طلایی‌ترین فرصت‌ها» را
          برای خریداران و سرمایه‌گذاران فراهم می‌کند. در کیلید این داده‌ها و
          اطلاعات پردازش شده و نتیجه‌ی پردازش در اختیار مشترکان کیلید قرار
          می‌گیرد. با تحلیل گذشته و رصد کردن امروز بازار مسکن، خانه‌ی آینده را
          بسازید.
        </span>
        <div class="eval-btn jus-center al-center flex-row">
          اطلاعات بازار مسکن
        </div>
      </div>
      <div class="eval-img al-center jus-center flex-row">
        <img src="src/assets/Capture.PNG" alt="houses" :style="'width: 65%;'"/>
      </div>
    </section>

    <section class="app-sec al-center jus-center flex-row">
      <div class="app-link flex-col al-center">
        <div class="eval-title" style="margin: 10px;">
          کلید خود را همیشه همراه داشته باشید
        </div>
        <div class="eval-desc" style="margin: 5px;">
          دریافت اپلیکیشن کیلید
        </div>
        <div class="app-grid-container al-center">
          <div class="app-grid-item">
            <img src="../assets/google-play-badge.png" alt="google play"/>
          </div>
          <div class="app-grid-item">
            <img src="../assets/bazaar-badge.png" alt="bazar"/>
          </div>
          <div class="app-grid-item">
            <img src="../assets/sibche-badge-fa-300x124.png" alt="sibche"/>
          </div>
          <div class="app-grid-item">
            <img src="../assets/SibApp-badge-fa.png" alt="sibapp"/>
          </div>
        </div>
      </div>
      <div class="flex-row al-center">
        <img
          class="app-img"
          src="../assets/app-info-android-device-img.png"
          alt="android"
        />
        <img class="app-img" src="../assets/app-info-iphone-img.png" alt="ios"/>
      </div>
      <div class="rotated"></div>
    </section>

    <section class="mag-sec flex-col al-center">
      <div class="eval-title">
        کیلید مگ را بخوانید
      </div>
      <div class="mag-desc">
        کارشناسان کیلید، در "کیلید مگ" شما را با مهم‌ترین مسائل بازار مسکن آشنا
        می‌کنند. کیلید مگ، با تکیه بر بررسی‌های علمی و آماری، اخبار و تحلیل‌های
        آینده بازار مسکن را در اختیارتان قرار می‌دهد.
      </div>
      <div class="mag-grid-container">
        <Mag
          v-for="(item, index) in items"
          :key="index"
          :mag-data="item"
        />
      </div>
      <div class="mag-btn flex-row al-center jus-center">
        مطالب بیشتر
      </div>
    </section>
  </div>
</template>

<script>
  import axios from "axios";
  import Mag from "./Mag";

  export default {
    name: "main",
    components: {
      Mag,
    },
    props: {},
    data() {
      return {
        items: null
      };
    },
    methods: {},
    computed: {},
    mounted() {
      axios
        .get("http://hallows.ir/mags")
        .then(response => (this.items = response.data.items));
    }
  };
</script>

<style></style>
