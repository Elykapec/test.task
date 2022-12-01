<template>
  <div
    :class="$style.tableForm"
    v-if="formLocal"
  >
    <div class="flex flex-row justify-between">
      <table
        class="w-7/12"
        :class="$style.table"
      >
        <thead>
          <tr>
            <th
              class="text-left"
              style="width: 190px"
            >
              Access to:
            </th>
            <th
              v-for="a in AccessLevel"
              :key="a"
            >
              {{ translatePermission(a) }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="font-bold">
              All Below
            </td>
            <td
              v-for="(i, key) in formLocal.checkAllAccessLevel"
              :key="key"
              class="text-center"
            >
              <el-checkbox
                v-model="formLocal.checkAllAccessLevel[key]"
                @change="checked => grantAllRolesForAccessLevel(checked, key)"
              />
            </td>
          </tr>
          <tr
            v-for="(e, key) in formLocal.permissionRegular"
            :key="key"
          >
            <td :key="e + 'Title'">
              {{ translatePermission(key) }}
            </td>
            <td
              v-for="a in AccessLevel"
              :key="a"
              class="text-center"
            >
              <el-checkbox
                v-if="e[a] !== undefined"
                v-model="e[a]"
                @change="accessLevelCheckChange(a)"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div :class="$style.verticalDivider" />
      <table
        :class="$style.table"
        class="w-4/12"
      >
        <thead>
          <tr>
            <th>
              <div class="flex items-center flex-row">
                <span class="mr-2">
                  Management:
                </span>
                <el-tooltip content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam, voluptatem.">
                  <i class="el-icon-warning-outline" />
                </el-tooltip>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <el-checkbox
                :class="$style.managementCheckbox"
                v-model="formLocal.checkAllManagementPermissions"
                @change="checkAllManagementPermissionsChange"
              >
                All bellow
              </el-checkbox>
            </td>
          </tr>
          <tr>
            <td>
              <el-checkbox
                :class="$style.managementCheckbox"
                :disabled="formLocal.permissionsManagement.Admin"
                v-model="formLocal.permissionsManagement.Configuration"
                @change="managementCheckChange"
              >
                {{ translatePermission(EntitiesManagement.Configuration) }}
              </el-checkbox>
            </td>
          </tr>
          <tr>
            <td>
              <el-checkbox
                :class="$style.managementCheckbox"
                :disabled="formLocal.permissionsManagement.Admin"
                v-model="formLocal.permissionsManagement.SuppliersAndItems"
                @change="managementCheckChange"
              >
                {{ translatePermission(EntitiesManagement.SuppliersAndItems) }}
              </el-checkbox>
            </td>
          </tr>
          <tr>
            <td>
              <el-checkbox
                :class="$style.managementCheckbox"
                :disabled="formLocal.permissionsManagement.Admin"
                v-model="formLocal.permissionsManagement.Budgets"
                @change="managementCheckChange"
              >
                {{ translatePermission(EntitiesManagement.Budgets) }}
              </el-checkbox>
            </td>
          </tr>
          <tr>
            <td>
              <el-checkbox
                :class="$style.managementCheckbox"
                :disabled="formLocal.permissionsManagement.Admin"
                v-model="formLocal.permissionsManagement.WarehouseManager"
                @change="managementCheckChange"
              >
                {{ translatePermission(EntitiesManagement.WarehouseManager) }}
              </el-checkbox>
            </td>
          </tr>
          <tr>
            <td>
              <el-checkbox
                :class="$style.managementCheckbox"
                :disabled="formLocal.permissionsManagement.Admin"
                v-model="formLocal.permissionsManagement.Reports"
                @change="managementCheckChange"
              >
                {{ translatePermission(EntitiesManagement.Reports) }}
              </el-checkbox>
            </td>
          </tr>
          <tr><td>&nbsp;</td></tr>
          <tr>
            <td>
              <el-checkbox
                :class="$style.managementCheckbox"
                v-model="formLocal.permissionsManagement.Admin"
                @change="managementCheckChange"
              >
                {{ translatePermission(EntitiesManagement.Admin) }}

                <el-tooltip content="Lorem ipsum dolor sit amet, consectetur adipisicing elit.">
                  <i><img
                    src="../../assets/icons/warning.svg"
                    class="inline align-middle"
                  ></i>
                </el-tooltip>
              </el-checkbox>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <el-alert
      type="info"
      show-icon
      class="mt-6"
      :class="$style.bottomInfo"
      :closable="false"
    >
      <template #title>
        The user becomes a <a href="#">Power user</a> if at least ONE of the following roles is selected: <br>
        Approve, View only, Configuration, Suppliers and Items, Budgets, Warehouse manager.
      </template>
    </el-alert>
  </div>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue, Watch} from 'vue-property-decorator';
