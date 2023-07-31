<template>
  <div class="settings-menu">
    <button class="settings-button" @click="toggleMenu">⚙️</button>
    <div class="slide-menu" v-if="showMenu">
      wikipedia checkbox 
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class SettingMenu extends Vue {
  showMenu: boolean = false;
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
}

<style lang="scss" scoped>
@import '../styles/variables.scss';

.settings-menu {
  position: relative;
  display: inline-block;
}

.settings-button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

.slide-menu {
  position: absolute;
  top: 0;
  right: 0;
  background-color: $primary-color;
  border: 1px solid #ccc;
  display: block;
  padding: 10px;
}
</style>
