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
    <article v-if="answerQuestion.length > 0" class="container-forum">
        <div v-for="(answerQuestion, index) in answerQuestion" :key="'answer-'+index" class="subitem-question-forum">
            <img
              class="user-image"
              src="img/users/joanet1.jpg"
              alt="imagen usuario abogado"
              width="35"
              height="35"
            >
            <span class="subitem-email"><strong>{{answerQuestion.lawyer_id}}</strong></span>
            <span class="subitem-dates"><strong>{{answerQuestion.create_date}}</strong></span>
            <p class="subitem-question-answer">{{answerQuestion.answer}}</p>
        </div>
        
    </article>
    <article v-else>
        Cargando respuestas ...
    </article>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import {
  GET_QUESTIONS_BYSLUG_FORUM,
  GET_ANSWER_FORUM
} from "@/store/actions.type";
import { Utils } from "../utils/utils.js";
import { emails, maxLength55, minLength5 } from "../utils/helpers.js";

export default {
  name: "ComponentAnswerForo",
  beforeMount() {
    // When the page is reloaded the content of the store is lost, therefore, we make the request again by slug
    console.log("ITEM_FORO", this.$route.params.subtema);
    let slug = this.$route.params.subtema;
    if (this.questionsForum.length == 0) {
      this.$store.dispatch(GET_QUESTIONS_BYSLUG_FORUM, slug).then(res=>{
        this.getIdQuestion();
      });
    }
    this.getIdQuestion();
    
  },
  props: {
    content: { type: String, required: false }
  },
  methods: {
    /**
     * @method itemTitle replace hyphens with spaces and the first letter in uppercase
     */
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
    /**
      * get id of the question with localStorage to obtain the answers
      */
    getIdQuestion() {
      console.log("YEAH getIdQuestion",this.questionsForum);
      let id_question = localStorage.getItem("id_question");
      this.$store.dispatch(GET_ANSWER_FORUM, id_question);

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
.subitem-dates{
  margin-left: 60%;
}
.subitem-question-answer{
  margin-left: 2%;
  width: 90%;
  margin-top: 1%;
  padding: 2%;
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
