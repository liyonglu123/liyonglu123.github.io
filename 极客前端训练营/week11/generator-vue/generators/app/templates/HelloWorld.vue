<template>
  <div class="home">
    <p>{{ greeting }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      greeting: "hello vue",
    };
  },
};
</script>

<style scoped>
p {
  font-size: 20px;
  color: lightblue;
}
</style>
