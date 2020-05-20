<template>
  <div id="map">
    <GmapMap
      :center="center"
      :map-type-id="'roadmap'"
      :zoom="15"
      :options="{
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: true
      }"
    >
      <GmapMarker
        v-for="(item, index) in markers"
        :key="index"
        :position="item.position"
        :icon="{ url: 'src/assets/marker.png'}"
        @click="center = item.position"
      />
    </GmapMap>
  </div>
</template>

<script>
  export default {
    name: "map",
    props: {
      lat: Number,
      long: Number
    },
    methods: {},
    data() {
      // console.log(this.props.lat, this.props.long);
      return {
        // center: {lat: 23.45454, lng: 37.474742},
        center: {lat: this.lat, lng: this.long},
        mapTypeId: "roadmap",
        markers: [
          {position: {lat: this.lat, lng: this.long}},
          // {position: {lat: 23.45454, lng: 37.474742}},
        ]
      };
    }
  };
</script>

<style scoped>
  .vue-map-container {
    height: 450px;
    max-width: 992px;
    width: 100%;
  }
</style>
