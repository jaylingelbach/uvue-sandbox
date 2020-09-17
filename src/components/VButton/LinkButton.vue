<template>
    <a :href="$attrs.href" :class="['btn-link', { underline: $attrs.underline }]" v-on="$listeners"><slot /></a>
</template>

<script>
export default {
    name: 'LinkButton',
};
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
.btn-link {
    background-color: transparent;
    color: color('blue');
    cursor: pointer;
    font-size: 1.6rem;
    text-decoration: none;

    &.underline {
        text-decoration: underline;
    }

    &:hover {
        background-color: rgba-color('blue', 0.1);
    }
}
</style>
