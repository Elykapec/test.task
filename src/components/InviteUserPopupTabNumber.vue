<template>
  <div
    :class="{
      [$style.tab]: true,
      [$style.checked]: isDone
    }"
  >
    <span
      :class="$style.tabNumber"
      class="mr-2"
    >
      <svg
        v-if="isDone"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.40039 7.19998L4.80039 9.59998L10.8004 3.59998"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <span v-else>{{ number }}</span>
    </span>
    {{ title }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class InviteUserPopupTabNumber extends Vue {
  @Prop({ required: true }) private number!: number;
  @Prop({ required: true }) private title!: string;
  @Prop({ required: true }) private isDone!: boolean;
}
</script>

<style lang="scss" module>
.tab {
  color: #5E6A75;
}

.tabNumber {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  line-height: 30px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: transparentize(#5E6A75, 0.95);
  border: 1px solid transparentize(#5E6A75, 0.95);
  color: #5E6A75;
  font-weight: bold;
  &.done {
    background: #415ADA;
  }
}

.checked {
  color: rgb(142 145 168);

  .tabNumber {
    background: #415ADA;
  }
}

:global(.el-tabs__item.is-active) .tab {
  color: #415ADA;
  .tabNumber {
    color: #415ADA !important;
  }
}
</style>
