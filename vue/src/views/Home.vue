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
    <!-- <h2 align="center">Mis Categorías</h2> -->
    <article class="container-list__lawyer">
      <section v-for="(categories, index) in categories" :key="index" class="container-categories">
        
        <router-link
          v-if="categories.show == true && !isAuthenticated && (categories.id==1)"
          class="link-category"
          :to="{ name: categories.slug, 
          params: { categories: categories.name } }"
        >
        {{categories.description}}</router-link>

        <router-link
          v-if="categories.show == true && isAuthenticated && (currentUser.typeUser==4) && (categories.id==1)"
          class="link-category"
          :to="{ name: categories.slug, 
          params: { categories: categories.name } }"
        >{{categories.description}}</router-link>

        <router-link
          v-if="categories.show == true && isAuthenticated && (currentUser.typeUser==1)"
          class="link-category"
          :to="{ name: categories.slug, 
          params: { categories: categories.name } }"
        >{{categories.description}}</router-link>

        <router-link
          v-if="categories.show == true && isAuthenticated && (currentUser.typeUser==6) && (categories.id==6 || categories.id==1)"
          class="link-category"
          :to="{ name: categories.slug, 
          params: { categories: categories.name } }"
        >{{categories.description}}</router-link>

      </section>
    </article>
    <article class="banner-asociacion">
      Eres una associación y necesitas un abogado? Regístrase en nuestra plataforma.
    </article>
    
    <div class="title-users"><h3>Número de Usuarios registrados</h3></div>
    <article class="container-num_users">
      <div>
        <span class="container-numUsers_item1">Abogados </span><br>
        <span>{{countUsers.countLawyer}} </span>
      </div>
      <div>
        <span>Clientes </span><br>
        <span>{{countUsers.countClient}} </span>
      </div>
      <div>
        <span>Asociaciones </span><br>
        <span>{{countUsers.countAsociation}} </span>
      </div>
    </article>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { GET_CATEGORIES, GET_GUARDIAS,GET_ALL_USERS } from "@/store/actions.type";
import CompItemsList from "@/components/ItemList";

export default {
  name: "home",
  mounted() {
    this.$store.dispatch(GET_CATEGORIES).then(res=>{
      this.$store.dispatch(GET_ALL_USERS);
    });
  },
  computed: {
    ...mapGetters(["categories","isAuthenticated", "currentUser","countUsers"])
  }
};
</script>
<style>
  .title-users{
    margin-top: 2%;
    text-align: center;
  }
  .container-num_users{
    margin-top: 2%;
    text-align: center;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    justify-content: space-evenly;
  }
  .link-category {
    color: white;
  }
  .container-list__lawyer {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
  }
  .container-categories a{
    margin-left: 10px;
    background: #3177f0;
    padding: 20px;
    border-radius: 5%;
  }
  .container-categories a:hover{
    outline: none !important;
    border: none;
    text-decoration: none;
    color: black;
  }
  .banner-asociacion{
    text-align: center;
    background: grey;
    margin-top: 5%;
    padding: 2%;
    color: white;
  }
</style>
