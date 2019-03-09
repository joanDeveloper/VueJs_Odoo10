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
    <article class="container">
      <table>
        <tr>
          <th>Nombre</th>
          <th>Apellidos</th>
          <th>Codigo postal</th>
          <th>Número de colegiado</th>
        </tr>
        <tr v-for="(user, index) in user" :key="index">
          <td>{{user.nombre}}</td>
          <td>{{user.apellidos}}</td>
          <td>{{user.cod_postal}}</td>
          <td>{{user.num_colegiado}}</td>
        </tr>
      </table>
    </article>
  </section>
</template>

<script>
// console.log("ASDDDDDD___", this.params);
import { mapGetters } from "vuex";
//import RwvTag from "@/components/VTag";
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
</style>
