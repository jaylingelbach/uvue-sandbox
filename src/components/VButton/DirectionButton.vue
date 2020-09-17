<template>
    <button
        v-bind="$attrs"
        :class="['btn-direction', { 'no-title': !$attrs.title }]"
        v-on="$listeners"
        @click="$emit('clicked', $event)"
    >
        <span v-if="$attrs.direction.match(/previous/i)" class="previous">
            <svg class="btn-direction__icon" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 299 512">
                <title>Arrow pointing left</title>
                <path
                    d="M33.792 223.274l-32.17 32.171 257.493 257.493 32.171-32.171-225.28-225.28 224.128-224.341-32.171-32.128-224.128 224.256z"
                />
            </svg>
            {{ $attrs.title }}
        </span>
        <span v-else class="next">
            {{ $attrs.title }}
            <svg class="btn-direction__icon" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 299 512">
                <title>Arrow pointing right</title>
                <path
                    d="M262.827 288.726l32.128-32.171-257.493-257.493-32.17 32.17 225.28 225.28-224.171 224.341 32.128 32.128 224.298-224.256z"
                />
            </svg>
        </span>
    </button>
</template>

<script>
export default {
    name: 'DirectionButton',
};
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
.btn-direction {
    background-color: transparent;
    border: 2px color('dark-grey') solid;
    color: color('dark-grey');
    cursor: pointer;
    font-size: 1.4rem;
    padding: spacing('ultra-tight') spacing('tight');

    &,
    &__icon {
        transition: all 0.2s ease;
    }

    &:active,
    &:focus {
        background-color: shade(color('dark-grey'), 10%);
        box-shadow: 0 1.6rem 3.2rem rgba-color('grey', 0.1);
        color: color('white');

        .btn-direction__icon {
            fill: color('white');
        }
    }

    &:hover {
        background-color: color('dark-grey');
        color: color('white');

        .btn-direction__icon {
            fill: color('white');
        }
    }

    .previous,
    .next {
        align-items: center;
        display: flex;
        justify-content: center;
    }

    .previous {
        .btn-direction__icon {
            margin-right: 1rem;
        }
    }

    .next {
        .btn-direction__icon {
            margin-left: 1rem;
        }
    }

    &.no-title {
        height: 40px;
        justify-content: center;
        padding: spacing('ultra-tight');
        width: 40px;

        .btn-direction__icon {
            margin: 0;
        }
    }

    &__icon {
        fill: color('dark-grey');
        width: 1rem;
    }
}
</style>
