<template>
  <section class="container-home">
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
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import RwvTag from "@/components/VTag";
import { GET_LAWYERS } from "@/store/actions.type";

export default {
  name: "home",
  components: {
    RwvTag
  },
  mounted() {
    this.$store.dispatch(GET_LAWYERS);
  },
  computed: {
    ...mapGetters(["user"])
  }
};
</script>
<style>
table,th,td {
  border: 1px solid black;
  border-collapse: collapse;
}
th,td {
  padding: 5px;
}
th {
  text-align: left;
}
</style>
