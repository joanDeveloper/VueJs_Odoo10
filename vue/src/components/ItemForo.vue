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
    <!-- <article v-for="(questionsForum, index) in questionsForum" :key="index">
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
      <button class="btn btn-sm btn-primary" v-if="isAuthenticated && currentUser.typeUser == 1 && desactivateAnswer == true" 
        v-on:click="activateSubmitAnswer(questionsForum.id)">Responder</button>
      <div class="card-block">
        <textarea
          v-if="answerQuestion==true && idQuestion==questionsForum.id"
          class="form-control"
          v-model="answer"
          placeholder="Responda la pregunta ..."
          rows="3"
        ></textarea>
      <button class="btn btn-sm btn-primary" v-if="isAuthenticated && currentUser.typeUser == 1 && activateAnswer == true" 
        v-on:click="submitAnswer(questionsForum.id, currentUser)">Responder</button>
        
      </div>
      <br/>
      <br/>
    </article> -->
    
    <!-- <form
      class="card comment-form"
      v-if="isAuthenticated && currentUser.typeUser == 4"
      v-on:submit.prevent="onSubmit(question, subteme, currentUser); "
    >
      <input type="text" v-model="subteme" placeholder="Introduzca el título ...">
      <div class="card-block">
        <textarea
          class="form-control"
          v-model="question"
          placeholder="Escribe su pregunta ..."
          rows="3"
        ></textarea>
      </div>
      <div class="card-footer">
       
        <button class="btn btn-sm btn-primary">Enviar pregunta</button>
      </div>
    </form> -->
    <section v-if="isAuthenticated">
      <article v-for="(questionsForum, index) in questionsForum" :key="index">
        <router-link :to="{ name: 'questionsForum', params: { subtema: questionsForum.slug_subtema } }">
          <div v-if="questionsForum.display_name != 0">
            {{questionsForum.subtema}}, {{questionsForum.client_id}}, {{questionsForum.create_date}}
          </div>

        </router-link> 
      </article>
      <form
          class="card comment-form"
          v-if="isAuthenticated && currentUser.typeUser == 4"
          v-on:submit.prevent="onSubmit(question, subteme, currentUser); "
        >
        <fieldset class="card-block form-group">
          <input type="text" class="form-control form-control-lg" v-model="subteme" placeholder="Introduzca el título del tema ...">
        </fieldset>
        <div class="card-block">
            <textarea
              class="form-control"
              v-model="question"
              placeholder="Escribe su pregunta ..."
              rows="3"
            ></textarea>
          </div>
          <div class="card-footer">
            <button class="btn btn-sm btn-primary">Enviar pregunta</button>
          </div> 
          
      </form>
    </section>
    <section v-else>
      <router-link :to="{ name: 'login' }">Logueate</router-link> para preguntar si eres usuario o
      <router-link :to="{ name: 'register' }">Registrate</router-link>
    </section>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import {
  GET_TEMES_FORUM,
  CREATE_QUESTION_FORUM,
  GET_QUESTIONS_FORUM,
  SUBMIT_ANSWER_FORUM
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
    activateSubmitAnswer(id_question){
      this.answerQuestion = true;
      this.idQuestion = id_question;
      this.desactivateAnswer = false;
      this.activateAnswer = true;
    },
    submitAnswer(id_question, currentUser){ 
      console.log("submitAnswer",id_question, currentUser, this.answer);
      let payload = {"id_question":id_question, "userLawyer":currentUser, "answer":this.answer};
      this.$store.dispatch(SUBMIT_ANSWER_FORUM, payload);

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
      var cont = 0;
      this.temesForum.forEach(element => {
        let id_tema =
          element.slug == this.$route.params.slug ? element.id : false;
        if (id_tema != false && cont === 0) {
          cont++;
          this.$store.dispatch(GET_QUESTIONS_FORUM, id_tema);
        }
      });
    },
    onSubmit(question, subteme, currentUser) {
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

        if (currentUser.credits >= 500){
          this.temesForum.forEach(element => {
            let id_tema = element.slug == this.$route.params.slug ? element.id : false;
            let cont = 0;
            if (id_tema != false && cont === 0) {
              cont++;
              this.$store.dispatch(CREATE_QUESTION_FORUM, {id_tema,question,subteme,currentUser});
            }
          });
        }else{
          console.log("NO_PASTA");
          Utils.toasterError("Por favor, recargue 500 créditos mínimo para hacer esta pregunta. Gracias.")
        }

      }
    }
  },
  data() {
    return {
      slugTema:this.$route.params.slug,
      question: this.content || null,
      answer: null,
      subteme: null,
      commentLawyer: {},
      id_users: this.id,
      answerQuestion: false,
      desactivateAnswer: true,
      activateAnswer: false,
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
