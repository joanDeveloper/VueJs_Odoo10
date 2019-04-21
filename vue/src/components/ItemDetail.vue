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
    <article class>
      <section
        style="text-align:center;margin-bottom:20px;"
        v-if="asociacionesInteresadas.length > 0"
      >
        <span v-for="(asociacionesInteresadas, index) in asociacionesInteresadas" :key="index">
          Este abogado ayuda a la asociación
          <strong>{{ asociacionesInteresadas.user_asociation[1]}}</strong>
        </span>
      </section>
      <div class="container-detail">
        <img
          class="responsive-img"
          src="img/users/joanet1.jpg"
          alt="imagen usuario abogado"
          width="35"
          height="35"
        >
        <div class="container-detail__rigth" v-if="userDetail[0]">
          <span class="data-items__detail">
            <strong>Nº Colegiado:</strong>
            {{ userDetail[0].num_colegiado }}
          </span>
          <br>
          <br>

          <span class="data-items__detail">
            <strong>Email:</strong>
            {{ userDetail[0].email }}
          </span>
          <br>
          <br>

          <span class="data-items__detail">
            <strong>Ejerciente:</strong>
            <span class="data-items__detail" v-if="userDetail[0].ejerciente==true">Sí</span>
            <span class="data-items__detail" v-else>No</span>
          </span>
        </div>
        <div class="container-detail__left" v-if="userDetail[0]">
          <span>
            <strong>Nombre:</strong>
            {{ userDetail[0].name }}
          </span>
          <br>
          <br>
          <span class="data-items__detail">
            <strong>Apellidos:</strong>
            {{ userDetail[0].apellidos }}
          </span>
        </div>
      </div>
    </article>
    <RwvCommentEditor v-if="userDetail[0]" :id="this.$route.params.id" :currentUser="currentUser"></RwvCommentEditor>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import {
  GET_DETAILS,
  GET_COMMENT,
  GET_ASSOCIACIONES_INTERESADOS
} from "@/store/actions.type";
import RwvCommentEditor from "@/components/CommentEditor";

export default {
  name: "CompItemsList",
  mounted() {
    console.log("DETAIL", this.$route.params.id);
    this.$store
      .dispatch(GET_DETAILS, this.$route.params.id)
      .then(data => {
        console.log("AS_DETAIL___", JSON.parse(data.result)[0].id);
        let id = JSON.parse(data.result)[0].id;
        this.$store.dispatch(GET_ASSOCIACIONES_INTERESADOS, id);
      })
      .catch(({ response }) => {});
  },
  computed: {
    ...mapGetters([
      "userDetail",
      "isAuthenticated",
      "currentUser",
      "asociacionesInteresadas"
    ])
  },
  components: {
    RwvCommentEditor
  }
};
</script>
<style>
.container-detail {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
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
}
</style>
