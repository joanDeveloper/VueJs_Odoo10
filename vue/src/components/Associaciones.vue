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
    <section style="text-align:center;margin-bottom:20px;" v-if="isAuthenticated && currentUser.typeUser==1 && asociacionesInteresadas.length > 0">
      <span v-for="(asociacionesInteresadas, index) in asociacionesInteresadas" :key="index">
        La asociación <strong>{{ asociacionesInteresadas.user_asociation[1]}}</strong> te ha elegido como abogado
      </span>
    </section>
    <section class>
      <div v-if="isAuthenticated && currentUser.typeUser==1">
        <h3 align="center">Listado de Associaciones</h3>
        <br>
        <table style="width:100%;">
          <tr>
            <th>Associación</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Código Postal</th>
            <th>Acción</th>
          </tr>
          <tr v-for="(associaciones, index) in associaciones" :key="index">
            <td>{{associaciones.name}}</td>
            <td>{{associaciones.email}}</td>
            <td>{{associaciones.telefono}}</td>
            <td>{{associaciones.cod_postal}}</td>
            <td>
              <button v-on:click="suscribe(associaciones.id)">Inscribirse</button>
              <button v-on:click="unsuscribe(associaciones.id)">Desuscribirse</button>
            </td>
          </tr>
        </table>
      </div>

      <div v-if="isAuthenticated && currentUser.typeUser==6">
        <h3 align="center">Listado de Abogados Interesados</h3>
        <br>

        <section
          v-for="(lawyersInteresados, index) in lawyersInteresados"
          :key="index"
          class="container"
        >
          <span
            align="center"
            v-if="lawyersInteresados.selected==true"
          >Has seleccionado a {{lawyersInteresados.userDetail.name}} como su abogado</span>
        </section>

        <table style="width:100%;">
          <tr>
            <th>Nombre Abogado</th>
            <th>Email Abogado</th>
            <th>Teléfono Abogado</th>
            <th>Ver Abogado</th>
            <th>Acción</th>
          </tr>
          <tr v-for="(lawyersInteresados, index) in lawyersInteresados" :key="index">
            <td>{{lawyersInteresados.userDetail.name}}</td>
            <td>{{lawyersInteresados.userDetail.email}}</td>
            <td>{{lawyersInteresados.userDetail.telefono}}</td>
            <td>
              <router-link
                :to="{ name: 'detailItems',params: { id: lawyersInteresados.userDetail.num_colegiado } }"
              >
                <button>Ver</button>
              </router-link>
            </td>
            <td>
              <button v-if="lawyersInteresados.selected!=true" v-on:click="selected(lawyersInteresados.id)">Elegir</button>
              <button v-else v-on:click="deleteSelected(lawyersInteresados.id)">Eliminar seleccion</button>
            </td>
          </tr>
        </table>
      </div>
    </section>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import {
  GET_ASSOCIACIONES,
  GET_LAWYERS_INTERESADOS,
  POST_ASSOCIACIONES,
  POST_INTERESADO,
  DELETE_INTERESADO,
  DELETE_ASOCIACION,
  GET_ASSOCIACIONES_INTERESADOS
} from "@/store/actions.type";

export default {
  name: "CompItemsList",
  mounted() {
    this.$store.dispatch(GET_ASSOCIACIONES).then(res=>{
      this.$store.dispatch(GET_LAWYERS_INTERESADOS, this.currentUser.id).then(res=>{
        this.$store.dispatch(GET_ASSOCIACIONES_INTERESADOS, this.currentUser.id);
      });
    });
  },
  computed: {
    ...mapGetters([
      "isAuthenticated",
      "currentUser",
      "associaciones",
      "lawyersInteresados",
      "asociacionesInteresadas"
    ])
  },
  methods: {
    /**
     * We call the action so that an user can subscribe to an association
     * @method suscribe
     */
    suscribe(id) {
      let payload = { id_asociacion: id, id_user: this.currentUser.id };
      this.$store.dispatch(POST_ASSOCIACIONES, payload);
    },
    /**
     * We call this action so that an association can choose the lawyer
     * @method selected
     */
    selected(id) {
      let payload = { id_interesado: id, id_asociacion: this.currentUser.id };
      this.$store.dispatch(POST_INTERESADO, payload);
    },
    /**
     * we call this action to deselect the lawyer user
     * @method deleteSelected
     */
    deleteSelected(id) {
      let payload = { id_interesado: id , id_asociacion: this.currentUser.id};
      this.$store.dispatch(DELETE_INTERESADO, payload);
    },
    /**
     * we call this action so that a lawyer user can unsubscribe from the association
     * @method unsuscribe
     */
    unsuscribe(id) {
      let payload = { id_interesado: this.currentUser.id , id_asociacion: id};
      this.$store.dispatch(DELETE_ASOCIACION, payload);
    }
  }
};
</script>
<style>
</style>
