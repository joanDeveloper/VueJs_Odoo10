<template>
  <section>
    <div
      class="banner"
      style="background:linear-gradient(135deg, #b3dced 0%,#29b8e5 50%,#bce0ee 100%);"
    >
      <div class="container" align="center">
        <h1 class="logo-font">Tema ---</h1>
        <h4>Su seguridad a su alcanze</h4>
      </div>
    </div>
    <article v-for="(questionsForum, index) in questionsForum" :key="index" class="container-forum">
      <div v-if="questionsForum.slug_subtema == slugSubtema" class="subitem-question-forum">
        <div class="subitem-data">
          <img
            class="user-image"
            src="img/users/joanet1.jpg"
            alt="imagen usuario abogado"
            width="35"
            height="35"
          >
          <span class="subitem-email"><strong>{{questionsForum.client_id}}</strong></span>
          <span class="subitem-date">
           <strong>{{questionsForum.create_date}}</strong>
          </span>
        </div>
        <br>
        <p class="subitem-question">{{questionsForum.question}}</p>
        <div class="subitem-buttons">
          <button class="btn btn-sm btn-info buttons-between" v-if="isAuthenticated && currentUser.typeUser == 1" 
          v-on:click="activateSubmitAnswer(questionsForum.id)">Contestar</button>
          <router-link :to="{ name: 'answerForum', params: { subtema: questionsForum.slug_subtema } }">
            <button class="btn btn-sm btn-info" v-on:click='setIdQuestion(questionsForum.id)' >Ver Respuestas</button>
          </router-link>
        </div>
        
        <div class="card-footer" v-if="answerQuestions==true && idQuestion==questionsForum.id">
          <textarea
            class="form-control"
            v-model="answer"
            placeholder="Responda la pregunta ..."
            rows="3"
          ></textarea>
          <button class="btn btn-sm btn-info" v-if="isAuthenticated && currentUser.typeUser == 1 && activateAnswer == true" 
            v-on:click="submitAnswer(questionsForum.id, currentUser)">Enviar Respuesta</button>
        </div>
      </div>
      
    </article>
    <form
      class="card comment-form"
      v-if="isAuthenticated && currentUser.typeUser == 4"
      v-on:submit.prevent="onSubmit(question, subteme, currentUser);"
    >
      <div class="card-block">
        <label for="write-question">Escribe su pregunta en este subtema</label>
        <textarea
          id="write-question"
          class="form-control"
          v-model="question"
          placeholder="Escribe su pregunta ..."
          rows="3"
        />
      </div>
      <div class="card-footer">
        <button class="btn btn-sm btn-info">Enviar pregunta</button>
      </div>   
    </form>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import {
  GET_QUESTIONS_BYSLUG_FORUM,
  GET_TEMES_FORUM,
  CREATE_QUESTION_FORUM,
  GET_QUESTIONS_FORUM,
  SUBMIT_ANSWER_FORUM,
  GET_ANSWER_FORUM
} from "@/store/actions.type";
import { Utils } from "../utils/utils.js";
import { emails, maxLength55, minLength5 } from "../utils/helpers.js";

export default {
  name: "ComponenteItemForo",
  beforeMount() {
    let slug = this.$route.params.subtema;
    if (this.questionsForum.length == 0) {
      this.$store.dispatch(GET_QUESTIONS_BYSLUG_FORUM, slug);
    }
  },
  props: {
    content: { type: String, required: false }
  },
  methods: {
    setIdQuestion(id_question){
      localStorage.setItem("id_question",id_question);
    },
    activateSubmitAnswer(id_question){
      this.answerQuestions = true;
      this.idQuestion = id_question;
      this.desactivateAnswer = false;
      this.activateAnswer = true;
    },
    submitAnswer(id_question, currentUser){
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
    onSubmit(question, subteme, currentUser) {
      var cont = 0;
      let validateMaxLength = maxLength55(question);
      let validateMinLength = minLength5(question);

      !validateMaxLength
        ? Utils.toasterError("Error, maximo 55 caracteres")
        : true;
      !validateMinLength
        ? Utils.toasterError("Error, minimo 5 caracteres")
        : true;

      if (validateMaxLength && validateMinLength) {
        if (currentUser.credits >= 500){
          this.questionsForum.forEach(element => {
            let subteme = element.slug_subtema == this.$route.params.subtema ? element.subtema : false;
            if (subteme != false && cont === 0) {
              cont++;
              let id_tema = this.questionsForum[0].id_tema[0];
              console.log("AAA____GGGG",id_tema, subteme, question, currentUser);
              this.$store.dispatch(CREATE_QUESTION_FORUM, {id_tema,question,subteme,currentUser});
            }
          });
        }else{
          Utils.toasterError("Por favor, recargue 500 créditos mínimo para hacer esta pregunta. Gracias.")
        }
      }
    }
  },
  data() {
    return {
      slugSubtema : this.$route.params.subtema,  
      question: this.content || null,
      answer: null,
      subteme: null,
      commentLawyer: {},
      id_users: this.id,
      answerQuestions: false,
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
      "questionsForum",
      "answerQuestion"
    ])
  }
};
</script>
<style>
.container-forum{
  display: flex;
  flex-flow: column wrap;
  align-content: center;
}
.subitem-question-forum{
  margin-top: 2%;
  background-color: rgb(199, 196, 196);
  border-radius: 15px;
  width: 80%;
}
.subitem-data{
  padding: 1%;
  background-color: rgb(131, 191, 231);
}
.buttons-between{
  margin-right: 5%;
}
.subitem-buttons{
  margin-left: 3%;
  padding: 2%;
}
.subitem-date{
  margin-left: 65%;
}
.subitem-question{
  margin-left: 5%;
  width: 90%;
}
.user-image{
  border-radius: 50%;
}
.subitem-email{
  margin-left: 1%;
}
.space-between{
  margin-left: 5%;
}
.space-top{
  padding-top: 5%;
}
</style>
