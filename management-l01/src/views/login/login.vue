<template>
    <el-form ref="ruleFormRef" :rules="rules" :model="ruleForm" class="demo-ruleForm">
        <el-form-item prop="username">
            <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="pwd">
            <el-input v-model="ruleForm.pwd" type="password" autocomplete="off" />
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="loginFn()">loginLogin</el-button>
        </el-form-item>
    </el-form>
</template>


<script setup lang="ts">
import { reactive, ref, toRefs } from 'vue';
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus';
import { adminLoginApi, getAdminInfoApi } from '@/request/api'
import Cookie from 'js-cookie'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'

const state = reactive({
    ruleForm: {
        username: 'admin',
        pwd: '123456'
    }
})
// 解构上面的 state
let { ruleForm } = toRefs(state)
let ruleFormRef = ref()
// 获取项目路由对象
let router = useRouter()
// 获取项目 vuex 对象
let store = useStore()

const validatePwd = (rule: unknown, value: string | undefined, cb: (msg?: string) => void) => {
    if (!value) {
        cb('密码不能为空')
    } else {
        cb();
    }
}
// 校验规则
const rules = reactive({
    username: [
        { required: true, message: '用户名不能为空', trigger: 'blur' }
    ],
    pwd: [{ validator: validatePwd, trigger: 'blur' }]
})

const loginFn = () => {
    ruleFormRef.value.validate().then(() => {
        console.log('校验通过');
        adminLoginApi({
            "username": ruleForm.value.username,
            "password": ruleForm.value.pwd
        }).then(res => {
            if (res.code === 200) {
                // 先存储 token，js-cookie
                Cookie.set('token', res.data.tokenHead + res.data.token, { expires: 3 })
                // 获取用户信息
                getAdminInfoApi().then(res => {
                    if (res.code === 200) {
                        store.commit('updateMenus', res.data.menus)
                        // 跳转到 homepage 页面
                        router.push('/homepage')
                    }
                })
            }
        })
    }).catch(() => {
        console.log('校验不通过');
    });
}


</script>