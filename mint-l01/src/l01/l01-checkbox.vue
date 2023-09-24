<template>
    <div>
        <!-- 这是子组件 -->
        <input type="checkbox" v-model="checkAll"> 全选/全不选
        <li v-for="item, index in list" :key="index">

            <input type="checkbox" v-model="checklist[index]">{{ item }}
        </li>
    </div>
</template>

<script setup lang="ts">
// import {  } from "vue";
import { computed, reactive, ref, toRefs } from "vue";

let data = reactive({
    list: [10, 20, 30, 40],
    checklist: [true, false, false, false]
})
// 将变量解构
let { list, checklist } = toRefs(data)

let checkAll = computed({
    get() {
        return !data.checklist.includes(false)
    },
    set(newVal: boolean) {
        console.log("checkAll 被修改的时候执行 set 的代码", newVal);
        // 将 checklist 的所有值都改成 newVal
        data.checklist = data.checklist.map(() => newVal)

    }
})



</script>