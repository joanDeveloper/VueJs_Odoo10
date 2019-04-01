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
      {{commentLawyer.user_client_id}}<br/>
      <p class="comment-user">{{commentLawyer.comment}}</p>
    </article>
    <form class="card comment-form" v-on:submit.prevent="onSubmit(id, comment, currentUser);">
      <div class="card-block">
        <textarea class="form-control" v-model="comment" placeholder="Escribe un comentario ..." rows="3"></textarea>
      </div>
      <div class="card-footer">
        <img :src="userImage" class="comment-author-img">
        <button class="btn btn-sm btn-primary">Enviar comentario</button>
      </div>
    </form>
  </div>
</template>

<script>
//import RwvListErrors from "@/components/ListErrors";
import { GET_COMMENT } from "@/store/actions.type";

export default {
  name: "RwvCommentEditor",
  //components: { RwvListErrors },
  mounted(){
    console.log("MOUNTED",this.$props.id);
    let id_user = this.$props;
    this.$store
        .dispatch(GET_COMMENT, { id_user })
        .then((data) => {
          console.log("DATA__GET_COMMENT",data);
          //this.$data.commentLawyer = JSON.parse(data.data.result).comments;
          //this.errors = {};
        })
        .catch(({ response }) => {
          console.log("DATA__ERROR",response);
          //this.errors = response.data.errors;
        });
  },
  props: {
    id: { type: Number, required: true },
    currentUser:{ type: Object, required: true },
    content: { type: String, required: false },
    userImage: { type: String, required: false },
  },
  data() {
    return {
      comment: this.content || null,
      commentLawyer: {},
    };
  },
  methods: {
    onSubmit(id, comment, currentUser) {
      console.log("onSubmit_COMMENT",id,comment,currentUser);
      this.$store
        .dispatch(COMMENT_CREATE, { id, comment, currentUser })
        .then((data) => {
          console.log("DATA__",JSON.parse(data.data.result).comments);
          console.log("DATA__",this);
          this.$data.commentLawyer = JSON.parse(data.data.result).comments;
          //this.errors = {};
        })
        .catch(({ response }) => {
          console.log("DATA__ERROR",response);
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
.comment-user{
  margin-left: 5.5%;
}
</style>

