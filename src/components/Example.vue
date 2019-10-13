<template>
  <section id="main">
    <div class="container">
      <h1 class="h1">Webpack message: {{ message }}</h1>
    </div>
  </section>
</template>

<<script>
export default {
        data() {
            return {
                message: null
            }
        },
        created() {
            this.message = this.$store.getters.getMessage
        },
}
</script>

<style lang="scss">
h1 {
  color: green;
  transform-origin: 0 0;
  transform: rotate(40deg);
}
</style>