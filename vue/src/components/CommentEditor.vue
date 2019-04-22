<template>
  <div class="container">
    <!-- <rwv-list-errors :errors="errors"> </rwv-list-errors> -->
    <h4>Comentarios</h4>
    <article class="card-block" v-for="(commentLawyer, index) in commentLawyer" :key="index">
      <img
        class="responsive-imgS"
        src="img/users/joanet1.jpg"
        alt="imagen usuario abogado"
        width="35"
        height="35"
      >
      {{commentLawyer.user_client_id}}
      <br>
      <p class="comment-user">{{commentLawyer.comment}}</p>
      <button class="btn btn-sm btn-info" v-on:click="activeEditComment(commentLawyer.id,commentLawyer.comment)">Editar</button>
      <div class="card-block" v-if="isAuthenticated && editedComment==true && idComment==commentLawyer.id && commentLawyer.user_client_id==currentUser.email">
        <textarea
          class="form-control"
          v-model="updateComment"
          placeholder="Modifique su comentario ..."
          rows="3"
        ></textarea>
        <button class="btn btn-sm btn-primary" v-on:click="editComment(commentLawyer.id)">Actualizar comentario</button>
      </div>
      
    </article>
    
    <form class="card comment-form" v-if="isAuthenticated" v-on:submit.prevent="onSubmit(id, comment, currentUser); ">
      <div class="card-block">
        <textarea
          class="form-control"
          v-model="comment"
          placeholder="Escribe un comentario ..."
          rows="3"
        ></textarea>
      </div>
      <div class="card-footer">
        <img :src="userImage" class="comment-author-img">
        <button class="btn btn-sm btn-primary">Enviar comentario</button>
      </div>
    </form>
    <p v-else>
      <router-link :to="{ name: 'login' }">Logueate</router-link> para comentar si eres usuario o
      <router-link :to="{ name: 'register' }">Registrate</router-link> para añadir comentarios
    </p>
  </div>
</template>

<script>
import { GET_COMMENT, COMMENT_CREATE, GET_DETAILS, UPDATE_COMMENT } from "@/store/actions.type";
import { mapGetters } from "vuex";
import { Utils } from "../utils/utils.js";
import { emails, maxLength55, minLength5 } from "../utils/helpers.js";

export default {
  name: "RwvCommentEditor",
  mounted() {
    this.init();
  },
  props: {
    id: { type: Number, required: true },
    currentUser: { type: Object, required: true },
    content: { type: String, required: false },
    editedComment: { type: Boolean, required: false },
    idComment: { type: Number, required: false },
    userImage: { type: String, required: false }
  },
  computed: {
    ...mapGetters(["userDetail","isAuthenticated", "currentUser"])
  },
  data() {
    return {
      comment: this.content || null,
      updateComment: null,
      commentLawyer: {},
      id_users:this.id,
      editedComment:false,
      idComment: null
    };
  },
  methods: {
    onSubmit(id, comment, currentUser) {
      console.log("onSubmit_COMMENT", this.userDetail[0].id, comment, currentUser);
      let validateMaxLength = maxLength55(comment);
      let validateMinLength = minLength5(comment);

      !validateMaxLength ? Utils.toasterError("Error, maximo 55 caracteres") : true;
      !validateMinLength ? Utils.toasterError("Error, minimo 5 caracteres") : true;

      if ( validateMaxLength && validateMinLength ) {
        id = this.userDetail[0].id;
        this.$store
          .dispatch(COMMENT_CREATE, { id, comment, currentUser })
          .then(data => {
            console.log("DATA__", JSON.parse(data.data.result).comments);
            console.log("DATA__", this);
            this.$data.commentLawyer = JSON.parse(data.data.result).comments;
            //this.errors = {};
          })
          .catch(({ response }) => {
            console.log("DATA__ERROR", response);
            //this.errors = response.data.errors;
          });
      }
      
    },
    init() {
      console.log("MOUNTED", this.$props.id);
      let num_colegiado = this.$props.id;
      this.$store
        .dispatch(GET_COMMENT, { num_colegiado })
        .then(data => {
          console.log("DATA__GET_COMMENT", data);
          this.$data.commentLawyer = data.data.comments;
          //this.errors = {};
        })
        .catch(({ response }) => {
          console.log("DATA__ERROR", response);
          //this.errors = response.data.errors;
        });
    },
    activeEditComment(id,contentComment){
      this.idComment = id;
      this.editedComment = true;
      this.updateComment = contentComment;
    },
    editComment(id){
      console.log("editComment",id,this.updateComment,this.userDetail[0].id);
      let dataComment = {id_comment:id,id_userLawyer:this.userDetail[0].id,comment:this.updateComment};
      this.$store.dispatch(UPDATE_COMMENT, { dataComment }).then(data => {
          console.log("DATA__UPDATE_COMMENT", data);
          this.$data.commentLawyer = JSON.parse(data.data.result).comments;
          this.editedComment = false;

          //this.errors = {};
        })
        .catch(({ response }) => {
          console.log("DATA_UPDATE_COMMENT__ERROR", response);
          //this.errors = response.data.errors;
        });
    }
  }
};
</script>
<style>
.responsive-imgS {
  width: 5%;
  height: 3vw;
  border-radius: 85%;
}
.comment-user {
  margin-left: 5.5%;
}
</style>

