<template>
  <div class="role-manage">
    <div class="query-form">
      <el-form ref="form" :inline="true" :model="queryForm">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="queryForm.roleName" placeholder="请输入菜单名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getMenuList">查询</el-button>
          <el-button @click="handleReset('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary">创建</el-button>
      </div>
      <el-table :data="roleList">
        <el-table-column v-for="item in columns" :key="item.prop" :prop="item.prop" :label="item.label"
          :width="item.width" :formatter="item.formatter">
        </el-table-column>
        <el-table-column label="操作" width="280">
          <template #default="scope">
            <el-button type="primary">编辑</el-button>
            <el-button @click="handleEdit(scope.row)" type="primary">设置权限</el-button>
            <el-button type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="pagination" background layout="prev, pager, next" :total="Number(pager.total)"
        :page-size="pager.pageSize" @current-change="handleCurrentChange" />
    </div>

    <!-- 新增/编辑弹框 -->
    <el-dialog width="35%" title="角色创建" v-model="showModal">
      <el-form ref="dialogForm" :model="roleForm" label-width="100px" :rules="rules">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="roleForm.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="roleForm.remark" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="菜单状态" prop="menuState" v-show="menuForm.menuType == 1">
          <el-radio-group v-model="menuForm.menuState">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="2">停用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>

import utils from "./../utils/utils";

export default {
  name: "role",
  data() {
    return {
      queryForm: {
        roleName: '',
      },
      columns: [
        {
          label: '角色名称',
          prop: 'roleName',
        },
        {
          label: '备注',
          prop: 'remark'
        },
        {
          label: '权限列表',
          prop: ''
        },
        {
          label: '创建时间',
          prop: 'createTime',
          formatter(row, column, value) {
            return utils.formateDate(new Date(value))
          }
        }
      ],
      roleList: [],
      pager: {
        pageSize: 10,
        total: 0
      },
      rules: {
        roleName: [
          {
            required: true,
            message: '请输入角色名称'
          }
        ]
      }
    }
  },
  mounted() {
    this.getRoleList()
  },
  methods: {
    // 菜单列表初始化
    async getRoleList() {
      try {
        let { list, page } = await this.$api.getRoleList(this.queryForm)
        this.roleList = list
        this.pager.total = page.total
      } catch (error) {
        throw new Error('错误', error)
      }
    },
    // 表单重置
    handleReset(form) {
      this.$refs[form].resetFields()
    },
    // 新增表单
    handleAdd(type, row) {
      this.showModal = true
      this.action = 'add'
      if (type == 2) {
        this.menuForm.parentId = [...row.parentId, row._id].filter(
          (item) => item
        )
      }
    },
  },
};
</script>