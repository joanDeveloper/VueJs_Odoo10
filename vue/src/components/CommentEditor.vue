<template>
  <div>
    <!-- <rwv-list-errors :errors="errors"> </rwv-list-errors> -->
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
import { COMMENT_CREATE } from "@/store/actions.type";

export default {
  name: "RwvCommentEditor",
  //components: { RwvListErrors },
  props: {
    id: { type: Number, required: true },
    currentUser:{ type: Object, required: true },
    content: { type: String, required: false },
    userImage: { type: String, required: false }
  },
  data() {
    return {
      comment: this.content || null
      //errors: {}
    };
  },
  methods: {
    onSubmit(id, comment, currentUser) {
      console.log("onSubmit_COMMENT",id,comment,currentUser);
      this.$store
        .dispatch(COMMENT_CREATE, { id, comment, currentUser })
        .then((data) => {
          console.log("DATA__",data);
          //this.comment = null;
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
