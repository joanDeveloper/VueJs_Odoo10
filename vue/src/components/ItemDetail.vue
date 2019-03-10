<template>
  <section>
    <div
      class="banner"
      style="background:linear-gradient(135deg, #b3dced 0%,#29b8e5 50%,#bce0ee 100%);"
    >
      <div class="container" align="center">
        <h1 class="logo-font">Detail Items</h1>
        <h4>Su seguridad a su alcanze</h4>
      </div>
    </div>
    <article>DETAIL</article>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { GET_LAWYERS } from "@/store/actions.type";

export default {
  name: "CompItemsList",
  mounted() {
    this.$store.dispatch(GET_LAWYERS, this.$route.params.categories);
  },
  computed: {
    ...mapGetters(["user"])
  }
};
</script>
<style>
</style>
