<template>
  <el-dialog :visible="true" @close="emitCLose" :class="$style.popup">
    <el-tabs v-model="activeTab">
      <el-tab-pane :name="1">
        <span slot="label"><div :class="$style.tab"><span :class="$style.tabNumber">1</span> Main Info</div></span>

        <el-form label-position="top" :model="formLabelAlign" :class="$style.popupStepOne">
          <el-form-item label="Name">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="Activity zone">
            <el-input v-model="formLabelAlign.region"></el-input>
          </el-form-item>
          <el-form-item label="Activity form">
            <el-input v-model="formLabelAlign.type"></el-input>
          </el-form-item>
          <el-form-item label="Name">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="Activity zone">
            <el-input v-model="formLabelAlign.region"></el-input>
          </el-form-item>
          <el-form-item label="Activity form">
            <el-input v-model="formLabelAlign.type"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <el-tab-pane :name="2">
        <span slot="label"><div :class="$style.tab"><span :class="$style.tabNumber">2</span> Main Info</div></span>
      </el-tab-pane>
      <el-tab-pane :name="3">
        <span slot="label"><div :class="$style.tab"><span :class="$style.tabNumber">3</span> Main Info</div></span>
      </el-tab-pane>
      <el-tab-pane :name="4">
        <span slot="label"><div :class="$style.tab"><span :class="$style.tabNumber">4</span> Main Info</div></span>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'

@Component
export default class InviteUserPopup extends Vue {
  @Prop() private config!: string

  @Emit('close') emitCLose () {
    return null
  }

  activeTab: 1|2|3|4 = 1;

  formLabelAlign = {
    name: '',
    region: '',
    type: ''
  }
}
</script>

<style lang="scss" module>
.popup {
  :global(.el-form--label-top .el-form-item__label) {
    float: left;
    line-height: 1em;
    padding-bottom: 4px;
  }
}

.tabNumber {
  display: inline-block;
  padding: 0;
  line-height: 30px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: transparentize(#5E6A75, 0.95);
  border: 1px solid transparentize(#5E6A75, 0.95);
  color: #5E6A75;
  font-weight: bold;

  :global(.el-tabs__item.is-active) & {
    background: rgba(65, 90, 218, 0.05);
    color: #415ADA;
  }
}

.popupStepOne {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
}
</style>
