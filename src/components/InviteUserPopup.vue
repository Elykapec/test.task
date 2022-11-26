<template>
  <el-dialog
    :visible="true"
    @close="emitCLose"
    :class="$style.popup"
    width="867px"
    title="Invite User"
    :lock-scroll="true"
  >
    <el-tabs
      v-model="activeTab"
      :class="$style.tabFullWidthLine"
    >
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
          ref="formStepOne"
          label-position="top"
          :model="formStepOneData"
          :class="$style.popupStepOne"
        >
          <el-form-item label="First Name">
            <el-input
              v-model="formStepOneData.firstName"
              name="firstName"
            />
          </el-form-item>
          <el-form-item label="Last Name">
            <el-input
              v-model="formStepOneData.lastName"
              name="lastName"
            />
          </el-form-item>
          <el-form-item
            label="Email Address"
            name="email"
          >
            <el-input
              v-model="formStepOneData.email"
              type="email"
            />
          </el-form-item>
          <el-form-item label="Phone Number">
            <el-input
              v-model="formStepOneData.phoneNumber"
              name="phone"
            />
          </el-form-item>
          <el-form-item label="Position">
            <el-input
              v-model="formStepOneData.position"
              name="position"
            />
          </el-form-item>
          <el-form-item label="Available Companies">
            <ElSelectCustom
              v-model="formStepOneData.availableCompanies"
              :collapse-limit="2"
              name="companies"
              multiple
              collapse-tags
              value-key="id"
              placeholder=" "
              class="w-full"
              clearable
              filterable
            >
              <el-option
                v-for="opt in availableCompaniesOptions"
                :key="opt.id"
                :value="opt.id"
                :label="opt.name"
              />
            </ElSelectCustom>
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
            title="Available Locations"
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
            title="Available Documents Custom Fields"
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
            title="Roles"
            :is-done="false"
          />
        </template>
      </el-tab-pane>
    </el-tabs>

    <template #footer>
      <hr
        class="light-divider"
        :class="$style.footerLine"
      >
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <el-switch
            v-model="formStepOneData.activeInAllCompanies"
            active-text="Active in all companies"
          />
          <el-tooltip
            class="item"
            effect="dark"
            content="Some additional info goes here! Be careful!"
            placement="top-start"
          >
            <i class="el-icon-warning-outline icon-light text-2xl ml-3" />
          </el-tooltip>
        </div>

        <el-button
          @click="toNextStep"
          round
        >
          Next step
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import {Component, Emit, Prop, Ref, Vue} from 'vue-property-decorator';
import InviteUserPopupTabNumber from '@/components/InviteUserPopupTabNumber.vue';
import {ElForm} from 'element-ui/types/form';
import {ElSelect} from 'element-ui/types/select';
// This is fixed selector that allows you to display more than one tag before collapse
// https://element.eleme.io/#/en-US/component/select#create-new-items
import ElSelectCustom from '@/components/element-custom/select.vue';

enum TabSteps {
  'step1' = '1',
  'step2' = '2',
  'step3' = '3',
  'step4' = '4',
}

@Component({
  components: {
    InviteUserPopupTabNumber,
    ElSelectCustom,
  },
})
export default class InviteUserPopup extends Vue {
  @Ref('formStepOne') formStepOne!: ElForm;

  @Prop() private config!: string;

  @Emit('close') emitCLose() {
    return null;
  }


  activeTab: TabSteps = TabSteps.step1;

  formStepOneData = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    position: '',
    availableCompanies: [],
    activeInAllCompanies: true,
  };

  availableCompaniesOptions = [
    { id: 1, name: 'Precoro'},
    { id: 2, name: 'Precoro Development'},
    { id: 3, name: 'ABC Inc.'},
    { id: 4, name: 'Microsoft'},
  ];

  toNextStep() {
    const steps: TabSteps[] = [
      TabSteps.step1,
      TabSteps.step2,
      TabSteps.step3,
      TabSteps.step4,
    ];
    const idx = steps.indexOf(this.activeTab) + 1;
    this.activeTab = steps[idx] || TabSteps.step4;
  }
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

$dialogMarginFix: -44px;

.tabFullWidthLine {
  :global(.el-tabs__nav-wrap::after) {
    content: "";
    position: absolute;
    left: $dialogMarginFix !important;
    right: $dialogMarginFix !important;
    bottom: 0;
    top: 38px;
    width: auto !important;
    height: 2px;
    background-color: #e4e7ed;
    z-index: 1;
  }


  :global(.el-tabs__nav-scroll),:global(.el-tabs__nav-wrap) {
    overflow: visible !important;
  }

  :global(.el-tabs__header) {
    flex-direction: column;
    display: flex;
  }
}

.footerLine {
  margin: 20px $dialogMarginFix;
}
</style>
