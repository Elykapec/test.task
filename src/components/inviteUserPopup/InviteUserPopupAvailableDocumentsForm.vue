<template>
  <el-form
    v-if="formLocal"
    v-model="formLocal"
    label-position="top"
    class="flex flex-col gap-5"
  >
    <el-form-item>
      <el-checkbox
        v-model="formLocal.selectAllDocumentsCustomFields"
        @change="selectAllDocumentsCustomFields"
      >
        Select All Document Custom Fields
      </el-checkbox>
    </el-form-item>
    <el-form-item label="Available Document Custom Fields">
      <div class="w-full grid grid-cols-3 gap-10 mt-4">
        <div>
          <h4 class="text-lg">
            Classes
          </h4>
          <el-checkbox
            :class="$style.checkAll"
            @change="isChecked => onSelectAll(isChecked, treeClassesRef)"
            v-model="formLocal.checkAllClasses"
          >
            Select All
          </el-checkbox>
          <el-tree
            @check-change="getCheckedKeys"
            ref="treeClasses"
            :data="availableDocsTreeClasses"
            :default-expanded-keys="[]"
            show-checkbox
            node-key="id"
            :expand-on-click-node="true"
            :indent="5"
            icon-class="el-icon-arrow-up"
            :class="$style.tree"
          >
            <span
              class="tree-node text-sm"
              slot-scope="{ node }"
            >
              <span>{{ node.label }}</span>
            </span>
          </el-tree>
        </div>
        <div>
          <h4 class="text-lg">
            Departments
          </h4>
          <el-checkbox
            :class="$style.checkAll"
            @change="isChecked => onSelectAll(isChecked, treeDepartmentsRef)"
            v-model="formLocal.checkAllDepartment"
          >
            Select All
          </el-checkbox>
          <el-tree
            @check-change="getCheckedKeys"
            ref="treeDepartments"
            :data="availableDocsTreeDepartments"
            :default-expanded-keys="[]"
            show-checkbox
            node-key="id"
            :expand-on-click-node="true"
            :indent="5"
            icon-class="el-icon-arrow-up"
            :class="$style.tree"
          >
            <span
              class="tree-node text-sm"
              slot-scope="{ node }"
            >
              <span>{{ node.label }}</span>
            </span>
          </el-tree>
        </div>
        <div>
          <h4 class="text-lg">
            DCF 3
          </h4>
          <el-checkbox
            :class="$style.checkAll"
            @change="isChecked => onSelectAll(isChecked, treeDFC3Ref)"
            v-model="formLocal.checkAllDCF3"
          >
            Select All
          </el-checkbox>
          <el-tree
            @check-change="getCheckedKeys"
            ref="treeDFC3"
            :data="availableDocsTreeDFC3"
            :default-expanded-keys="[]"
            show-checkbox
            node-key="id"
            :expand-on-click-node="true"
            :indent="5"
            icon-class="el-icon-arrow-up"
            :class="$style.tree"
          >
            <span
              class="tree-node text-sm"
              slot-scope="{ node }"
            >
              <span>{{ node.label }}</span>
            </span>
          </el-tree>
        </div>
      </div>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import {Component, Emit, Prop, Ref, Vue, Watch} from 'vue-property-decorator';
import ElSelect from '@/components/element-custom/select.vue';
import {cloneDeep} from 'lodash';
import {ElTree, TreeData} from 'element-ui/types/tree';
import {
  availableDocsTreeClasses,
  availableDocsTreeDepartments,
  availableDocsTreeDFC3,
} from '@/mocks/availableDocumentsTree';


export interface AvailableDocumentsInterface {
  selectAllDocumentsCustomFields: boolean,
  checkAllClasses: boolean,
  checkAllDepartment: boolean,
  checkAllDCF3: boolean,

  department: number[],
  classes: number[],
  dcf3: number[],
}

@Component({
  components: {
    ElSelect,
  },
})
export default class InviteUserPopupAvailableDocumentsForm extends Vue {
  @Prop() private readonly formDataInit!: AvailableDocumentsInterface;

  @Ref('treeClasses') treeClassesRef!: ElTree<number, TreeData>;
  @Ref('treeDepartments') treeDepartmentsRef!: ElTree<number, TreeData>;
  @Ref('treeDFC3') treeDFC3Ref!: ElTree<number, TreeData>;

  get treeRefs(): ElTree<number, TreeData>[] {
    return [
      this.treeClassesRef,
      this.treeDepartmentsRef,
      this.treeDFC3Ref,
    ];
  }

  formLocal: AvailableDocumentsInterface|null = null;

  availableDocsTreeClasses = availableDocsTreeClasses;
  availableDocsTreeDepartments = availableDocsTreeDepartments;
  availableDocsTreeDFC3 = availableDocsTreeDFC3;

  @Watch('formLocal', {deep: true})
  @Emit('update:form-data-init')
  onFormDataChange() {
    return this.formLocal;
  }

  protected mounted() {
    this.formLocal = cloneDeep(this.formDataInit);
  }

  protected selectAllDocumentsCustomFields(checked: boolean) {
    if (!this.formLocal) return;
    this.formLocal.checkAllClasses = checked;
    this.formLocal.checkAllDepartment = checked;
    this.formLocal.checkAllDCF3 = checked;
    this.treeRefs.forEach(ref => this.onSelectAll(checked, ref));
  }

  protected onSelectAll(isChecked: boolean, treeRef: ElTree<number, TreeData>) {
    if (!isChecked) {
      treeRef.setCheckedKeys([]);
      return;
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const keys = Object.keys(treeRef.root.store.nodesMap).map(Number);
    treeRef.setCheckedKeys(keys);
  }

  protected getCheckedKeys() {
    if (!this.formLocal) return;
    this.formLocal.dcf3 = this.treeDFC3Ref.getCheckedKeys();
    this.formLocal.department = this.treeDepartmentsRef.getCheckedKeys();
    this.formLocal.classes = this.treeClassesRef.getCheckedKeys();
  }
}
</script>

<style lang="scss" module>
.tree {
  $nodeHeight: 43px;

  :global(.el-tree-node__content) {
    display: grid;
    grid-template-columns: 28px 1fr $nodeHeight;
    grid-template-areas: "a b c";
    height: $nodeHeight;
    align-content: center;
    position: relative;

    &::before {
      content: "";
      display: block;
      background: transparent;
      height: 2px;
      width: calc(100% - 43px);
      left: 43px;
      bottom: 0;
      position: absolute;
      border-bottom: 1px solid rgba(29, 36, 82, 0.1);
    }

    > :global(.el-tree-node__expand-icon) {
      grid-area: c;
      transform-origin: center;
      position: relative;
      color: #1D2452;
      font-size: 15px;
      font-weight: bolder;
      height: $nodeHeight;

      &::before {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      &:global(.expanded) {
        transform: rotate(180deg) !important;
        color: #415ADA;
      }

      &:global(.is-leaf) {
        display: none;
      }
    }

    > :global(.tree-node) {
      grid-area: b;
      font-family: 'Inter', sans-serif;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      /* identical to box height */

      display: flex;
      align-items: center;

      /* main/navy blue */

      color: #1D2452;
    }

    > :global(.el-checkbox) {
      grid-area: a;
    }
  }
}

.checkAll {
  :global(.el-checkbox__label) {
    font-size: 16px;
  }
}
</style>
