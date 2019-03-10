<template>
  <section class="container-home">
    <div
      class="banner"
      style="background:linear-gradient(135deg, #b3dced 0%,#29b8e5 50%,#bce0ee 100%);"
    >
      <div class="container" align="center">
        <h1 class="logo-font">Colegio Abogados Liberty</h1>
        <h4>Su seguridad a su alcanze</h4>
      </div>
    </div>
    <article class="container-list__lawyer container">
      <div v-for="(categories, index) in categories" :key="index">
        <router-link
          class="link-category"
          :to="{ name: 'listItems', 
          params: { categories: categories.name } }"
        >{{categories.description}}</router-link>
      </div>
    </article>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { GET_CATEGORIES } from "@/store/actions.type";
import CompItemsList from "@/components/ItemList";

export default {
  name: "home",
  mounted() {
    this.$store.dispatch(GET_CATEGORIES);
  },
  computed: {
    ...mapGetters(["categories"])
  }
};
</script>
<style>
.link-category {
  color: white;
}
.container-list__lawyer {
  background-color: grey;
  width: 10%;
  padding: 1%;
  border-radius: 5%;
  text-align: center;
}
</style>
