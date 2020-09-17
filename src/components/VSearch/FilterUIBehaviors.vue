<template>
    <div
        class="filter-ui-behaviors"
        :class="{
            'filter-ui-behaviors--collapsed': isCollapsed,
            'filter-ui-behaviors--collapsible': collapsible,
        }"
    >
        <button
            :id="headingID"
            class="filter-ui-behaviors__heading"
            data-testid="FilterUIBehaviors-heading"
            :aria-controls="filterID"
            :aria-label="ariaHeadingLabel"
            :aria-expanded="isCollapsed ? 'false' : 'true'"
            @click="toggleExpandCollapse"
        >
            <h3>
                {{ heading }}
                <span v-if="heading === 'Financing'">
                    <VTooltip>
                        <div class="tooltip__financing">
                            <div class="tooltip__financing--inner">
                                <a href="/financing/" class="tooltip__img">
                                    <img
                                        src="https://media.sweetwater.com/include/footer/images/swcard-v2.png"
                                        alt="picture of Sweetwater Card"
                                    />
                                    <!-- eslint-disable -->
                                    <span class="tooltip__img--link-text">Financing</span>
                                </a>

                                <div class="tooltip__content">
                                    <div class="heading">
                                        <a href="/financing/">Financing</a>
                                    </div>
                                    <p>Special financing options exist if you use your Sweetwater card.</p>
                                </div>
                            </div>
                            <a
                                href="/financing/"
                                class="tooltip__readmore"
                                data-test="guide_txt"
                            >Click here for details</a>
                        </div>
                    </VTooltip>
                </span>
            </h3>
            <span
                v-if="collapsible"
                class="filter-ui-behaviors__expand-collapse"
                data-testid="FilterUIBehaviors-expandCollapse"
            ></span>
        </button>
        <div
            :id="filterID"
            class="filter-ui-behaviors__filter"
            data-testid="FilterUIBehaviors-filter"
            :aria-labelledby="headingID"
        >
            <slot />
        </div>
    </div>
</template>

<script>
import VTooltip from '@/components/VSearch/VTooltip.vue';

const componentClassName = 'filter-ui-behaviors';

export default {
    name: 'FilterUIBehaviors',
    components: {
        VTooltip,
    },
    props: {
        heading: {
            type: String,
            required: true,
        },
        collapsible: {
            type: Boolean,
            required: false,
            default: true,
        },
        initCollapsed: {
            type: Boolean,
            required: false,
            default: false,
        },
    },
    data() {
        return {
            isCollapsed: this.initCollapsed,
        };
    },
    computed: {
        ariaHeadingLabel() {
            // eslint-disable-next-line no-nested-ternary
            const action = this.collapsible
                ? this.isCollapsed
                    ? 'Show '
                    : 'Hide '
                : '';
            return `${action}${this.heading} filter options`;
        },
        filterID() {
            return `${componentClassName}__filter--${this.convertHeadingToCssString(
                this.heading,
            )}`;
        },
        headingID() {
            return `${componentClassName}__heading--${this.convertHeadingToCssString(
                this.heading,
            )}`;
        },
    },
    methods: {
        convertHeadingToCssString() {
            return this.heading.replace(/[^a-zA-Z0-9]+/g, '-');
        },
        toggleExpandCollapse() {
            this.isCollapsed = this.collapsible ? !this.isCollapsed : false;
        },
    },
};
</script>

<style lang="scss">
.filter-ui-behaviors {
    border-bottom: 1px solid #ddd;
    margin: 0.5rem 0;

    &__heading {
        align-items: center;
        background: none;
        border: none;
        display: flex;
        font-size: 2rem;
        justify-content: space-between;
        padding: 1rem;
        width: 100%;

        h3 {
            font-size: inherit;
            font-weight: normal;
        }

        &--collapsible {
            cursor: pointer;
        }
    }

    &__filter {
        padding: 0 1rem 1rem;
        transition: all 0.35s cubic-bezier(0, 1, 0.5, 1);
    }

    &__expand-collapse {
        background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 878 512"%3E%3Cdefs/%3E%3Cpath fill="%232e2d2b" d="M382.8 451.7l55.1 55.1L879.3 65.1 824.2 9.9 438 396.1 53.4 12.1l-55 55.2 384.4 384.4z"/%3E%3C/svg%3E');
        background-repeat: no-repeat;
        background-size: contain;
        display: inline-block;
        height: 0.8em;
        position: relative;
        top: 0.1em;
        transform: rotate(-180deg) translateY(0.2em);
        transition: all 0.2s ease-in-out;
        width: 0.8em;
    }

    &--collapsible {
        .filter-ui-behaviors__heading {
            cursor: pointer;
        }
    }

    &--collapsed {
        .filter-ui-behaviors__filter {
            display: none;
            max-height: 0;
            overflow: hidden;
            padding-bottom: 0;
            padding-top: 0;
        }

        .filter-ui-behaviors__expand-collapse {
            transform: rotate(0) translateY(0);
        }
    }
}
</style>
