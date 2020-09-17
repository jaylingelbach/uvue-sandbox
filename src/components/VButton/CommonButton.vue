<template>
    <button
        v-bind="$attrs"
        :class="['btn']"
        v-on="$listeners"
        @click="$emit('clicked', $event)"
    >
        <slot />
    </button>
</template>

<script>
export default {
    name: 'CommonButton',
};
</script>
