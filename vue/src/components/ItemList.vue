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
    <div class="inputs-search">
      <input class="form-search" type="text" id="searchName" placeholder="filter by name" v-model="searchName">
      <input class="form-search" type="text" id="searchSurname" placeholder="filter by surname" v-model="searchSurname">
      <input class="form-search" type="text" id="searchEmail" placeholder="filter by email" v-model="searchEmail">
      <button class="btn btn-sm btn-primary button-search" v-on:click="filter">Filtrar</button>
    </div>
    
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
        {{ user.name }}
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
import { mapGetters } from "vuex";
import { GET_LAWYERS, GET_LAWYERS_FILTERED } from "@/store/actions.type";
import VPagination from "./VPagination";

export default {
  name: "CompItemsList",
  mounted() {
    // When the component is mounted, it will return the first 10 of the first page
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
    /**
     * we declare the category that belongs to the user, 
     * the limit of users per page and the current page
     * @method listConfig
     */
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
    /**
     * if the number of users is less than the number of elements per page previously
     * declared, we will not show the pages, otherwise we will return the pages
     * @method pages
     * @returns {array}
     */
    pages() {
      if (this.user.usersCount <= this.itemsPerPage) return [];
      // if the user array is empty, it returns a range error by console
      return [
        ...Array(Math.ceil( this.user.length === 0 ? 1 : this.user.usersCount / this.itemsPerPage)).keys()
      ].map(e => e + 1);
    },
    ...mapGetters(["user", "isLoading"])
  },
  watch: {
    /**
     * we'll get the page we're on and we'll call the fetchLawyers method to get the users
     * @method currentPage
     */
    currentPage(newValue) {
      this.listConfig.filters.offset = (newValue - 1) * this.itemsPerPage;
      this.fetchLawyers();
    }
  },
  methods: {
    /**
     * every time we filter, we will get the fields entered and 
     * send it to the server along with offset and limit so that we can return the paged users
     * @method filter
     */
    filter() {
      this.resetPagination();
      let dataFilters = {
        page: this.listConfig,
        email: this.searchEmail,
        name: this.searchName,
        surname: this.searchSurname
      };
      this.fetchFiltersItems(dataFilters);
    },
    /**
     * we get the paged users
     * @method fetchLawyers
     */
    fetchLawyers() {
      this.$store.dispatch(GET_LAWYERS, this.listConfig);
    },
    /**
     * we get the paged users for the filters
     * @method fetchFiltersItems
     */
    fetchFiltersItems(data) {
      this.$store.dispatch(GET_LAWYERS_FILTERED, data);
    },
    /**
     * we reset the page when we filter
     * @method resetPagination
     */
    resetPagination() {
      this.listConfig.offset = 0;
      this.currentPage = 1;
    }
  }
};
</script>
<style>
.inputs-search{
  text-align: center;
}
.form-search{
  width: 20%;
  padding: .5rem .75rem;
  font-size: 1rem;
  line-height: 1.25;
  color: #55595c;
  background-color: #fff;
  background-image: none;
  background-clip: padding-box;
  border: 1px solid rgba(0,0,0,.15);
  border-radius: .25rem;
}
.button-search{
  height: 37px !important;
}
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
