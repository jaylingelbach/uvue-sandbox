<template>
    <button
        v-bind="$attrs"
        :class="['btn-close', { 'btn-close--light': $attrs.light }]"
        v-on="$listeners"
        @click="$emit('clicked', $event)"
    >
        <svg
            class="btn-close__icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
        >
            <title>Close</title>
            <path
                fill-rule="evenodd"
                d="M1.98 0L0 1.98 13.856 16 .166 29.69l1.813 2.145L16 17.815l13.69 14.02 2.145-2.144L17.815 16 32 1.98 29.69 0 16 13.856"
            />
        </svg>
    </button>
</template>

<script>
export default {
    name: 'CloseButton',
};
</script>
