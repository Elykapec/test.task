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
      <!----------- FIRST TAB FORM ------------------->

      <el-tab-pane
        name="1"
        class="pt-3"
      >
        <template slot="label">
          <InviteUserPopupTabNumber
            :number="tabs.first.num"
            :title="tabs.first.title"
            :is-done="tabs.first.isDone"
          />
        </template>

        <InviteUserPopupMainInfoForm
          ref="firstTabMainInfo"
          :form-data-init.sync="tabs.first.form"
        />
      </el-tab-pane>

      <!----------- SECOND TAB FORM ------------------->
      <el-tab-pane
        name="2"
        class="pt-3"
      >
        <template slot="label">
          <InviteUserPopupTabNumber
            :number="tabs.second.num"
            :title="tabs.second.title"
            :is-done="tabs.second.isDone"
          />
        </template>

        <InviteUserPopupCollapse
          :steps="collapsibleListSecondTab"
        >
          <template :slot="Departments.precoro">
            <InviteUserPopupAvailableLocationsForm
              ref="availableLocationPrecoro"
              :form-data-init.sync="tabs.second.form[Departments.precoro]"
            />
          </template>
          <template :slot="Departments.precoroDevelopment">
            <InviteUserPopupAvailableLocationsForm
              ref="availableLocationPrecoroDevelopment"
              :form-data-init.sync="tabs.second.form[Departments.precoroDevelopment]"
            />
          </template>
          <template :slot="Departments.procurement">
            <InviteUserPopupAvailableLocationsForm
              ref="availableLocationProcurement"
              :form-data-init.sync="tabs.second.form[Departments.procurement]"
            />
          </template>
        </InviteUserPopupCollapse>
      </el-tab-pane>


      <!----------- THIRD TAB FORM ------------------->

      <el-tab-pane
        name="3"
        class="pt-3"
      >
        <template slot="label">
          <InviteUserPopupTabNumber
            :number="tabs.third.num"
            :title="tabs.third.title"
            :is-done="tabs.third.isDone"
          />
        </template>
        <InviteUserPopupCollapse
          :steps="collapsibleListThirdTab"
        >
          <template :slot="Departments.precoro">
            <InviteUserPopupAvailableDocumentsForm
              ref="availableLocationPrecoro"
              :form-data-init.sync="tabs.third.form[Departments.precoro]"
            />
          </template>
          <template :slot="Departments.precoroDevelopment">
            <InviteUserPopupAvailableDocumentsForm
              ref="availableLocationPrecoroDevelopment"
              :form-data-init.sync="tabs.third.form[Departments.precoroDevelopment]"
            />
          </template>
          <template :slot="Departments.procurement">
            <InviteUserPopupAvailableDocumentsForm
              ref="availableLocationProcurement"
              :form-data-init.sync="tabs.third.form[Departments.procurement]"
            />
          </template>
        </InviteUserPopupCollapse>
      </el-tab-pane>


      <!----------- FOURTH TAB FORM ------------------->
      <el-tab-pane
        name="4"
        class="pt-3"
      >
        <template slot="label">
          <InviteUserPopupTabNumber
            :number="tabs.third.num"
            :title="tabs.fourth.title"
            :is-done="tabs.fourth.isDone"
          />
        </template>
      </el-tab-pane>
    </el-tabs>


    <template #footer>
      <hr
        class="light-divider"
        :class="$style.footerLine"
      >
      <div
        class="flex items-center"
        :class="{ 'justify-between': isFirstTab, 'justify-end': !isFirstTab }"
      >
        <div
          v-if="isFirstTab"
          class="flex items-center"
        >
          <el-switch
            v-model="tabs.first.form.activeInAllCompanies"
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
          :key="activeTab"
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
import InviteUserPopupTabNumber from '@/components/inviteUserPopup/InviteUserPopupTabNumber.vue';
import {ElForm} from 'element-ui/types/form';
import ElSelectPatched from '@/components/element-custom/select.vue';
import ElSelect from '@/components/element-custom/select.vue';
import InviteUserPopupCollapseTitle from '@/components/inviteUserPopup/InviteUserPopupCollapseTitle.vue';
import InviteUserPopupCollapse, {InviteUserPopupCollapseStep} from '@/components/inviteUserPopup/InviteUserPopupCollapse.vue';
import Departments from '@/model/Departments';
import InviteUserPopupMainInfoForm from '@/components/inviteUserPopup/InviteUserPopupMainInfoForm.vue';
import {MainInfoFormInterface} from '@/components/inviteUserPopup/InviteUserPopupMainInfoForm.vue';
import locations from '@/mocks/locationsList';
import InviteUserPopupAvailableLocationsForm, {
  AvailableLocationInterface,
} from '@/components/inviteUserPopup/InviteUserPopupAvailableLocationsForm.vue';
import InviteUserPopupAvailableDocumentsForm, {
  AvailableDocumentsInterface,
} from '@/components/inviteUserPopup/InviteUserPopupAvailableDocumentsForm.vue';