import ElSelectPatched from '@/components/element-custom/select.vue';
import ElSelect from '@/components/element-custom/select.vue';
import {AccessLevel, EntitiesManagement, EntitiesRegular} from '@/model/Persmissions';
import { cloneDeep } from 'lodash';
import translatePermission from '@/utils/translatePermission';

type PermissionRegular = Record<EntitiesRegular, Record<AccessLevel, boolean | undefined>>;
type PermissionManagement = Record<EntitiesManagement, boolean>;

export interface RolesFormInterface {
  permissionRegular: PermissionRegular,
  checkAllAccessLevel: Record<AccessLevel, boolean>,
  permissionsManagement: PermissionManagement,
  checkAllManagementPermissions: boolean,
}

export const getRolesForm: () => RolesFormInterface = () => {
  const permissionRegular: PermissionRegular = Object
    .keys(EntitiesRegular)
    .reduce((permissionsRegular, permissionKey) => {
      permissionsRegular[permissionKey as EntitiesRegular] = Object
        .keys(AccessLevel)
        .reduce((accessLevels, levelKey) => {
          const skipPayFor = [
            EntitiesRegular.WarehouseRequests,
            EntitiesRegular.PurchaseRequests,
            EntitiesRegular.RequestRorProposals,
            EntitiesRegular.PurchaseOrders,
            EntitiesRegular.Receipts,
          ];
          if (levelKey === AccessLevel.Pay && skipPayFor.includes(permissionKey as EntitiesRegular)) {
            return accessLevels;
          }
          accessLevels[levelKey as AccessLevel] = false;
          return accessLevels;
        }, {} as Record<AccessLevel, boolean | undefined>);

      return permissionsRegular;
    }, {} as PermissionRegular);

  const permissionsManagement: PermissionManagement = Object.fromEntries(
    Object.keys(EntitiesManagement).map((i) => [i as EntitiesManagement, false]),
  ) as PermissionManagement;

  return {
    checkAllManagementPermissions: false,
    permissionsManagement,

    permissionRegular,
    checkAllAccessLevel: Object
      .keys(AccessLevel)
      .reduce((acc, key) => {
        acc[key as AccessLevel] = false;
        return acc;
      }, {} as Record<AccessLevel, boolean>),
  };
};


@Component({
  components: {
    ElSelect,
    ElSelectPatched,
  },
})
export default class InviteUserPopupRolesForm extends Vue {
  @Prop() private readonly formDataInit!: RolesFormInterface;

  AccessLevel = AccessLevel;
  EntitiesRegular = EntitiesRegular;
  EntitiesManagement = EntitiesManagement;

  protected formLocal: RolesFormInterface|null = null;

  @Watch('formLocal', { deep: true })
  @Emit('update:form-data-init')
  onFormDataChange() {
    return this.formLocal;
  }

  protected mounted() {
    this.formLocal = cloneDeep(this.formDataInit);
  }

  protected translatePermission(s: AccessLevel|EntitiesRegular|EntitiesManagement|string) {
    return translatePermission(s);
  }

  protected accessLevelCheckChange(key: AccessLevel) {
    if (!this.formLocal) return;

    this.formLocal.checkAllAccessLevel[key] = Object
      .values(this.formLocal.permissionRegular)
      .every(i => i[key] || i[key] === undefined);
  }

  protected grantAllRolesForAccessLevel(isChecked: boolean, key: AccessLevel) {
    if (!this.formLocal) return;

    Object
      .values(this.formLocal.permissionRegular)
      .forEach((i) => {
        if (key in i) i[key] = isChecked;
      });
  }

  protected checkAllManagementPermissionsChange(isChecked: boolean) {
    if (!this.formLocal) return;

    Object
      .values(EntitiesManagement)
      .forEach((i) => {
        if (i === EntitiesManagement.Admin) return;
        this.formLocal!.permissionsManagement[i as EntitiesManagement] = isChecked;
      });
  }

  protected managementCheckChange() {
    if (!this.formLocal) return;

    this.formLocal.checkAllManagementPermissions = Object
      .values(EntitiesManagement)
      .every(i => this.formLocal!.permissionsManagement[i as EntitiesManagement] || i === EntitiesManagement.Admin);
  }
}
</script>

<style lang="scss" module>
.tableForm {

}

.table {
  tr th {
    padding: 12px 2px;
    vertical-align: middle;
  }

  tr td {
    padding: 6px 2px;
    vertical-align: middle;
  }

  thead {
    font-weight: 600;
    font-size: 16px;
    line-height: 32px;
    color: #676F8F;
  }
  tbody {
    font-weight: 500;
    font-size: 16px;
    line-height: 144%;
    color: #1D2452;
    :global(.el-checkbox__label) {
      font-weight: 500;
      font-size: 16px;
      line-height: 144%;
      color: #1D2452;
    }
  }
}

.managementCheckbox {
  :global(.el-checkbox__label) {
    padding-left: 16px !important;
  }
}

.verticalDivider {
  content: '';
  border-right: 1px solid #DDDEE5;
}
</style>
