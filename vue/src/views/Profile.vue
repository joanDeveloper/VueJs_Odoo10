<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img src="img/users/joanet1.jpg" class="user-img" />
            <h5 v-if="currentUser.nombre"><strong>{{ currentUser.nombre }}</strong></h5>
            <h4>{{ currentUser.email }}</h4>
            
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <div v-if="isAuthenticated && currentUser.typeUser !== 1" style="text-align:center;">
                <vue-stripe-checkout
                  v-if="selected > 0"
                  ref="checkoutRef"
                  :image="image"
                  :name="name"
                  :description="description"
                  :currency="currency"
                  :amount="selected > 0 ? selected : 0"
                  :allow-remember-me="false"
                  @done="done"
                  @opened="opened"
                  @closed="closed"
                  @canceled="canceled"
                ></vue-stripe-checkout>
                <button @click="checkout"
                  class="btn btn-sm btn-secondary action-btn">
                  <i class="ion-plus-round"></i> Cargar dinero
                </button>
                <select name="" id="" @change="changeSelect($event)">
                  <option disabled value="">Elige importe</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                  <option value="30">30</option>
                </select>
                
              </div>
              <div v-if="profile.length > 0" >
                <section v-for="(profile, index) in profile" :key="index" style="text-align:center;">
                  Tiene {{ profile.credits }} créditos
                </section>
              </div>
              <section v-if="profile.length == 0" style="text-align:center;">Tiene {{currentUser.credits}} créditos</section>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  CHARGE_MONEY_PROFILE
} from "@/store/actions.type";
import Vue from 'vue';
import VueStripeCheckout from 'vue-stripe-checkout';
Vue.use(VueStripeCheckout, 'pk_test_6K8hLzMgtuRmL2dXL429W3os');

export default {
  name: "RwvProfile",
  data() {
    return {
      selected: 0,
      image: 'https://i.imgur.com/HhqxVCW.jpg',
      name: 'Recargar dinero',
      description: 'Recarga créditos',
      currency: 'eur'
    }
  },
  computed: {
    ...mapGetters(["currentUser", "profile", "isAuthenticated"])
  },
  methods: {
    /**
      * we save the value of the select in this and we put 2 zeros to show it in stripe
      * @param {string} event value select
      */
    changeSelect(event){
      console.log("changeSelect", event.target.value);
      this.selected = parseInt(event.target.value+"00");

    },
    /**
      * Open the stripe window and return the values. 
      * When select is greater than 0 we send the data to the server
      */
    async checkout () {
      // token - is the token object
      // args - is an object containing the billing and shipping address if enabled
      if(this.selected > 0){
        const { token, args } = await this.$refs.checkoutRef.open();
        let data = {"currentUser":this.currentUser, "credits":this.selected};
        console.log("DATA_checkout",data);
        this.$store.dispatch(CHARGE_MONEY_PROFILE, data);

      }
    },
    done ({token, args}) {
      console.log("STRIPE", token, args);
      // token - is the token object
      // args - is an object containing the billing and shipping address if enabled
      // do stuff...
    },
    opened () {
      // do stuff 
    },
    closed () {
      // do stuff 
    },
    canceled () {
      // do stuff 
    }
  }
};
</script>
