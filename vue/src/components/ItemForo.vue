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
    <section v-if="isAuthenticated" class="container-item">
      <table cellspacing="5" cellpadding="12">
        <tr class="item-name">
          <th>Subtema</th>
          <th>Autor</th>
          <th>Última pregunta</th>
        </tr>
        <tr v-for="(questionsForum, index) in questionsForum" :key="index">
            <td class="item item-subtema" v-if="questionsForum.display_name != 0"> 
              <router-link class="delete-link-item" :to="{ name: 'questionsForum', params: { subtema: questionsForum.slug_subtema } }">
              <strong>{{questionsForum.subtema}}</strong>
              </router-link>
            </td>
            <td class="item item-author" v-if="questionsForum.display_name != 0">
              <router-link class="delete-link-item" :to="{ name: 'questionsForum', params: { subtema: questionsForum.slug_subtema } }">
              {{questionsForum.client_id}}
              </router-link>
            </td>
            <td class="item item-date" v-if="questionsForum.display_name != 0">
              <router-link class="delete-link-item" :to="{ name: 'questionsForum', params: { subtema: questionsForum.slug_subtema } }">
              {{questionsForum.create_date}}
              </router-link>
            </td>
        </tr>
      </table>
      <form
        class="card comment-form"
        v-if="isAuthenticated && currentUser.typeUser == 4"
        v-on:submit.prevent="onSubmit(question, subteme, currentUser); "
      >
        <fieldset class="card-block form-group">
          <label for="title-tema">Cree un subtema y pregunte lo que necesite</label>
          <input type="text" id="title-tema" class="form-control form-control-lg" v-model="subteme" placeholder="Introduzca el título del tema ...">
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
  GET_QUESTIONS_FORUM
} from "@/store/actions.type";
import { Utils } from "../utils/utils.js";
import { emails, maxLength55, minLength5 } from "../utils/helpers.js";

export default {
  name: "ComponenteItemForo",
  mounted() {
    // If don't find the themes in the store, call back to action
    this.temesForum.length == 0 ? 
    this.$store.dispatch(GET_TEMES_FORUM).then(res=>{
      this.searchIdTeme();
    }) : this.searchIdTeme();
  },
  methods: {
    /**
     * show title banner forum (questions, answer)
     * @method itemTitle
     */
    itemTitle(slug) {
      return Utils.TitleBannerTemeForum(slug);
    },
    /**
     * we search in the array of topics the id of the topics from the slug 
     * so that we can return the questions of the forum
     * @method searchIdTeme
     */
    searchIdTeme() {
      var contTeme = 0;
      this.temesForum.forEach(element => {
        let id_tema =
          element.slug == this.$route.params.slug ? element.id : false;
        if (id_tema != false && contTeme === 0) {
          contTeme++;
          this.$store.dispatch(GET_QUESTIONS_FORUM, id_tema);
        }
      });
    },
    /**
     * first we validate the data of the form, then we verify 
     * if the user has more than 500 credits and we look for the id of the subject from the slug
     * @method onSubmit
     */
    onSubmit(question, subteme, currentUser) {
      var contQuestion = 0;
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
          this.temesForum.forEach(element => {
            let id_tema = element.slug == this.$route.params.slug ? element.id : false;
            if (id_tema != false && contQuestion === 0) {
              contQuestion++;
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
      "isAuthenticated",
      "currentUser",
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

.delete-link-item{
  text-decoration:none !important;
  outline: none !important;
  color: white;
}
.container-item{
  display: flex;
  flex-flow: column wrap;
  align-content: center;
}
.item{
  /*border:1px solid;*/
  
  margin-top: 12%;
  /* border-radius: 5px; */
  padding: 2%;
  text-align: left;
  background: rgb(75, 184, 218);
}
.item-date{
  width: 43%;
  background: rgb(86, 197, 231);
}
.item-author{
  width: 30%;
  background: rgb(94, 189, 218);
}
.item-subtema{
  width: 53%;
}
.item-name{
  background: rgb(131, 196, 216);
  /* color: white; */
}

</style>
