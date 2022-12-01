<template>
  <el-form
    v-if="formLocal"
    label-position="top"
    :model="formLocal"
    :class="$style.grid"
    class="pt-5"
  >
    <el-form-item label="First Name">
      <el-input
        v-model="formLocal.firstName"
        name="firstName"
      />
    </el-form-item>
    <el-form-item label="Last Name">
      <el-input
        v-model="formLocal.lastName"
        name="lastName"
      />
    </el-form-item>
    <el-form-item
      label="Email Address"
      name="email"
    >
      <el-input
        v-model="formLocal.email"
        type="email"
      />
    </el-form-item>
    <el-form-item label="Phone Number">
      <el-input
        v-model="formLocal.phoneNumber"
        name="phone"
      />
    </el-form-item>
    <el-form-item label="Position">
      <el-input
        v-model="formLocal.position"
        name="position"
      />
    </el-form-item>
    <el-form-item label="Available Companies">
      <ElSelectPatched
        v-model="formLocal.availableCompanies"
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
      </ElSelectPatched>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue, Watch} from 'vue-property-decorator';
import ElSelectPatched from '@/components/element-custom/select.vue';
import ElSelect from '@/components/element-custom/select.vue';
import {cloneDeep} from 'lodash';


export interface MainInfoFormInterface {
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  position: string,
  availableCompanies: string[],
  activeInAllCompanies: true,
}

@Component({
  components: {
    ElSelect,
    ElSelectPatched,
  },
})
export default class InviteUserPopupMainInfoForm extends Vue {
  @Prop() private readonly formDataInit!: MainInfoFormInterface;

  protected formLocal: MainInfoFormInterface|null = null;

  protected availableCompaniesOptions = [
    { id: 1, name: 'Precoro'},
    { id: 2, name: 'Precoro Development'},
    { id: 3, name: 'ABC Inc.'},
    { id: 4, name: 'Microsoft'},
  ];

  protected mounted() {
    this.formLocal = cloneDeep(this.formDataInit);
  }

  @Watch('formLocal', { deep: true })
  @Emit('update:form-data-init')
  onFormDataChange() {
    return this.formLocal;
  }
}
</script>

<style lang="scss" module>
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
}
</style>
