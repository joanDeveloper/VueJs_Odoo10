<template>
  <section>
    <div
      class="banner"
      style="background:linear-gradient(135deg, #b3dced 0%,#29b8e5 50%,#bce0ee 100%);"
    >
      <div class="container" align="center">
        <h1 class="logo-font">Asuntos del Turno de Oficio</h1>
        <h4>Su seguridad a su alcanze</h4>
      </div>
    </div>
    <section class>
      <div v-if="isAuthenticated && currentUser.typeUser==1">
        <h3 align="center">Mis Designaciones del Turno</h3><br>
          <table style="width:100%;">
            <tr>
              <th>Nombre Cliente</th>
              <th>Apellidos Cliente</th>
              <th>Email Cliente</th>
              <th>Telefono Cliente</th>
              <th>Turno</th>
              <th>Zona</th>
              <th>Descripcion</th>
              <th>Entregado</th>
              <th>Importe</th>
            </tr>
            <tr v-for="(casos, index) in casos" :key="index">
              <td>{{casos.user_client}}</td>
              <td>{{casos.surname_client}}</td>
              <td>{{casos.email_client}}</td>
              <td>{{casos.phone_client}}</td>
              <td>{{casos.nombre_turno[1]}}</td>
              <td>{{casos.nombre_zonas[1]}}</td>
              <td>{{casos.description}}</td>
              <td>{{casos.delivered}}</td>
              <td>{{casos.import_}}</td>
            </tr>
          </table>
        </div>
      <p v-else>Usted no es un usuario abogado</p>
    </section>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { GET_CASOS } from "@/store/actions.type";

export default {
  name: "CompItemsList",
  mounted() {
    this.$store.dispatch(GET_CASOS);
  },
  computed: {
    ...mapGetters(["isAuthenticated", "currentUser", "casos"])
  }
};
</script>
<style>
/*.container-detail {
  display: flex;
  flex-flow: column wrap;
  justify-content: flex-start;
  margin-left: 40%;
  clear: both;
}
.container-detail__rigth {
  margin-left: 20%;
  margin-top: -9%;
}
.container-detail__left {
  margin-top: 5%;
}
.responsive-img {
  width: 10%;
  height: 5vw;
  border-radius: 45%;
}*/
</style>
