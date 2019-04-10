<template>
  <section>
    <div
      class="banner"
      style="background:linear-gradient(135deg, #b3dced 0%,#29b8e5 50%,#bce0ee 100%);"
    >
      <div class="container" align="center">
        <h1 class="logo-font">Guardias del turno de oficio</h1>
        <h4>Su seguridad a su alcanze</h4>
      </div>
    </div>
    <section class>
      <div v-if="isAuthenticated && currentUser.typeUser==1">
        <h3 align="center">Mis Guardias del Turno</h3><br>
          <table style="width:100%;">
            <tr>
              <th>Nombre</th>
              <th>Turno</th>
              <th>Zona</th>
              <th>Fecha Asistencia</th>
              <th>Entregado</th>
              <th>Importe</th>
            </tr>
            <tr v-for="(guardias, index) in guardias" :key="index">
              <td>{{guardias.user_lawyer[1]}}</td>
              <td>{{guardias.nombre_turno[1]}}</td>
              <td>{{guardias.nombre_zonas[1]}}</td>
              <td>{{guardias.date_attendance}}</td>
              <td>{{guardias.delivered}}</td>
              <td>{{guardias.import_}} €</td>
            </tr>
          </table>
        </div>
      <p v-else>Usted no es un usuario abogado</p>
    </section>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { GET_GUARDIAS } from "@/store/actions.type";

export default {
  name: "CompItemsList",
  data() {
    return {
      misGuardias: []
    };
  },
  mounted() {
    console.log("GUARDIASSSS", this);
    this.$store.dispatch(GET_GUARDIAS);
  },
  computed: {
    ...mapGetters(["isAuthenticated", "currentUser", "guardias"])
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
