<template>
  <el-collapse
    v-model="activeCollapse"
    accordion
  >
    <el-collapse-item
      v-for="s in steps"
      :name="s.slotName"
      :key="s.title"
    >
      <template slot="title">
        <InviteUserPopupCollapseTitle
          :title="s.title"
          :sub-title="s.additionalInfo"
          class="mr-4"
        />
      </template>
      <slot :name="s.slotName" />
    </el-collapse-item>
  </el-collapse>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import InviteUserPopupTabNumber from '@/components/inviteUserPopup/InviteUserPopupTabNumber.vue';
import InviteUserPopupCollapseTitle from '@/components/inviteUserPopup/InviteUserPopupCollapseTitle.vue';
import Departments from '@/model/Departments';

export interface InviteUserPopupCollapseStep {
  title: string,
  additionalInfo: string,
  slotName: Departments,
}

@Component({
  components: {
    InviteUserPopupTabNumber,
    InviteUserPopupCollapseTitle,
  },
})
export default class InviteUserPopupCollapse extends Vue {
  @Prop({ required: true, type: Array }) private steps!: InviteUserPopupCollapseStep[];

  activeCollapse: null|string = null;
}
</script>

<style lang="scss" module>
</style>
