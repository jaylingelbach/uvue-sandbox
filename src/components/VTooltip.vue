<template>
    <div class="tooltip" @click.stop>
        <div class="tooltip__explain" data-test="tooltip-element">
            <!-- icon -->
            <div class="tooltip__icon">
                <VTooltipIcon />
                <em aria-hidden="true">What is this?</em>

                <!-- tooltip -->
                <div class="tooltip__explain-popup">
                    <div class="tooltip__wrap" data-testid="tooltip-content">
                        <slot />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'VTooltip',
};
</script>

<style lang="scss" type="text/scss" scoped>
.tooltip {
    display: inline-block;
    position: relative;

    &__financing--inner {
        background: #fff;
        border-radius: 0 5px 0 0;
        display: flex;
        position: relative;
        z-index: 4;
    }

    ::v-deep a {
        color: inherit;
        text-decoration: none;
    }

    ::v-deep &__icon {
        svg {
            cursor: pointer;
            fill: currentColor;
            height: 15px;
            position: relative;
            width: 15px;
            z-index: 4;
        }

        em {
            display: none;
        }
    }

    ::v-deep &__img {
        img {
            max-width: 85px;
            padding: 5px;
        }
    }

    &:hover {
        ::v-deep .tooltip__explain-popup {
            display: block;
        }
    }

    ::v-deep &__content {
        padding: 1rem;
        text-align: left;

        .heading {
            display: block;
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 5px;

            a {
                font-size: inherit;
            }
        }

        p {
            font-size: 1.459rem;
            line-height: 1.3;
            margin: 0;
            padding: 0;
        }
    }

    &__img {
        @include media('<xsmall') {
            display: none;
        }
    }

    ::v-deep .tooltip__img--link-text {
        display: none;
    }

    ::v-deep &__wrap {
        align-items: center;
        display: flex;
    }

    ::v-deep &__explain-popup {
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 0 5px 5px;
        box-shadow: 1px 1px 9px rgba(0, 0, 0, 0.2);
        display: none;
        font-weight: normal;
        left: 20px;
        min-width: 340px;
        position: absolute;
        top: -6px;

        @include media('<xsmall') {
            max-width: 270px;
            min-width: 230px;
            width: 100%;
        }

        &::before {
            background: #fff;
            border: 1px solid #ccc;
            border-radius: 100px 0 0 100px;
            border-right: 0;
            content: '';
            height: 30px;
            left: -29px;
            position: absolute;
            top: -1px;
            width: 29px;
        }
    }

    ::v-deep &__readmore {
        background: #eee;
        border-radius: 0 0 4px 4px;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        display: block;
        font-size: 1.4rem;
        font-weight: 600;
        padding: 1rem;
        position: relative;
        text-align: center;
        z-index: 1;

        &:hover {
            background: #e9e9e9;
        }
    }
}
</style>
