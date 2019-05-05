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
    EN CONSTRUCCIÓN
    <article style="text-align:center;" v-for="(temesForum, index) in temesForum" :key="index">
      <router-link :to="{ name: 'itemForum', params: { slug: temesForum.slug } }">
        <li>{{temesForum.name}}</li>
      </router-link>
    </article>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import {
  GET_TEMES_FORUM
} from "@/store/actions.type";
import RwvCommentEditor from "@/components/CommentEditor";

export default {
  name: "ComponenteForo",
  mounted() {
    console.log("FORO", this.$route.params.id);
    this.$store.dispatch(GET_TEMES_FORUM);
  },
  computed: {
    ...mapGetters([
      "userDetail",
      "isAuthenticated",
      "currentUser",
      "asociacionesInteresadas",
      "temesForum"
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
