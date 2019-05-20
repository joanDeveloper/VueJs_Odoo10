<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img src="img/users/joanet1.jpg" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>{{ profile.bio }}</p>
            <!-- <div v-if="isCurrentUser()">
              <router-link
                class="btn btn-sm btn-outline-secondary action-btn"
                :to="{ name: 'settings' }"
              >
                <i class="ion-gear-a"></i> Edit Profile Settings
              </router-link>
            </div>
            <div v-else>
              <button
                class="btn btn-sm btn-secondary action-btn"
                v-if="profile.following"
                @click.prevent="unfollow();"
              >
                <i class="ion-plus-round"></i> &nbsp;Unfollow
                {{ profile.username }}
              </button>
              <button
                class="btn btn-sm btn-outline-secondary action-btn"
                v-if="!profile.following"
                @click.prevent="follow();"
              >
                <i class="ion-plus-round"></i> &nbsp;Follow
                {{ profile.username }}
              </button>
            </div> -->
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <!-- <li class="nav-item">
                <router-link
                  class="nav-link"
                  active-class="active"
                  exact
                  :to="{ name: 'profile' }"
                >
                  My Articles
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  active-class="active"
                  exact
                  :to="{ name: 'profile-favorites' }"
                >
                  Favorited Articles
                </router-link>
              </li> -->
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
          <!-- <router-view></router-view> -->

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  FETCH_PROFILE,
  FETCH_PROFILE_FOLLOW,
  FETCH_PROFILE_UNFOLLOW,
  CHARGE_MONEY_PROFILE,
  CHECK_AUTH
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
  mounted() {
    console.log("MONEY_",this.money, this.selected)
    console.log("PROFILE_",this.profile)
    //Promise.all([this.$store.dispatch(CHECK_AUTH)]);
    //this.$store.dispatch(FETCH_PROFILE, this.$route.params);
    
  },
  computed: {
    ...mapGetters(["currentUser", "profile", "isAuthenticated"])
  },
  methods: {
    changeSelect(event){
      console.log("changeSelect", event.target.value);
      this.selected = parseInt(event.target.value+"00");

    },
    // isCurrentUser() {
    //   if (this.currentUser.username && this.profile.username) {
    //     return this.currentUser.username === this.profile.username;
    //   }
    //   return false;
    // },
    // follow() {
    //   if (!this.isAuthenticated) return;
    //   this.$store.dispatch(FETCH_PROFILE_FOLLOW, this.$route.params);
    // },
    // unfollow() {
    //   this.$store.dispatch(FETCH_PROFILE_UNFOLLOW, this.$route.params);
    // },
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
  },
  watch: {
    $route(to) {
      //this.$store.dispatch(FETCH_PROFILE, to.params);
    }
  }
};
</script>
