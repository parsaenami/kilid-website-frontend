<template>
  <div class="card">
    <div class="card-img-bottom">
      <chartjs-line
        :backgroundcolor="bgColor"
        :beginzero="beginZero"
        :bind="true"
        :bordercolor="borderColor"
        :data="data"
        :datalabel="dataLabel"
        :labels="labels"
      />
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      data: Array,
      labels: Array
    },
    data() {
      return {
        bgColor: "#81894e",
        beginZero: true,
        borderColor: "#9c0b4e",
        // data: [10, 3, 5, 4, 6],
        dataLabel: "قیمت",
        borderWidth: 10
        // labels: ["Sun", "Mon", "Tue", "Wed", "Thu"],
      };
    }
  };
</script>
