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
          :to="{ name: 'listItems', params: { categories: categories.name } }"
        >{{categories.description}}</router-link>
      </div>
    </article>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { GET_CATEGORIES } from "@/store/actions.type";
import CompItemsList from "@/components/ItemList";
import CategoriesList from "@/components/CategoriesList";

export default {
  name: "home",
  mounted() {
    this.$store.dispatch(GET_CATEGORIES);
  },
  components: {
    CategoriesList
  },
  computed: {
    ...mapGetters(["categories"])
  }
};
</script>
<style>
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}
th,
td {
  padding: 5px;
}
th {
  text-align: left;
}
.container-list__lawyer {
  background-color: blue;
  width: 10%;
  padding: 1%;
  color: white;
}
</style>
