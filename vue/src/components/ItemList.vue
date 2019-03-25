<template>
  <section>
    <div
      class="banner"
      style="background:linear-gradient(135deg, #b3dced 0%,#29b8e5 50%,#bce0ee 100%);"
    >
      <div class="container" align="center">
        <h1 class="logo-font">List Items</h1>
        <h4>Su seguridad a su alcanze</h4>
      </div>
    </div>
    <input type="text" id="searchName" placeholder="filter by name" v-model="searchName">
    <input type="text" id="searchSurname" placeholder="filter by surname" v-model="searchSurname">
    <input type="text" id="searchEmail" placeholder="filter by email" v-model="searchEmail">
    <button v-on:click="filter"></button>
    <article v-for="(user, index) in user.users" :key="index" class="container container-border">
      <router-link :to="{ name: 'detailItems', 
        params: { id: user.num_colegiado } }">
        <img
          class="responsive-img__list"
          src="img/users/joanet1.jpg"
          alt="imagen usuario abogado"
          width="35"
          height="35"
        >
        <span class="data-items">
          <strong>Nº Colegiado:</strong>
        </span>
        {{ user.num_colegiado }}
        <span class="data-items">
          <strong>Nombre:</strong>
        </span>
        {{ user.nombre }}
        <span class="data-items">
          <strong>Apellidos:</strong>
        </span>
        {{ user.apellidos }}
        <span class="data-items">
          <strong>Email:</strong>
        </span>
        {{ user.email }}
        <span class="data-items">
          <strong>Ejerciente:</strong>
        </span>
        <span class="data-items" v-if="user.ejerciente==true">Sí</span>
        <span class="data-items" v-else>No</span>
      </router-link>
    </article>
    <VPagination :pages="pages" :currentPage.sync="currentPage" class="nav-pag"/>
  </section>
</template>

<script>
// console.log("PAGES",pages);
import { mapGetters } from "vuex";
import { GET_LAWYERS, GET_LAWYERS_FILTERED } from "@/store/actions.type";
import VPagination from "./VPagination";

export default {
  name: "CompItemsList",
  mounted() {
    let dataJson = {
      category: this.$route.params.categories,
      filters: { limit: 10, offset: 0 }
    };
    this.$store.dispatch(GET_LAWYERS, dataJson);
  },
  components: {
    VPagination
  },
  props: {
    type: {
      type: String,
      required: false,
      default: "all"
    },
    itemsPerPage: {
      type: Number,
      required: false,
      default: 10
    }
  },
  data() {
    return {
      searchName: "",
      currentPage: 1,
      searchEmail: "",
      searchSurname: ""
    };
  },
  computed: {
    listConfig() {
      const { type } = this;
      const category = {
        category: this.$route.params.categories
      };
      const filters = {
        offset: (this.currentPage - 1) * this.itemsPerPage,
        limit: this.itemsPerPage
      };
      return {
        type,
        filters,
        ...category
      };
    },
    pages() {
      console.log("PAGES_LIST", this.user.usersCount, this.itemsPerPage);
      if (this.user.usersCount <= this.itemsPerPage) return [];

      return [
        ...Array(Math.ceil(this.user.usersCount / this.itemsPerPage)).keys()
      ].map(e => e + 1);
    },
    ...mapGetters(["user", "articlesCount", "isLoading", "articles"])
  },
  watch: {
    currentPage(newValue) {
      console.log("currentPage",newValue);
      this.listConfig.filters.offset = (newValue - 1) * this.itemsPerPage;
      this.fetchArticles();
    }
  },
  methods: {
    filter() {
      console.log(
        "FILTER",
        this.searchEmail,
        this.searchName,
        this.searchSurname
      );
      let dataFilters = {
        page: this.listConfig,
        email: this.searchEmail,
        name: this.searchName,
        surname: this.searchSurname
      };
      this.fetchFiltersItems(dataFilters);
    },
    fetchArticles() {
      this.$store.dispatch(GET_LAWYERS, this.listConfig);
    },
    fetchFiltersItems(data) {
      this.$store.dispatch(GET_LAWYERS_FILTERED, data);
    },
    resetPagination() {
      this.listConfig.offset = 0;
      this.currentPage = 1;
    }
  }
};
</script>
<style>
.responsive-img__list {
  width: 5%;
  height: 3vw;
  border-radius: 45%;
}
.container-border {
  border: 1px solid grey;
  margin-top: 2%;
  padding: 2%;
  border-radius: 2% 2% 2% 2%;
}
li {
  list-style: none;
}
.data-items {
  margin-left: 2%;
}
.nav-pag {
  text-align: center;
}
</style>
