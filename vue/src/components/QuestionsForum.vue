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
    <article v-for="(questionsForum, index) in questionsForum" :key="index">
      <div v-if="questionsForum.slug_subtema == slugSubtema">
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
          v-on:click="activateSubmitAnswer(questionsForum.id)">Contestar</button>
        <div class="card-block">
          <textarea
            v-if="answerQuestions==true && idQuestion==questionsForum.id"
            class="form-control"
            v-model="answer"
            placeholder="Responda la pregunta ..."
            rows="3"
          ></textarea>
          <button class="btn btn-sm btn-primary" v-if="isAuthenticated && currentUser.typeUser == 1 && activateAnswer == true" 
            v-on:click="submitAnswer(questionsForum.id, currentUser)">Enviar Respuesta</button>

            <router-link :to="{ name: 'answerForum', params: { subtema: questionsForum.slug_subtema } }">
              <button class="btn btn-sm btn-primary">Ver Respuestas</button>
            </router-link>

        </div>
      </div>
      
    </article>

    <form
        class="card comment-form"
        v-if="isAuthenticated && currentUser.typeUser == 4"
        v-on:submit.prevent="onSubmit(question, subteme, currentUser); "
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
          <button class="btn btn-sm btn-primary">Enviar pregunta</button>
        </div> 
        
    </form>
    <!-- <article v-for="(answerQuestion, index) in answerQuestion" :key="'answer-'+index">
      <div>
        {{answerQuestion.answer}}
      </div>
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
    console.log("ITEM_FORO", this.$route.params.subtema);
    let slug = this.$route.params.subtema;
    if (this.questionsForum.length == 0) {
      this.$store.dispatch(GET_QUESTIONS_BYSLUG_FORUM, slug).then(res=>{
        //this.$store.dispatch(GET_ANSWER_FORUM, slug);
        //this.searchIdTeme();
      });
    }
    //this.$store.dispatch(GET_ANSWER_FORUM, slug);
    //this.searchIdTeme();
    
  },
  props: {
    content: { type: String, required: false }
  },
  methods: {
    activateSubmitAnswer(id_question){
      this.answerQuestions = true;
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
    // searchIdTeme() {
    //   console.log("YEAH searchIdTeme",this.questionsForum);
    //     this.questionsForum.forEach(element => {
    //         console.log("questionsForum",element);
    //         let id_question = element.slug_subtema == this.$route.params.subtema ? element.id : false;
    //         console.log("searchIdTeme__",id_question);
    //         let cont = 0;
    //         if (id_question != false && cont === 0) {
    //             cont++;
    //             console.log("CCCCCCCC");
    //             this.$store.dispatch(GET_ANSWER_FORUM, id_question);
    //         }
    //     });
    // },
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
        console.log("CREATE_QUESTION_FORUM", this.$route.params.subtema,currentUser);
        console.log("FORUM____", this.questionsForum[0].id_tema[1]);
        this.questionsForum.forEach(element => {
          let subteme = element.slug_subtema == this.$route.params.subtema ? element.subtema : false;
          let cont = 0;
          if (subteme != false && cont === 0) {
            cont++;
            let id_tema = this.questionsForum[0].id_tema[0];
            console.log("AAA____GGGG",id_tema, subteme, question, currentUser);
            this.$store.dispatch(CREATE_QUESTION_FORUM, {id_tema,question,subteme,currentUser});
          }
          
        });
        //this.$store.dispatch(CREATE_QUESTION_FORUM, {id_tema,question,subteme,currentUser});
        
        // let g = this.questionsForum[0].slug_subtema.charAt(0).toUpperCase() + this.questionsForum[0].slug_subtema.slice(1);
        // console.log("FORUM____GGGG", g.replace("-", " "));
        // this.temesForum.forEach(element => {
        //   let id_tema = element.slug == this.$route.params.slug ? element.id : false;
        //   let cont = 0;
        //   if (id_tema != false && cont === 0) {
        //     cont++;
        //     this.$store.dispatch(CREATE_QUESTION_FORUM, {id_tema,question,subteme,currentUser});
        //   }
        // });
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
/*.responsive-imgForo {
  width: 3%;
  height: 3vw;
  border-radius: 85%;
}
.question-user {
  margin-left: 3.3%;
}
.btn{
  margin-left: 3%;
}*/
</style>
