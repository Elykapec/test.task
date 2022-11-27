<template>
  <div class="flex justify-between items-center w-full">
    <span :class="$style.title">{{ title }}</span>
    <span :class="$style.subTitle">{{ subTitle }}</span>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class InviteUserPopupCollapseTitle extends Vue {
  @Prop() private title!: string;
  @Prop() private subTitle!: string;
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
