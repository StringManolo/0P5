<template>
  <div>
    <input type="text" v-model="searchTerm" placeholder="Enter your sesrch" />
    <button @click="submitSearch">Search</button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class SearchForm extends Vue {
  private searchTerm: string = '';

  private submitSearch() {
    alert(`You searched for: ${this.searchTerm} (not implemented yet`);
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";

.input {
  margin-bottom: 10px;
  border: 1px solid $primary-color;
}

.button {
  background-color: $primary-color;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}
</style>
