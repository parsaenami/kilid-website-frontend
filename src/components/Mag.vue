<template>
  <div id="mag">
    <div class="mag-grid-item flex-col">
      <img :src="magData.image" alt="mag1"/>
      <span class="mag-caption">
        {{ magData.title }}
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "mag",
    props: {
      magData: {
        id: String,
        image: String,
        title: String
      }
    }
  };
</script>

<style></style>
