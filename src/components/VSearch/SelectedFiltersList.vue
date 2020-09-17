<template>
    <div
        :class="[
            'selected-filters-list',
            { 'selected-filters-list--mobile-selected': filtersSelected },
        ]"
    >
        <div class="selected-filters-list__container">
            <div
                v-for="refinement in refinements"
                :key="
                    [
                        refinement.attribute,
                        refinement.type,
                        refinement.value,
                        refinement.operator,
                    ].join(':')
                "
            >
                <a
                    class="selected-filters-list__filter"
                    :href="createUrl(refinement)"
                    :aria-label="
                        `Activate to clear the filter, ${refinement.displayName}: ${refinement.displayValue}.`
                    "
                    @click.prevent="refinement.refine(refinement)"
                >
                    <span class="selected-filters-list__filter--text">
                        <span>{{ refinement.displayName }}:</span>
                        <span class="selected-filters-list__filter--heavy">
                            {{ refinement.displayValue }}
                        </span>
                    </span>
                    <IconClose class="selected-filters-list__icon" />
                </a>
            </div>
            <AisClearRefinements
                v-if="showClearAll"
                class="selected-filters-list__clear-button"
            >
                <template slot-scope="{ refine, createURL }">
                    <a :href="createURL()" @click.prevent="refine">
                        Clear All
                    </a>
                </template>
            </AisClearRefinements>
        </div>
    </div>
</template>

<script>
import { AisClearRefinements } from 'vue-instantsearch';

export default {
    name: 'SelectedFiltersList',
    components: {
        AisClearRefinements,
    },
    props: {
        items: {
            type: Array,
            required: true,
        },
        createUrl: {
            type: Function,
            required: true,
        },
    },
    computed: {
        refinements() {
            let flattenedRefinements = [];

            this.items.forEach(item => {
                flattenedRefinements = flattenedRefinements.concat(
                    item.refinements.map(refinement => {
                        /* eslint-disable no-param-reassign */
                        refinement.displayName = this.getDisplayName(
                            refinement.attribute,
                        );
                        refinement.displayValue = this.getDisplayValue(
                            refinement.attribute,
                            refinement.label,
                        );
                        refinement.refine = item.refine;
                        /* eslint-enable no-param-reassign */
                        return refinement;
                    }),
                );
            });

            return flattenedRefinements.sort((a, b) => {
                const aAttr = a.attribute;
                const bAttr = b.attribute;

                if (aAttr < bAttr) {
                    return -1;
                } else if (aAttr > bAttr) {
                    return 1;
                }
                return 0;
            });
        },
        filtersSelected() {
            return this.refinements.length > 0;
        },
        showClearAll() {
            return this.refinements.length > 1;
        },
    },
    methods: {
        getDisplayName(refinementAttribute) {
            let displayName = this.overrideLabel(refinementAttribute);
            if (displayName !== refinementAttribute) {
                return displayName;
            }
            displayName = this.removeFacetsPrefix(displayName);
            displayName = this.removeFacetsSuffix(displayName);
            return this.titleCaseWords(displayName);
        },
        getDisplayValue(refinementAttribute, refinementLabel) {
            if (refinementAttribute === 'facets.color_code') {
                const swatch = this.$config.colorSwatches.find(
                    swatch => swatch.id === refinementLabel,
                );
                return swatch.name;
            }
            return refinementLabel;
        },
        overrideLabel(label) {
            if (label === 'facets.color_code') {
                return 'Color';
            }
            return label;
        },
        removeFacetsPrefix: str => {
            return str.replace('facets.', '');
        },
        removeFacetsSuffix: str => {
            // match string ending in .lvl0, .lvl1, etc.
            return str.replace(/\.lvl\d+$/, '');
        },
        titleCaseWords: str => {
            return str.replace(/\b(\w)/g, c => c.toUpperCase());
        },
    },
};
</script>
