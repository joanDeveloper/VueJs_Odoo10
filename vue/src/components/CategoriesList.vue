<template>
  <div class="article-preview">
    <div v-for="(categories, index) in categories" :key="index">
      <router-link
        :to="{ name: 'listItems', params: { categories: categories.name } }"
      >{{categories.description}}</router-link>
    </div>
  </div>
</template>

<script>
// import RwvArticleMeta from "./ArticleMeta";
// import TagList from "./TagList";

export default {
  name: "CategoriesList",
  mounted() {
    console.log("CategoriesList");
  },
  props: {
    // article: { type: Object, required: true }
  },
  computed: {}
};
</script>
