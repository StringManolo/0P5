<template>
  <div id="app">
    <SearchForm />
    <SettingsMenu />
  </div>
</template>

<script lang="ts">
import { defineComponent} from 'vue';
import SearchForm from "./components/SearchForm.vue";
import SettingsMenu from "./components/SettingsMenu.vue";

export default defineComponent({
  components: {
    SearchForm,
    SettingsMenu 
  },
});
</script>
