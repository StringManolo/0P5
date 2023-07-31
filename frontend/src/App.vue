<template>
  <div id="app">
    <SearchForm />

    <SettingsMenu />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import SearchForm from "./components/SearchForm.vue";
import SettingsMenu from "./components/SettingsMenu.vue";

@Component({
  components:
  {
    SearchForm,
    SettingsMenu,
  },
});

export default class App extends Vue {}
</script>
