<template>
  <div>
    <div class="grid">
      <ChartLine :data="prices" :labels="tags"/>
    </div>
  </div>
</template>

<script>
  import ChartLine from "./chart-line";
  import axios from "axios";

  export default {
    name: "chart",
    components: {
      ChartLine
    },
    data() {
      return {
        data: null,
        prices: [],
        tags: []
      }
    },
    methods: {
      fetchData() {
        axios
          .get("http://hallows.ir/chart")
          .then(response => {
            this.data = response.data.data;
            // console.log(this.data);

            for (let i = 0; i < this.data.length; i++) {
              this.prices.push(this.data[i].price);
              this.tags.push(this.data[i].title);
            }
          });

      },
      dataGenerate() {
        console.log(this.data);
        for (let i = 0; i < this.data.length; i++) {
          this.prices.push(this.data[i].price);
          this.tags.push(this.data[i].title);
        }
      }
    },
    created() {
      this.fetchData();
      this.dataGenerate();
    },
    watch: {
      '$route': 'fetchData'
    }
  };
</script>

<style scoped>
  .grid {
    display: grid;
    row-gap: 2rem;
  }
</style>
