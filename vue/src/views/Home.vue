<template>
  <section class="container-home">content home</section>
</template>

<script>
import { mapGetters } from "vuex";
import RwvTag from "@/components/VTag";
import { GET_LAWYERS } from "@/store/actions.type";

export default {
  name: "home",
  components: {
    RwvTag
  },
  mounted() {
    console.log("HOME", this.$store);
    this.$store.dispatch(GET_LAWYERS);
  },
  computed: {
    ...mapGetters(["isAuthenticated", "tags"]),
    tag() {
      return this.$route.params.tag;
    }
  }
};
</script>
