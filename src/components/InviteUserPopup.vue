<template>
  <el-dialog
    :visible="true"
    @close="emitCLose"
    :class="$style.popup"
    width="867px"
    title="Invite User"
    :lock-scroll="true"
  >
    <el-tabs v-model="activeTab">
      <el-tab-pane
        name="1"
        class="pt-3"
      >
        <template slot="label">
          <InviteUserPopupTabNumber
            :number="1"
            title="Main Info"
            :is-done="true"
          />
        </template>

        <el-form
          label-position="top"
          :model="formLabelAlign"
          :class="$style.popupStepOne"
        >
          <el-form-item label="First Name">
            <el-input v-model="formLabelAlign.name" />
          </el-form-item>
          <el-form-item label="Last Name">
            <el-input v-model="formLabelAlign.name" />
          </el-form-item>
          <el-form-item label="Email Address">
            <el-input v-model="formLabelAlign.region" />
          </el-form-item>
          <el-form-item label="Phone Number">
            <el-input v-model="formLabelAlign.region" />
          </el-form-item>
          <el-form-item label="Position">
            <el-input v-model="formLabelAlign.type" />
          </el-form-item>
          <el-form-item label="Available Companies">
            <el-input v-model="formLabelAlign.type" />
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane
        name="2"
        class="pt-3"
      >
        <template slot="label">
          <InviteUserPopupTabNumber
            :number="2"
            title="Test"
            :is-done="true"
          />
        </template>
      </el-tab-pane>
      <el-tab-pane
        name="3"
        class="pt-3"
      >
        <template slot="label">
          <InviteUserPopupTabNumber
            :number="3"
            title="Meks dod"
            :is-done="false"
          />
        </template>
      </el-tab-pane>
      <el-tab-pane
        name="4"
        class="pt-3"
      >
        <template slot="label">
          <InviteUserPopupTabNumber
            :number="4"
            title="Lorem ipsum dolor"
            :is-done="false"
          />
        </template>
      </el-tab-pane>
    </el-tabs>

    <template #footer>
      <div class="flex items-center justify-between">
        <el-switch
          v-model="value1"
          active-text="Pay by month"
        />
        <el-button round>
          Next step
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import InviteUserPopupTabNumber from '@/components/InviteUserPopupTabNumber.vue';

@Component({
  components: {
    InviteUserPopupTabNumber,
  },
})
export default class InviteUserPopup extends Vue {
  @Prop() private config!: string;

  @Emit('close') emitCLose() {
    return null;
  }


  activeTab: '1' | '2' | '3' | '4' = '1';

  formLabelAlign = {
    name: '',
    region: '',
    type: '',
  };
}
</script>

<style lang="scss" module>
.popup {
  :global(.el-dialog) {
    background: #FFFFFF;
    box-shadow: 0px 8px 16px rgba(54, 62, 113, 0.24);
    border-radius: 16px;
    padding: 18px 24px;
  }


  :global(.el-form--label-top .el-form-item__label) {
    float: left;
    line-height: 1em;
    padding-bottom: 4px;
  }

  :global(.el-form-item) {
    padding: 0;
    margin: 0;
  }
}

.popupStepOne {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
}
</style>
