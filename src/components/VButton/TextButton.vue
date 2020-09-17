<template>
    <span class="btn-text" v-on="$listeners">
        <slot />
    </span>
</template>

<script>
export default {
    name: 'TextButton',
};
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
.btn-text {
    background-color: transparent;
    color: color('blue');
    cursor: pointer;
    font-size: 1.6rem;
    padding: 0.85rem 1rem;
    text-decoration: none;

    &:hover {
        background-color: rgba(color('blue'), 0.1);
    }

    &:active {
        background-color: rgba(color('blue'), 0.2);
    }

    &.btn-container-width {
        display: block;
    }
}
</style>
