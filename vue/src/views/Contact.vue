<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Contact</h1>
          
          <ul v-if="errors" class="error-messages">
            <li v-for="(v, k) in errors" :key="k">{{ k }} {{ v | error }}</li>
          </ul>
          <form v-on:submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="name"
                placeholder="name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="email"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="subject"
                placeholder="your subject"
              />
            </fieldset>
            <fieldset class="form-group">
              <textarea
                class="form-control form-control-lg"
                type="text"
                v-model="comment"
                placeholder="your comment"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Enviar
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { SEND_CONTACT } from "@/store/actions.type";

export default {
  name: "RwvContact",
  /**
   * We declare and initialize the fields
   */
  data() {
    return {
      name: "",
      email: "",
      subject: "",
      comment:""
    };
  },
  computed: {
    /**
     * Show server errors
     */
    ...mapState({
      errors: state => state.auth.errors
    })
  },
  methods: {
    /**
     * Send data form contact to server.
     * We call action SEND_CONTACT to send data at server.
     * Then we redirect the user to the home.
     * @param {string} email value email
     * @param {string} subject value subject
     * @param {string} name value name
     * @param {string} comment value comment
     */
    onSubmit() {
      this.$store
        .dispatch(SEND_CONTACT, {
          email: this.email,
          subject: this.subject,
          name: this.name,
          comment: this.comment
        }).then(() => this.$router.push({ name: "home" }));
    }
  }
};
</script>
