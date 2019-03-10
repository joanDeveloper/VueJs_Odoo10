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
    <article>
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
        {{ userDetail[0].num_colegiado }}
        <span class="data-items">
          <strong>Nombre:</strong>
        </span>
        {{ userDetail[0].nombre }}
        <span class="data-items">
          <strong>Apellidos:</strong>
        </span>
        {{ userDetail[0].apellidos }}
        <span class="data-items">
          <strong>Email:</strong>
        </span>
        {{ userDetail[0].email }}
        <span class="data-items">
          <strong>Ejerciente:</strong>
        </span>
        <span class="data-items" v-if="userDetail[0].ejerciente==true">Sí</span>
        <span class="data-items" v-else>No</span>
    </article>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { GET_DETAILS } from "@/store/actions.type";

export default {
  name: "CompItemsList",
  mounted() {
    console.log("DETAIL",this.$route.params.id);
    this.$store.dispatch(GET_DETAILS, this.$route.params.id);
  },
  computed: {
    ...mapGetters(["userDetail"])
  }
};
</script>
<style>
</style>
