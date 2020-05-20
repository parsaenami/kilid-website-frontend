<template>
  <div id="occasion">
    <section class="flex-col al-center occasion" :style="'margin-top: 90px'">
      <div class="flex-row al-center jus-start wrapped container-buy cards">
        <card v-for="(item, index) in [...items, ...others]" :key=index :rec-data="item"/>
        <!--        <item v-for="(other, index) in others" :key=index :rec-data="other"></item>-->
      </div>
    </section>
  </div>
</template>

<script>
  import card from "./Card"
  import axios from "axios";

  export default {
    name: "all-occasion",
    components: {
      card
    },
    props: {
      redirectUrl: String
    },
    data() {
      return {
        items: null,
        others: null,
        link: null
      }
    },
    methods: {},
    computed: {
      // finalArray() {
      //   let arr = this.items;
      //   let arr1 = this.others;
      //   let temp = null;
      //   for (let i = 0; i < arr.length; i++) {
      //     temp = null;
      //     for (let j = 0; j < arr1.length; j++) {
      //       temp = arr1[j];
      //       if (arr[i].id === arr1[j].id) {
      //         break;
      //       }
      //     }
      //     arr.push(temp)
      //   }
      // }
    },
    mounted() {
      if (this.redirectUrl) {
        this.link = this.redirectUrl
      }

      axios
        .get(this.link)
        .then(response => (this.others = response.data.items));

      axios
        .get("http://hallows.ir/occasion")
        .then(response => (this.items = response.data.items));
    }
  };
</script>

<style></style>