enum TabSteps {
  'step1' = '1',
  'step2' = '2',
  'step3' = '3',
  'step4' = '4',
}

type DepartmentsForm<T> = Record<Departments, T>;

@Component({
  components: {
    ElSelect,
    InviteUserPopupTabNumber,
    InviteUserPopupCollapseTitle,
    ElSelectPatched,
    InviteUserPopupCollapse,
    InviteUserPopupMainInfoForm,
    InviteUserPopupAvailableLocationsForm,
    InviteUserPopupAvailableDocumentsForm,
  },
})
export default class InviteUserPopup extends Vue {
  @Ref('formStepOne') formStepOne!: ElForm;
  @Ref('firstTabMainInfo') firstTabMainInfo!: InviteUserPopupMainInfoForm;
  @Ref('availableLocationPrecoro') availableLocationPrecoroFrom!: InviteUserPopupAvailableLocationsForm;
  @Ref('availableLocationPrecoroDevelopment') availableLocationPrecoroDevelopmentFrom!: InviteUserPopupAvailableLocationsForm;
  @Ref('availableLocationProcurement') availableLocationProcurementFrom!: InviteUserPopupAvailableLocationsForm;

  @Prop() private config!: string;

  @Emit('close') emitCLose() {
    return null;
  }

  Departments = Departments;

  activeTab: TabSteps = TabSteps.step1;

