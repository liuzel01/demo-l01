<template>
    <!-- 对弹窗，通过 closeAdd 监听关闭事件 -->
    <el-dialog v-model="dialogTableVisible" @close="$emit('cancelAdd')">
        <!-- 弹窗样式的写法 -->
        <el-form>

            <h1>Connect a wallet to continue</h1>

            <el-form-item label="名称" prop="info?.name">
                <el-input v-model="form.name" />
            </el-form-item>
            <!-- <el-form-item label="地址" prop="info?.address">
                <el-input v-model="form.address" />
            </el-form-item> -->
        </el-form>

        <!-- 通过插槽对子组件渲染，并且 click 监听器 -->
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="cancelAdd()">Cancel</el-button>
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
    const form: Ref<User> = ref < User > ({
        id: "",
        date: "",
        name: "",
        address: "",

    })
    //    const disableDate = (time: any) => {
    //        const _maxTime = Date.now() - 24 * 60 * 60 * 1000 * 1
    //        return time.getTime() <= _maxTime
    //    }
    // 子组件这里通过事件，监听关闭和保存按钮
    const emits = defineEmits(["cancelAdd", "success"])

    const cancelAdd = () => {
        emits("cancelAdd")
    }
    //const save = () => {
    //        emits("success")
    //    }

</script>

<style>
    .el-dialog {
        display: flex;
        flex-direction: column;
        margin: 0 !important;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        max-height: calc(100% - 30px);
        max-width: calc(100% - 30px);
    }

    .el-dialog .el-dialog__body {
        flex: 1;
        overflow: auto;
    }
</style>