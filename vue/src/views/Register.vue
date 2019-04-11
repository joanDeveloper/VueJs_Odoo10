<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'login' }">Have an account?</router-link>
          </p>
          <ul v-if="errors" class="error-messages">
            <li v-for="(v, k) in errors" :key="k">{{ v | error }}</li>
          </ul>
          <form v-on:submit.prevent="onSubmit">
            <fieldset class="form-group">
              Qué tipo de usuario eres?
              <br>
              <label for="typeLawyer">Abogado:</label>
              <input id="typeLawyer" type="radio" name="typeUser" v-model="typeUser" value="1">
              
              <label for="typeClient">Cliente:</label>
              <input id="typeClient" type="radio" name="typeUser" v-model="typeUser" value="4">
              <label for="typeAsociacion">Asociación:</label>
              <input id="typeAsociacion" type="radio" name="typeUser" v-model="typeUser" value="6">
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="email"
                placeholder="Email"
              >
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                v-model="password"
                placeholder="Password"
              >
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">Sign up</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { REGISTER } from "@/store/actions.type";
import { Utils } from "../utils/utils.js";
import { emails, maxLength10, minLength5 } from "../utils/helpers.js";

export default {
  name: "RwvRegister",
  data() {
    return {
      typeUser: "",
      email: "",
      password: ""
    };
  },
  computed: {
    ...mapState({
      errors: state => state.auth.errors
    })
  },
  methods: {
    onSubmit() {
      let validateMaxLength = maxLength10(this.password);
      let validateMinLength = minLength5(this.password);
      let validateEmail = emails(this.email);

      this.typeUser.length == 0 ? Utils.toasterError("Error, selecciona el tipo de usuario") : true;
      !validateMaxLength ? Utils.toasterError("Error, maximo 15 caracteres") : true;
      !validateMinLength ? Utils.toasterError("Error, minimo 5 caracteres") : true;
      !validateEmail ? Utils.toasterError("Error, email invalido") : true;

      if (validateMaxLength && validateEmail && validateMinLength && this.typeUser.length > 0 ) {
        console.log("TRUE_REGISTER", this.email, this.password, this.typeUser);
        this.$store.dispatch(REGISTER, {
          email: this.email,
          password: this.password,
          typeUser: this.typeUser
        }).then(() => this.$router.push({ name: "home" }));
      }
    }
  }
};
</script>
