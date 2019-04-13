<template>
  <section>
    <div
      class="banner"
      style="background:linear-gradient(135deg, #b3dced 0%,#29b8e5 50%,#bce0ee 100%);"
    >
      <div class="container" align="center">
        <h1 class="logo-font">Associaciones</h1>
        <h4>Su seguridad a su alcanze</h4>
      </div>
    </div>
    <section class>
      <div v-if="isAuthenticated && currentUser.typeUser==1">
        <h3 align="center">Listado de Associaciones</h3><br>
          <table style="width:100%;">
            <tr>
              <th>Associación</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Código Postal</th>
              <th>Inscribirse</th>
            </tr>
            <tr v-for="(associaciones, index) in associaciones" :key="index">
              <td>{{associaciones.name}}</td>
              <td>{{associaciones.email}}</td>
              <td>{{associaciones.telefono}}</td>
              <td>{{associaciones.cod_postal}}</td>
              <td><button value="Inscribirse">Inscribirse</button></td>
            </tr>
          </table>
        </div>
      <p v-else>Usted no es un usuario abogado</p>
    </section>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { GET_ASSOCIACIONES } from "@/store/actions.type";

export default {
  name: "CompItemsList",
  mounted() {
    this.$store.dispatch(GET_ASSOCIACIONES);
  },
  computed: {
    ...mapGetters(["isAuthenticated", "currentUser", "associaciones"])
  }
};
</script>
<style>

</style>
