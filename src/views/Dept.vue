<template>
    <div class="dept-manage">
        <div class="query-form">
            <el-form>
                <el-form-item>
                    <el-input placeholder="请输入部门名称" v-model="queryForm.deptName"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button>查询</el-button>
                    <el-button>重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="base-table">
            <div class="action">
                <el-button type="primary">创建</el-button>
            </div>
            <el-table>
                <el-table-column>

                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
export default {
    name: 'dept',
    data() {
        return {
            queryForm: {
                deptName: '' // 部门名称
            },
            columns: [

            ]
        }
    }
}
</script>