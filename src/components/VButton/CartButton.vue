<template>
    <CommonButton class="btn-cart" v-on="$listeners">
        <IconCartSmile class="btn-cart__icon" />
        <slot />
    </CommonButton>
</template>

<script>
import CommonButton from './CommonButton.vue';

export default {
    name: 'CartButton',
    components: {
        CommonButton,
    },
};
</script>

<style lang="css" type="text/css" scoped></style>
