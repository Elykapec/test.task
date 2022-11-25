<template>
  <div id="app">
    <img
      alt="Vue logo"
      src="./assets/logo.png"
    >
    <InviteUserPopup
      v-if="showInviteUserPopup"
      @close="showInviteUserPopup = false"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import InviteUserPopup from './components/InviteUserPopup.vue';

@Component({
  components: {
    InviteUserPopup,
  },
})
export default class App extends Vue {
  showInviteUserPopup = true;
}
</script>

<style lang="scss">
</style>
