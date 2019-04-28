<template>
  <section>
    <div
      class="banner"
      style="background:linear-gradient(135deg, #b3dced 0%,#29b8e5 50%,#bce0ee 100%);"
    >
      <div class="container" align="center">
        <h1 class="logo-font">Foro</h1>
        <h4>Su seguridad a su alcanze</h4>
      </div>
    </div>
    <article style="text-align:center;">
      En construcción ...
    </article>
    <!-- <RwvCommentEditor v-if="userDetail[0]" :id="this.$route.params.id" :currentUser="currentUser"></RwvCommentEditor> -->
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
  name: "ComponenteForo",
  mounted() {
    console.log("FORO", this.$route.params.id);
    // this.$store
    //   .dispatch(GET_DETAILS, this.$route.params.id)
    //   .then(data => {
    //     console.log("AS_DETAIL___", JSON.parse(data.result)[0].id);
    //     let id = JSON.parse(data.result)[0].id;
    //     this.$store.dispatch(GET_ASSOCIACIONES_INTERESADOS, id);
    //   })
    //   .catch(({ response }) => {});
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
/* .container-detail {
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
} */
</style>
