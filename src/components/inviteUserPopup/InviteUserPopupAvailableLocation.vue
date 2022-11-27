<template>
  <el-form
    v-model="formLocal"
    label-position="top"
    class="flex flex-col gap-5"
  >
    <el-form-item
      label="Main Location"
      required
      class="w-5/12"
    >
      <el-select
        v-model="formLocal.mainLocation"
        placeholder=" "
        @change="onSelectMainLocation"
        value-key="id"
        class="w-full"
      >
        <el-option
          v-for="loc in locations"
          :key="loc.id"
          :label="loc.title"
          :value="loc"
        />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-checkbox
        @change="onCheckAllLocations"
        v-model="formLocal.selectAllLocation"
        :indeterminate="formLocal.selectAllLocationIndeterminate"
      >
        Select All Locations
      </el-checkbox>
    </el-form-item>

    <el-form-item label="Available locations">
      <div class="w-6/12">
        <el-checkbox-group
          @change="onSelectSubLocation"
          v-model="formLocal.selectedLocations"
          value-key="id"
          class="grid grid-cols-2 w-full"
        >
          <el-checkbox
            v-for="loc in formLocal.mainLocation.locations"
            :label="loc.title"
            :key="loc.id"
            :value="loc.title"
          />
        </el-checkbox-group>
      </div>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue, Watch} from 'vue-property-decorator';
import ElSelectPatched from '@/components/element-custom/select.vue';
import ElSelect from '@/components/element-custom/select.vue';
import {cloneDeep} from 'lodash';
import Location from '@/model/Location';
import locations from '@/mocks/locationsList';


export interface AvailableLocationInterface {
  mainLocation: Location,
  selectedLocations: string[],
  selectAllLocation: boolean,
  selectAllLocationIndeterminate: boolean,
}

@Component({
  components: {
    ElSelect,
    ElSelectPatched,
  },
})
export default class InviteUserPopupAvailableLocation extends Vue {
  @Prop() private readonly formDataInit!: AvailableLocationInterface;
  protected locations = locations;

  protected formLocal: AvailableLocationInterface = {
    mainLocation: locations[0],
    selectedLocations: [] as string[],
    selectAllLocation: false,
    selectAllLocationIndeterminate: false,
  };

  @Watch('formLocal', { deep: true })
  @Emit('update:form-data-init')
  onFormDataChange() {
    return this.formLocal;
  }

  protected mounted() {
    this.formLocal = cloneDeep(this.formDataInit);
  }

  protected onSelectMainLocation() {
    this.formLocal.selectedLocations = [];
  }

  protected onCheckAllLocations() {
    if (!this.formLocal.selectAllLocation) {
      this.formLocal.selectedLocations = [];
    } else {
      this.formLocal.selectedLocations =
        this.formLocal.mainLocation.locations.map(i => i.title);
    }
  }

  protected onSelectSubLocation() {
    this.formLocal.selectAllLocationIndeterminate =
      this.formLocal.selectedLocations.length !==
      this.formLocal.mainLocation.locations.length;

    if (!this.formLocal.selectAllLocationIndeterminate) {
      this.formLocal.selectAllLocation = true;
    }
  }
}
</script>

<style lang="scss" module>

</style>
