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
                    TOOLTIP HERE
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
const componentClassName = 'filter-ui-behaviors';

export default {
    name: 'FilterUIBehaviors',

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
