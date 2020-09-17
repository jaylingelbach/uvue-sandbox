<template>
    <component :is="component" ref="btn" v-bind="$props" :class="classes" @click="btnClicked($event)">
        <slot v-if="modal" />
        <slot v-if="button === 'LinkButton'" />
        <template v-else>{{ title }}</template>
    </component>
</template>

<script>
import CartButton from './CartButton.vue';
import CloseButton from './CloseButton.vue';
import CommonButton from './CommonButton.vue';
import DirectionButton from './DirectionButton.vue';
import LinkButton from './LinkButton.vue';
import TextButton from './TextButton.vue';

export default {
    name: 'VButton',
    components: {
        CartButton,
        CloseButton,
        CommonButton,
        DirectionButton,
        LinkButton,
        TextButton,
    },
    props: {
        /**
         * This is the custom button component you want to use. Pass the name of the file.
         * Files are located in the `_components` directory.
         */
        button: {
            type: String,
            required: false,
            default: 'CommonButton',
        },
        /**
         * Sets button to width of it's container.
         */
        containerWidth: {
            type: Boolean,
            required: false,
            default: false,
        },
        /**
         * Sets the direction of arrows in the custom DirectionButton.
         * A next arrow is used by default.
         * must be one of the following: `previous`, `next`
         */
        direction: {
            type: String,
            required: false,
            default: '',
        },
        /**
         * Sets whether the button is disabled or not.
         */
        disabled: {
            type: Boolean,
            required: false,
            default: false,
        },
        /**
         * Sets whether the button is ghosted or not.
         */
        ghost: {
            type: Boolean,
            required: false,
            default: false,
        },
        /**
         * Sets a buttons light version.
         */
        light: {
            type: Boolean,
            required: false,
            default: false,
        },
        /**
         * Tells VButton if this button has a modal and renders it's slot data.
         */
        modal: {
            type: Boolean,
            required: false,
            default: false,
        },
        /**
         * Sets button's shape.
         * must be one of the following: `pill`, `rectangle`
         */
        shape: {
            type: String,
            required: false,
            default: 'rectangle',
            validator(val) {
                return ['rectangle', 'pill'].includes(val);
            },
        },
        /**
         * Sets the size of the button.
         * must be one of the following: `small`, `large`
         */
        size: {
            type: String,
            required: false,
            default: 'medium',
            validator(val) {
                return ['small', 'medium', 'large'].includes(val);
            },
        },
        /**
         * Sets button's color theme.
         * must be one of the following: `primary`, `alert`, `light`, `dark`, `submit`
         */
        theme: {
            type: String,
            required: false,
            default: 'default',
            validator(val) {
                return ['default', 'submit', 'primary', 'alert', 'light', 'dark'].includes(val);
            },
        },
        /**
         * This is the title you want on your button.
         */
        title: {
            type: String,
            required: false,
            default: '',
        },
        /**
         * Sets a link to be underlined.
         */
        underline: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    data() {
        return {
            classThemePrefix: 'btn-theme-',
            classSizePrefix: 'btn-',
            classShapePrefix: 'btn-',
            classContainerWidth: 'btn-container-width',
            classGhost: 'btn-ghost',
        };
    },
    computed: {
        classes() {
            return [
                this.classColor,
                this.classSize,
                {
                    [this.classContainerWidth]: this.containerWidth,
                    [this.classGhost]: this.ghost,
                },
            ];
        },
        classColor() {
            return this.theme && this.button === 'CommonButton' && this.classThemePrefix + this.theme;
        },
        classSize() {
            return this.classSizePrefix + this.size;
        },
        classShape() {
            return this.classShapePrefix + this.shape;
        },
        component() {
            const components = {
                CartButton: 'CartButton',
                CloseButton: 'CloseButton',
                CommonButton: 'CommonButton',
                DirectionButton: 'DirectionButton',
                LinkButton: 'LinkButton',
                TextButton: 'TextButton',
            };
            return components[this.button];
        },
    },
    methods: {
        btnClicked(event) {
            this.$emit('clicked', event);
        },
    },
};
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
/* stylelint-disable declaration-no-important */

// add shared button styling and theming
@mixin set-hover($color, $percent) {
    &:hover {
        background-color: shade(color($color), $percent);
    }
}

@mixin set-theme-colors($bg: 'medium-light-grey', $color: 'dark-grey', $hoverPercent: 6%, $focusPercent: 25%) {
    background-color: color($bg);
    color: color($color);

    &:hover {
        background-color: shade(color($bg), $hoverPercent);
    }

    &:active {
        background: shade(color($bg), 22%);
        outline: none;
    }

    &:focus {
        box-shadow: inset 0 0 0 1px shade(color($bg), $focusPercent);
        outline: none;
    }

    &.btn-ghost {
        background-color: transparent;
        border: 2px color($bg) solid;
        color: color($bg);

        &:hover {
            background-color: color($bg);
            color: color($color);
        }
    }
}

.btn {
    &-theme-default {
        border: 1px solid #d1d1d1;

        @include set-theme-colors();
    }

    &-cart {
        border: none;
        font-weight: 600;
    }

    &-cart,
    &-theme-submit {
        @include set-theme-colors('green', 'white', 15%);
    }

    &-theme-primary {
        @include set-theme-colors('primary', 'white');
    }

    &-theme-alert {
        @include set-theme-colors('red', 'white', 15%, 40%);
    }

    &-theme-light {
        @include set-theme-colors('light-grey');
    }

    &-theme-dark {
        @include set-theme-colors('dark-grey', 'white');
    }

    &-pill {
        border-radius: 200px !important;
    }

    &-rectangle {
        border-radius: 0 !important;
    }

    &-small {
        font-size: 1.3rem !important;
        padding: spacing('ultra-tight') spacing('normal') !important;
    }

    &-large {
        font-size: 1.9rem !important;
        padding: spacing('extra-tight') spacing('loose') !important;
    }

    &-container-width {
        width: 100%;
    }
}
</style>
