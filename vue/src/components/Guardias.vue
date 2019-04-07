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
        Mis guardias
        <div v-if="isAuthenticated && currentUser">
            SSSS
        </div>
        <div v-else>
            <router-link :to="{ name: 'login' }">Logueate</router-link>como abogado para ver sus guardias
        </div>
        
       
    
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { GET_DETAILS,GET_COMMENT } from "@/store/actions.type";
import RwvCommentEditor from "@/components/CommentEditor";

export default {
  name: "CompItemsList",
  mounted() {
    

  },
  computed: {
    ...mapGetters(["userDetail", "isAuthenticated", "currentUser"])
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
