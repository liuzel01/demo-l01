<template>
    <!-- 对弹窗，通过 closeAdd 监听关闭事件 -->
    <el-dialog :title="info?.name ? '修改' : '新增'" v-model="dialogTableVisible" @close="$emit('closeAdd')">
        <el-form>
            <el-form-item label="时间" prop="info?.date">
                <el-date-picker v-model="form.date" type="date" placeholder="请选择一个时间" :disabledDate="disableDate" />
            </el-form-item>
            <el-form-item label="名称" prop="info?.name">
                <el-input v-model="form.name" />
            </el-form-item>
            <el-form-item label="地址" prop="info?.address">
                <el-input v-model="form.address" />
            </el-form-item>
            <!-- <el-form-item label="排序" prop="order">
                <el-input v-model="form.order" />
            </el-form-item> -->
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="closeAdd()">Cancel</el-button>
                <el-button type="primary" @click="save()">Confirm</el-button>
            </span>
        </template>
    </el-dialog>
</template>


<script lang="ts" setup>

import { ref, Ref, computed, watch } from 'vue';
import User from '@/login-solana-module/class/User'

const props = defineProps({
    isShow: Boolean,
    info: User
})

const dialogTableVisible = computed(() => props.isShow)
const form: Ref<User> = ref<User>({
    id: "",
    date: "",
    name: "",
    address: "",

})
// watch(() => props.info, (newInfo) => {
//     if (newInfo) {
//         form.value = {
//             id: newInfo.id,
//             date: newInfo.date,
//             name: newInfo.name,
//             address: newInfo.address,
//             // order: newInfo.order,
//         }
//     }
// })
const disableDate = (time: any) => {
    const _maxTime = Date.now() - 24 * 60 * 60 * 1000 * 1
    return time.getTime() <= _maxTime
}
// 子组件这里通过事件，监听关闭和保存按钮
const emits = defineEmits(["closeAdd", "success"])

const closeAdd = () => {
    emits("closeAdd")
}
const save = () => {
    emits("success")
}


</script>