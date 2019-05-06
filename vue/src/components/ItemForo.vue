<template>
  <section>
    <div
      class="banner"
      style="background:linear-gradient(135deg, #b3dced 0%,#29b8e5 50%,#bce0ee 100%);"
    >
      <div class="container" align="center">
        <h1 class="logo-font">Tema {{ itemTitle(this.$route.params.slug) }}</h1>
        <h4>Su seguridad a su alcanze</h4>
      </div>
    </div>
    <article v-for="(questionsForum, index) in questionsForum" :key="index">
      <img
        class="responsive-imgForo"
        src="img/users/joanet1.jpg"
        alt="imagen usuario abogado"
        width="35"
        height="35"
      >
      {{questionsForum.client_id}}
      <br>
      <p class="question-user">{{questionsForum.question}}</p>
      <div class="card-block">
        <textarea
          v-if="answerQuestion==true && idQuestion==questionsForum.id"
          class="form-control"
          v-model="updateComment"
          placeholder="Responda la pregunta ..."
          rows="3"
        ></textarea>
      <button class="btn btn-sm btn-primary" v-if="isAuthenticated && currentUser.typeUser == 1" 
        v-on:click="submitAnswer(questionsForum.id,questionsForum.question)">Responder</button>
        
      </div>
      <br/>
      <br/>
    </article>
    <form
      class="card comment-form"
      v-if="isAuthenticated && currentUser.typeUser == 4"
      v-on:submit.prevent="onSubmit(question, currentUser); "
    >
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
    <!-- <p v-else>
      <router-link :to="{ name: 'login' }">Logueate</router-link> para hacer una pregunta si eres usuario o
      <router-link :to="{ name: 'register' }">Registrate</router-link> para hacer una pregunta
    </p> -->
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import {
  GET_TEMES_FORUM,
  CREATE_QUESTION_FORUM,
  GET_QUESTIONS_FORUM
} from "@/store/actions.type";
import { Utils } from "../utils/utils.js";
import { emails, maxLength55, minLength5 } from "../utils/helpers.js";

export default {
  name: "ComponenteItemForo",
  mounted() {
    console.log("ITEM_FORO", this.$route.params.slug);
    if (this.temesForum.length == 0) {
      this.$store.dispatch(GET_TEMES_FORUM).then(res=>{
        this.searchIdTeme();
      });
    }
    this.searchIdTeme();
    
  },
  props: {
    content: { type: String, required: false }
  },
  methods: {
    submitAnswer(id_question, question){ 
      console.log("submitAnswer",id_question, question);
      this.answerQuestion = true;
      this.idQuestion = id_question;

    },
    itemTitle(slug) {
      return (
        slug
          .split("tema-")[1]
          .charAt(0)
          .toUpperCase() +
        slug
          .split("tema-")[1]
          .slice(1)
          .replace("-", " ")
      );
    },
    searchIdTeme() {
      console.log("YEAH searchIdTeme");
      this.temesForum.forEach(element => {
        let id_tema =
          element.slug == this.$route.params.slug ? element.id : false;
        let cont = 0;
        if (id_tema != false && cont === 0) {
          cont++;
          this.$store.dispatch(GET_QUESTIONS_FORUM, id_tema);
        }
      });
    },
    onSubmit(question, currentUser) {
      console.log("onSubmit_FORO_COMMENT", question, currentUser);
      let validateMaxLength = maxLength55(question);
      let validateMinLength = minLength5(question);

      !validateMaxLength
        ? Utils.toasterError("Error, maximo 55 caracteres")
        : true;
      !validateMinLength
        ? Utils.toasterError("Error, minimo 5 caracteres")
        : true;

      if (validateMaxLength && validateMinLength) {
        console.log("CREATE_QUESTION_FORUM", this.$route.params.slug,currentUser);
        console.log("FORUM____", this.temesForum);
        this.temesForum.forEach(element => {
          let id_tema = element.slug == this.$route.params.slug ? element.id : false;
          let cont = 0;
          if (id_tema != false && cont === 0) {
            cont++;
            this.$store.dispatch(CREATE_QUESTION_FORUM, {id_tema,question,currentUser});
          }
        });
      }
    }
  },
  data() {
    return {
      question: this.content || null,
      updateComment: null,
      commentLawyer: {},
      id_users: this.id,
      answerQuestion: false,
      idQuestion: null
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
.responsive-imgForo {
  width: 3%;
  height: 3vw;
  border-radius: 85%;
}
.question-user {
  margin-left: 3.3%;
}
.btn{
  margin-left: 3%;
}
</style>
