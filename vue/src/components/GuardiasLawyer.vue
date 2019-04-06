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
        <div class="container-detail" v-if="isAuthenticated && currentUser.typeUser==1">
            Mis Guardias
        </div>
        <p v-else>Usted no es un usuario abogado</p>
    </section>
    
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { GET_DETAILS,GET_COMMENT } from "@/store/actions.type";

export default {
  name: "CompItemsList",
  mounted() {
       console.log("USER_DETAIL", this.currentUser);
    //this.$nextTick(function() {
      /*console.log("DETAIL", this.$route.params.id);
      this.$store.dispatch(GET_DETAILS, this.$route.params.id);
      console.log("USER_DETAIL", this.userDetail[0], this.currentUser);*/

  },
  computed: {
    ...mapGetters(["isAuthenticated", "currentUser"])
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
