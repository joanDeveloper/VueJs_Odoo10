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
    <div class="container-tema">
      <article class="tema" v-for="(temesForum, index) in temesForum" :key="index">
        <router-link class="delete-link" :to="{ name: 'itemForum', params: { slug: temesForum.slug } }">
          {{temesForum.name}}
        </router-link>
      </article>
    </div>
    
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
.delete-link{
  text-decoration:none !important;
  outline: none !important;
}
.container-tema{
  display: flex;
  flex-flow: column wrap;
  align-content: center;
}
.tema{
  border:1px solid;
  width: 50%;
  border-radius: 5px;
  margin-top: 1%;
  padding: 1%;
  text-align: center;
}

</style>
