<template>
  <div class="role-manage">
    <div class="query-form">
      <el-form ref="form" :inline="true" :model="queryForm">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="queryForm.roleName" placeholder="请输入菜单名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
          <el-button @click="handleReset('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleAdd">创建</el-button>
      </div>
      <el-table :data="roleList">
        <el-table-column v-for="item in columns" :key="item.prop" :prop="item.prop" :label="item.label"
          :width="item.width" :formatter="item.formatter">
        </el-table-column>
        <el-table-column label="操作" width="280">
          <template #default="scope">
            <el-button @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="primary" @click="handleOpenPermission(scope.row)">设置权限</el-button>
            <el-button type="danger" @click="handleDel(scope.row._id)">删除</el-button>
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
          <el-input type="textarea" v-model="roleForm.remark" :row="2" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleEditClose">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 权限弹框 -->
    <el-dialog width="35%" title="权限设置" v-model="showPermission">
      <el-form label-width="100px">
        <el-form-item label="角色名称" prop="roleName">
          {{ curRoleName }}
        </el-form-item>
        <el-form-item label="选择权限" prop="remark">
          <el-tree ref="permissionTree" :data="menuList" show-checkbox node-key="_id" default-expand-all
            :props="{ label: 'menuName' }" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handlePermissionClose">取 消</el-button>
          <el-button type="primary" @click="handlePermissionSubmit">确 定</el-button>
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
      queryForm: { // 查询角色表单名称
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
          prop: 'permissionList',
          formatter: (row, column, value) => {
            let names = []
            let list = value.halfCheckedKeys || []
            list.map(key => {
              if (key) names.push(this.actionMap[key])
            })
            return names.join(',')
          }
        },
        {
          label: '创建时间',
          prop: 'createTime',
          formatter(row, column, value) {
            return utils.formateDate(new Date(value))
          }
        },
        {
          label: '更新时间',
          prop: 'updateTime',
          formatter(row, column, value) {
            return utils.formateDate(new Date(value))
          }
        }
      ],
      roleList: [], // 页面角色列表信息
      pager: {  // 页面展示个数
        pageSize: 10,
        pageNum: 1,
        total: 0
      },
      showModal: false, // 角色创建 弹窗开关
      action: 'create', // 按钮模式切换
      roleForm: {}, // 角色表单
      rules: { // 角色表单规则
        roleName: [
          {
            required: true,
            message: '请输入角色名称'
          }
        ]
      },
      showPermission: false, // 设置权限弹窗开关
      curRoleId: '', // 选中权限的id
      curRoleName: '', // 选中权限的Name
      menuList: [], // 菜单列表
      actionMap: {} // 菜单映射表
    }

  },
  mounted() {
    this.getRoleList()
    this.getMenuList()
  },
  methods: {
    // 角色列表初始化
    async getRoleList() {
      try {
        let { list, page } = await this.$api.getRoleList({
          ...this.queryForm,
          ...this.pager,
        })
        this.roleList = list
        this.pager.total = page.total
      } catch (error) {
        throw new Error('角色列表初始化错误=>', error)
      }
    },
    // 菜单列表初始化
    async getMenuList() {
      try {
        let list = await this.$api.getMenuList()
        this.menuList = list
        this.getActionMap(list)
      } catch (error) {
        throw new Error('菜单列表初始化错误=>', error)
      }
    },
    // 表单重置
    handleReset(form) {
      this.$refs[form].resetFields()
    },
    // 角色编辑
    handleEdit(row) {
      this.action = 'edit'
      this.showModal = true
      this.$nextTick(() => {
        this.roleForm = {
          _id: row._id,
          roleName: row.roleName,
          remark: row.remark
        }
      })
    },
    // 角色添加
    handleAdd() {
      this.action = 'create'
      this.showModal = true
    },
    // 角色删除
    async handleDel(_id) {
      await this.$api.roleOperate({ _id, action: 'delete' })
      this.$message.success('删除成功')
      this.getRoleList()
    },
    // 角色提交
    handleSubmit() {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          let { roleForm, action } = this
          let params = { ...roleForm, action }
          let res = await this.$api.roleOperate(params)
          if (res) {
            this.showModal = false
            this.$message.success('创建成功')
            this.handleReset('dialogForm')
            this.getRoleList()
          }
        }
      })
    },
    // 分页
    handleCurrentChange(current) {
      this.pager.pageNum = current
      this.getRoleList()
    },
    // 关闭设置权限弹窗
    handlePermissionClose() {
      this.showPermission = false
    },
    // 关闭编辑弹窗
    handleEditClose() {
      this.handleReset("dialogForm");
      this.showModal = false
    },
    // 打开设置权限弹窗
    handleOpenPermission(row) {
      this.curRoleId = row._id
      this.curRoleName = row.roleName
      this.showPermission = true
      let { checkedKeys } = row.permissionList
      setTimeout(() => {
        this.$refs.permissionTree.setCheckedKeys(checkedKeys)
      })
    },
    // 设置权限提交
    async handlePermissionSubmit() {
      let nodes = this.$refs.permissionTree.getCheckedNodes()
      let halfKeys = this.$refs.permissionTree.getHalfCheckedKeys()
      let checkedKeys = []
      let parentKeys = []
      nodes.map(node => {
        if (!node.children) {
          // 每一个选中的按钮
          checkedKeys.push(node._id)
        } else {
          // 每一个选中的菜单
          parentKeys.push(node._id)
        }
      })
      let params = {
        _id: this.curRoleId,
        permissionList: {
          checkedKeys,
          halfCheckedKeys: parentKeys.concat(halfKeys)
        }
      }
      await this.$api.updatePermission(params)
      this.showPermission = false
      this.$message.success('设置成功')
      this.getRoleList()
    },
    // 递归遍历，把key值转换为字典
    getActionMap(list) {
      let actionMap = {}
      const deep = (arr) => {
        while (arr.length) {
          let item = arr.pop()
          if (item.children && item.action) {
            actionMap[item._id] = item.menuName
          }
          if (item.children && !item.action) {
            deep(item.children)
          }
        }
      }
      deep(JSON.parse(JSON.stringify(list)))
      this.actionMap = actionMap
    }
  },
};
</script>