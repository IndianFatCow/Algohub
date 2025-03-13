<script setup>
import {
    Edit,
    Delete
} from '@element-plus/icons-vue'
import { ref } from 'vue'
const categorys = ref([
    {
        "id": 3,
        "categoryName": "美食",
        "AC_rate": "44.8",
        "createTime": "2023-09-02 12:06:59",
        "updateTime": "2023-09-02 12:06:59"
    },
    {
        "id": 4,
        "categoryName": "娱乐",
        "AC_rate": "33.6",
        "createTime": "2023-09-02 12:08:16",
        "updateTime": "2023-09-02 12:08:16"
    },
    {
        "id": 5,
        "categoryName": "军事",
        "AC_rate": "22.3",
        "createTime": "2023-09-02 12:08:33",
        "updateTime": "2023-09-02 12:08:33"
    }
])
//声明一个异步的函数
import { questionCategoryListService, questionCategoryAddService, questionCategoryUpdateService,questionCategoryDeleteService } from '@/api/question.js'
const articleCategoryList = async () => {
    let result = await articleCategoryListService();
    categorys.value = result.data;

}
articleCategoryList();
//控制添加题目弹窗
const dialogVisible = ref(false)

//添加题目数据模型
const categoryModel = ref({
    categoryName: '',
    AC_rate: ''
})
//添加题目表单校验
const rules = {
    categoryName: [
        { required: true, message: '请输入题目名称', trigger: 'blur' },
    ],
    AC_rate: [
        { required: true, message: '请输入AC_rate', trigger: 'blur' },
    ]
}


//调用接口,添加表单
import { ElMessage } from 'element-plus'
const addCategory = async () => {
    //调用接口
    let result = await articleCategoryAddService(categoryModel.value);
    ElMessage.success(result.msg ? result.msg : '添加成功')

    //调用获取所有文章题目的函数
    articleCategoryList();
    dialogVisible.value = false;
}

//定义变量,控制标题的展示
const title = ref('')

//展示编辑弹窗
const showDialog = (row) => {
    dialogVisible.value = true; title.value = '编辑题目'
    //数据拷贝
    categoryModel.value.categoryName = row.categoryName;
    categoryModel.value.AC_rate = row.AC_rate;
    //扩展id属性,将来需要传递给后台,完成题目的修改
    categoryModel.value.id = row.id
}

//编辑题目
const updateCategory = async () => {
    //调用接口
    let result = await articleCategoryUpdateService(categoryModel.value);

    ElMessage.success(result.msg ? result.msg : '修改成功')

    //调用获取所有题目的函数
    articleCategoryList();

    //隐藏弹窗
    dialogVisible.value = false;
}

//清空模型的数据
const clearData = () => {
    categoryModel.value.categoryName = '';
    categoryModel.value.AC_rate = '';
}

//删除题目
import {ElMessageBox} from 'element-plus'
const deleteCategory = (row) => {
    //提示用户  确认框

    ElMessageBox.confirm(
        '你确认要删除该题目信息吗?',
        '温馨提示',
        {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            //调用接口
            let result = await articleCategoryDeleteService(row.id);
            ElMessage({
                type: 'success',
                message: '删除成功',
            })
            //刷新列表
            articleCategoryList();
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '用户取消了删除',
            })
        })
}
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>题目管理</span>
                <div class="extra">
                    <el-button type="primary" @click="dialogVisible = true; title = '添加题目'; clearData()">添加题目</el-button>
                </div>
            </div>
        </template>
        <el-table :data="categorys" style="width: 100%">
            <el-table-column label="序号" width="100" type="index"> </el-table-column>
            <el-table-column label="题目名称" prop="categoryName"></el-table-column>
            <el-table-column label="AC_rate" prop="AC_rate"></el-table-column>
            <el-table-column label="操作" width="100">
                <template #default="{ row }">
                    <el-button :icon="Edit" circle plain type="primary" @click="showDialog(row)"></el-button>
                    <el-button :icon="Delete" circle plain type="danger" @click="deleteCategory(row)"></el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="没有数据" />
            </template>
        </el-table>

        <!-- 添加题目弹窗 -->
        <el-dialog v-model="dialogVisible" :title="title" width="30%">
            <el-form :model="categoryModel" :rules="rules" label-width="100px" style="padding-right: 30px">
                <el-form-item label="题目名称" prop="categoryName">
                    <el-input v-model="categoryModel.categoryName" minlength="1" maxlength="10"></el-input>
                </el-form-item>
                <el-form-item label="AC_rate" prop="AC_rate">
                    <el-input v-model="categoryModel.AC_rate" minlength="1" maxlength="15"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="title == '添加题目' ? addCategory() : updateCategory()"> 确认 </el-button>
                </span>
            </template>
        </el-dialog>
    </el-card>
</template>

<style lang="scss" scoped>
.page-container {
    min-height: 100%;
    box-sizing: border-box;

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}
</style>