<template>
  <nav>
    <ul class="pagination">
      <li
        v-for="page in pages"
        :data-test="`page-link-${page}`"
        :key="page"
        :class="paginationClass(page)"
        @click.prevent="changePage(page);"
      >
        <a class="page-link" href v-text="page" />
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    pages: {
      type: Array,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  methods: {
    /**
     * @method changePage it serves to go changing of page every time that we click
     */
    changePage(goToPage) {
      if (goToPage === this.currentPage) return;
      this.$emit("update:currentPage", goToPage);
    },
    /**
     * @method paginationClass It serves to activate the CSS class, 
     * therefore it will mark a color to indicate us on the page that we are
     */
    paginationClass(page) {
      return {
        "page-item": true,
        active: this.currentPage === page
      };
    }
  }
};
</script>
