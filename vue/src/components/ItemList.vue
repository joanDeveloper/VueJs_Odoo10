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
    <article v-for="(user, index) in user" :key="index" class="container container-border">
      <router-link :to="{ name: 'detailItems', 
        params: { id: user.num_colegiado } }">
        <img
          class="responsive-img"
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
.responsive-img {
  width: 5%;
  height: 4vw;
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
</style>
