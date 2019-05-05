<template>
  <section>
    <div
      class="banner"
      style="background:linear-gradient(135deg, #b3dced 0%,#29b8e5 50%,#bce0ee 100%);"
    >
      <div class="container" align="center">
        <h1 class="logo-font">Tema {{ itemTitle(this.$route.params.slug)  }}</h1>
        <h4>Su seguridad a su alcanze</h4>
      </div>
    </div>
    <article v-for="(questionsForum, index) in questionsForum" :key="index">
      {{questionsForum.question}}
    </article>
    <form class="card comment-form" v-if="isAuthenticated" v-on:submit.prevent="onSubmit(question, currentUser); ">
      <div class="card-block">
        <textarea
          class="form-control"
          v-model="question"
          placeholder="Escribe su pregunta ..."
          rows="3"
        ></textarea>
      </div>
      <div class="card-footer">
        <!-- <img :src="userImage" class="comment-author-img"> -->
        <button class="btn btn-sm btn-primary">Enviar pregunta</button>
      </div>
    </form>
    <p v-else>
      <router-link :to="{ name: 'login' }">Logueate</router-link> para hacer una pregunta si eres usuario o
      <router-link :to="{ name: 'register' }">Registrate</router-link> para hacer una pregunta
    </p>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import {
  GET_TEMES_FORUM,
  CREATE_QUESTION_FORUM
} from "@/store/actions.type";
import { Utils } from "../utils/utils.js";
import { emails, maxLength55, minLength5 } from "../utils/helpers.js";

export default {
  name: "ComponenteItemForo",
  mounted() {
    console.log("ITEM_FORO", this.$route.params.slug);
    if (this.temesForum.length == 0){
      console.log("TEMA_DISPATCH");
      this.$store.dispatch(GET_TEMES_FORUM);
    }
  },
  props: {
    content: { type: String, required: false },
  },
  methods: {
    itemTitle(slug){
      return slug.split("tema-")[1].charAt(0).toUpperCase() + slug.split("tema-")[1].slice(1).replace ('-', " ")
    },
    onSubmit(question, currentUser) {
      console.log("onSubmit_FORO_COMMENT", question, currentUser);
      let validateMaxLength = maxLength55(question);
      let validateMinLength = minLength5(question);

      !validateMaxLength ? Utils.toasterError("Error, maximo 55 caracteres") : true;
      !validateMinLength ? Utils.toasterError("Error, minimo 5 caracteres") : true;

      if ( validateMaxLength && validateMinLength ) {
        console.log("CREATE_QUESTION_FORUM",this.$route.params.slug, question, currentUser)
        console.log("FORUM____",this.temesForum);
        this.temesForum.forEach(element => {
          let id_tema = element.slug == this.$route.params.slug ? element.id : false;
          let cont = 0;
          if(id_tema!=false && cont === 0){
            cont++;
            this.$store
              .dispatch(CREATE_QUESTION_FORUM, { id_tema, question, currentUser })
              .then(data => {
                console.log("DATA__QUESTION_FORUM", data);
                //console.log("DATA__", this);
                //this.$data.commentLawyer = JSON.parse(data.data.result).question;
                //this.errors = {};
              })
              .catch(({ response }) => {
                console.log("DATA__ERROR_FORUM", response);
                //this.errors = response.data.errors;
              });
          }
        });
      }
      
    },
  },
  data() {
    return {
      question: this.content || null,
      updateComment: null,
      commentLawyer: {},
      id_users:this.id,
      editedComment:false,
      idComment: null
    };
  },
  computed: {
    ...mapGetters([
      "userDetail",
      "isAuthenticated",
      "currentUser",
      "asociacionesInteresadas",
      "temesForum",
      "questionsForum"
    ])
  }
};
</script>
<style>

</style>
