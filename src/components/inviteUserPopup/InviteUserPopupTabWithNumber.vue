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
        :class="$style.checkbox"
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
export default class InviteUserPopupTabWithNumber extends Vue {
  @Prop({ required: true }) private number!: number;
  @Prop({ required: true }) private title!: string;
  @Prop({ required: true }) private isDone!: boolean;
}
</script>

<style lang="scss" module>
.tab {
  color: #5E6A75 !important;
  height: 55px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  :global(.is-active) & {
    color: #415ADA !important;
  }
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

@keyframes bounceIn {
  0%   { transform: scale(0); }
  100% { transform: scale(1); }
}

.checkbox {
  animation-name: bounceIn;
  animation-timing-function: cubic-bezier(.47,1.64,.41,.8);
  animation-duration: 700ms;
  animation-iteration-count: initial;
}
</style>
