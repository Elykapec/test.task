<template>
  <el-dialog :visible="true" @close="emitCLose">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane name="first">
        <span slot="label"><i class="el-icon-date"></i> Route</span>

        <el-form label-position="top" :model="formLabelAlign">
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
      <el-tab-pane name="second"><span slot="label"><i class="el-icon-date"></i> Route</span></el-tab-pane>
      <el-tab-pane name="third"><span slot="label"><i class="el-icon-date"></i> Route</span></el-tab-pane>
      <el-tab-pane name="fourth"><span slot="label"><i class="el-icon-date"></i> Route</span></el-tab-pane>
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

  formLabelAlign = {
    name: '',
    region: '',
    type: ''
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
