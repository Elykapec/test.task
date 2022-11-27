<template>
  <div
    id="app"
  >
    <div class="w-screen h-screen flex items-center justify-center">
      <el-button
        type="primary"
        round
        @click="showInviteUserPopup = true"
        size="large"
      >
        Invite new user
      </el-button>
    </div>


    <InviteUserPopup
      v-if="showInviteUserPopup"
      @close="showInviteUserPopup = false"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import InviteUserPopup from './components/inviteUserPopup/InviteUserPopup.vue';

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