  tabs = {
    first: {
      num: 1,
      isDone: false,
      title: 'Main Info',
      form: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        position: '',
        availableCompanies: [],
        activeInAllCompanies: true,
      } as MainInfoFormInterface,
    },
    second: {
      num: 2,
      isDone: false,
      title: 'Available Locations',
      locations:  locations,
      form: {
        [Departments.precoro]: {
          mainLocation: locations[0],
          selectedLocations: [] as string[],
          selectAllLocation: false,
          selectAllLocationIndeterminate: false,
        },
        [Departments.precoroDevelopment]: {
          mainLocation: locations[0],
          selectedLocations: [] as string[],
          selectAllLocation: false,
          selectAllLocationIndeterminate: false,
        },
        [Departments.procurement]: {
          mainLocation: locations[0],
          selectedLocations: [] as string[],
          selectAllLocation: false,
          selectAllLocationIndeterminate: false,
        },
      } as DepartmentsForm<AvailableLocationInterface>,
    },
    third: {
      num: 3,
      isDone: false,
      title: 'Available Documents Custom Fields',
      form: {
        [Departments.precoro]: {
          classes: [],
          department: [],
          dcf3: [],
          selectAllDocumentsCustomFields: false,
          checkAllClasses: false,
          checkAllDepartment: false,
          checkAllDCF3: false,
        },
        [Departments.precoroDevelopment]: {
          classes: [],
          department: [],
          dcf3: [],
          selectAllDocumentsCustomFields: false,
          checkAllClasses: false,
          checkAllDepartment: false,
          checkAllDCF3: false,
        },
        [Departments.procurement]: {
          classes: [],
          department: [],
          dcf3: [],
          selectAllDocumentsCustomFields: false,
          checkAllClasses: false,
          checkAllDepartment: false,
          checkAllDCF3: false,
        },
      } as DepartmentsForm<AvailableDocumentsInterface>,
    },
    fourth: {
      num: 4,
      isDone: false,
      title: 'Roles',
      form: {
        [Departments.precoro]: {
          selectAllDocumentsCustomFields: false,
        },
        [Departments.precoroDevelopment]: {
          selectAllDocumentsCustomFields: false,
        },
        [Departments.procurement]: {
          selectAllDocumentsCustomFields: false,
        },
      } as DepartmentsForm<AvailableDocumentsInterface>,
    },
  };

  get isFirstTab() {
    return this.activeTab === TabSteps.step1;
}

  get collapsibleListSecondTab(): InviteUserPopupCollapseStep[] {
    return [
      {
        title: 'Precoro',
        slotName: Departments.precoro,
        additionalInfo: 'Selected ' + this.tabs.second.form[Departments.precoro].selectedLocations.length,
      },
      {
        title: 'Precoro Development',
        slotName: Departments.precoroDevelopment,
        additionalInfo: 'Selected ' + this.tabs.second.form[Departments.precoroDevelopment].selectedLocations.length,
      },
      {
        title: 'Procurement',
        slotName: Departments.procurement,
        additionalInfo: 'Selected ' + this.tabs.second.form[Departments.procurement].selectedLocations.length,
      },
    ];
  }

  get collapsibleListThirdTab(): InviteUserPopupCollapseStep[] {
    return [
      {
        title: 'Precoro',
        slotName: Departments.precoro,
        additionalInfo: 'Selected ' +
          (this.tabs.third.form[Departments.precoro].classes.length +
          this.tabs.third.form[Departments.precoro].department.length +
          this.tabs.third.form[Departments.precoro].dcf3.length),
      },
      {
        title: 'Precoro Development',
        slotName: Departments.precoroDevelopment,
        additionalInfo: 'Selected ' +
          (this.tabs.third.form[Departments.precoroDevelopment].classes.length +
          this.tabs.third.form[Departments.precoroDevelopment].department.length +
          this.tabs.third.form[Departments.precoroDevelopment].dcf3.length),
      },
      {
        title: 'Procurement',
        slotName: Departments.procurement,
        additionalInfo: 'Selected ' +
          (this.tabs.third.form[Departments.procurement].classes.length +
          this.tabs.third.form[Departments.procurement].department.length +
          this.tabs.third.form[Departments.procurement].dcf3.length),
      },
    ];
  }

  toNextStep() {
    const steps: TabSteps[] = [
      TabSteps.step1,
      TabSteps.step2,
      TabSteps.step3,
      TabSteps.step4,
    ];
    const currentIdx = steps.indexOf(this.activeTab);
    this.activeTab = steps[currentIdx + 1] || TabSteps.step4;
    for (const tab of Object.values(this.tabs)) {
      if (tab.num <= currentIdx + 1) {
        tab.isDone = true;
      }
    }
  }
}
</script>

<style lang="scss" module>
.popup {
  //@todo inner code below should be moved to a separate scss file/s
  :global(.el-dialog) {
    background: #FFFFFF;
    box-shadow: 0 8px 16px rgba(54, 62, 113, 0.24);
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

  :global(.el-checkbox__inner) {
    width: 18px;
    height: 18px;
    border-radius: 4px;
  }

  :global(.el-checkbox__inner)::after {
    height: 8px;
    left: 6px;
    top: 2px;
    width: 4px;
  }
  :global(.el-checkbox__input.is-indeterminate .el-checkbox__inner::before) {
    content: "";
    position: absolute;
    display: block;
    background-color: #fff;
    height: 2px;
    transform: scale(0.5);
    left: 0;
    right: 0;
    top: 7px;
  }

  :global(.el-checkbox__label) {
    display: inline-block;
    padding-left: 10px;
    line-height: 19px;
    font-size: 14px;
    color: #1D2452;
  }
}

$dialogMarginFix: -44px;

.tabFullWidthLine {
  :global(.el-tabs__nav-wrap::after) {
    content: "";
    position: absolute !important;
    left: $dialogMarginFix !important;
    right: $dialogMarginFix !important;
    bottom: 0;
    top: 38px;
    width: auto !important;
    height: 2px;
    background-color: #000000;
    opacity: 0.1;
    z-index: 1;
  }


  :global(.el-tabs__nav-scroll),:global(.el-tabs__nav-wrap) {
    overflow: visible !important;
  }

  :global(.el-tabs__header) {
    flex-direction: column !important;
    display: flex !important;
  }
}

.footerLine {
  margin: 20px $dialogMarginFix;
}
</style>
