<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" :to="{ name: 'home' }">
        <img src="img/logotipo/logotip.png" alt="logotipo">
      </router-link>
      <ul v-if="!isAuthenticated" class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'home' }"
          >
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'login' }"
          >
            <i class="ion-compose"></i>Sign in
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'register' }"
          >
            <i class="ion-compose"></i>Sign up
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'foro' }"
          >
            <i class="ion-compose"></i>Foro
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'contact' }"
          >
            <i class="ion-compose"></i>Contact
          </router-link>
        </li>

      </ul>
      <ul v-else class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'home' }"
          >
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'settings' }"
          >
            <i class="ion-gear-a"></i>&nbsp;Settings
          </router-link>
        </li>
        
        <li class="nav-item" v-if="currentUser.email">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{
              name: 'profile',
              params: { username: currentUser.email }
            }"
          >
            <span v-if="currentUser.nombre">{{ currentUser.nombre }}</span>
            <span v-else>{{ currentUser.email }}</span>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'foro' }"
          >
            <i class="ion-compose"></i>Foro
          </router-link>
        </li>
        
        <li class="nav-item">
          <router-link
            class="nav-link"
            active-class="active"
            exact
            :to="{ name: 'contact' }"
          >
            <i class="ion-compose"></i>Contact
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  
  name: "RwvHeader",
  computed: {
    ...mapGetters(["currentUser", "isAuthenticated"])
  }
};
</script>
