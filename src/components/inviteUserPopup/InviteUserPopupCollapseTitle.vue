<template>
  <div class="flex justify-between items-center w-full">
    <span :class="$style.title">{{ title }}</span>
    <el-tooltip
      v-if="trimSubtitle"
      :content="subTitle"
    >
      <span :class="$style.subTitle">{{ subTitleTrimmed }}</span>
    </el-tooltip>
    <span
      v-else
      :class="$style.subTitle"
    >{{ subTitleTrimmed }}</span>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

const subTitleLimit = 50;

@Component
export default class InviteUserPopupCollapseTitle extends Vue {
  @Prop() private title!: string;
  @Prop() private subTitle!: string;

  get trimSubtitle(): boolean {
    return this.subTitle.length > subTitleLimit;
  }

  get subTitleTrimmed(): string {
    return this.trimSubtitle ? this.subTitle.substring(0, subTitleLimit - 3).trim() + '...' : this.subTitle;
  }
}
</script>

<style lang="scss" module>
@import "@/styles/element/_variables";

.title {
  font-weight: 600;
  font-size: 18px;
  line-height: 144%;
  color: $textColor;
}

.subTitle {
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  color: $textColor;
  opacity: 0.4;
}
</style>
