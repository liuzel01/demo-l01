<template>
    <svg :class="`xh-icon ${customClass}`" aria-hidden="true" :style="{
        width: iconSize,
        height: iconSize,
        fontSize: iconSize,
        fill: fillColor,
    }">
        <use :xlink:href="iconSymbolId" />
    </svg>
</template>

<script setup lang="ts">
/**
 * @usage
 * <xh-icon icon-class="xxx" />
 */
import { computed, watch } from "vue";

const props = defineProps({
    /**
     * custom-class
     */
    customClass: {
        type: String,
        default: "",
    },
    /**
     * icon-class
     */
    iconClass: {
        type: String,
        required: true,
    },
    /**
     * icon-size
     */
    iconSize: {
        type: String,
        default: "1rem",
    },
    /**
     * fill-color
     */
    fillColor: {
        type: String,
        default: "#037db4",
    },
});

const iconSymbolId = computed<string>(
    () => {
        return `#icon-${props.iconClass}`;
    }
);

watch(
    () => props.iconClass,
    (newValue, oldValue) => {

        const svgIconSymbol = document.getElementById(`icon-${newValue}`);

        if (svgIconSymbol) {

        }
        else {
            console.error(`[xh-icon] ${newValue} svg file not found`);
        }

    },
    {
        immediate: true,
        deep: true,
    }
);
</script>
  
<style scope>
.xh-icon {
    overflow: hidden;
}
</style>