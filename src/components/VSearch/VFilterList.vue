<template>
    <AisRefinementList
        :attribute="source"
        searchable
        class="filter-list"
        :limit="1000"
        data-testid="VFilterList.component"
    >
        <template
            slot-scope="{
                createURL,
                items,
                refine,
                searchForItems,
                items: { length: filterOptionsQty },
            }"
        >
            <FilterUIBehaviors
                v-if="filterOptionsQty"
                :class="{ 'filter-list--hidden': !shouldShowList(items) }"
                :heading="title"
                :init-collapsed="collapsed"
            >
                <button
                    type="button"
                    title="Submit"
                    aria-label="Submit"
                    class="site-search__submit"
                ></button>
                <input
                    v-if="shouldShowSearch(filterOptionsQty)"
                    v-model="facetSearch"
                    type="text"
                    placeholder="Find a brand"
                    class="filter__search"
                    data-testid="VFilterList.facetSearch"
                    @input="searchForItems($event.currentTarget.value)"
                />

                <ul>
                    <li
                        v-for="(item, index) in sortItems(items)"
                        :key="item.value"
                        :class="[
                            'filter-list__item',
                            {
                                'filter-list__item--checked': item.isRefined,
                                'filter-list__item--unchecked': !item.isRefined,
                                'filter-list__item--hidden': isFilterOptionHidden(
                                    index,
                                    filterOptionsQty,
                                ),
                            },
                        ]"
                        data-testid="VFilterList.filterItem"
                    >
                        <a
                            :href="createURL(item.value)"
                            :aria-label="ariaLabel(item)"
                            class="filter-list__link"
                            data-testid="VFilterList.filterOption"
                            @click.prevent="refine(item.value)"
                        >
                            <!-- eslint-disable -->
                            <span
                                class="filter-list__label"
                                data-testid="VFilterList.filterLabel"
                            >{{ item.value }}</span>
                            <span
                                class="filter-list__count"
                                data-testid="VFilterList.filterCount"
                            >({{ item.count.toLocaleString() }})</span>
                        </a>
                    </li>
                </ul>
                <button
                    v-if="canToggleShowMore(filterOptionsQty)"
                    :aria-label="filterToggleAriaLabel(filterOptionsQty, title)"
                    data-testid="VFilterList.filterToggle"
                    class="filter-list__toggle flat-secondary-small"
                    @click="toggleShowMore"
                >{{ getFilterToggleText(filterOptionsQty) }}</button>
            </FilterUIBehaviors>
        </template>
    </AisRefinementList>
</template>

<script>
import { AisRefinementList } from 'vue-instantsearch';
import FilterUIBehaviors from '../VSearch/FilterUIBehaviors.vue';
import Comparator from '../modules/Comparator.js';

export default {
    name: 'VFilterList',
    components: {
        AisRefinementList,
        FilterUIBehaviors,
    },
    props: {
        collapsed: {
            type: Boolean,
            required: true,
        },
        rangeInput: {
            type: Object,
            required: false,
            default() {
                return {};
            },
        },
        searchable: {
            type: Boolean,
            required: false,
        },
        sort: {
            type: Object,
            required: true,
        },
        source: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            isShowingMore: false,
            facetSearch: '',
        };
    },
    methods: {
        ariaLabel({ isRefined, value }) {
            return `${
                isRefined ? `Remove filter by ${value}` : `Filter by ${value}`
            }`;
        },
        filterToggleAriaLabel(filterOptionsQty, filterHeading) {
            return this.isShowingMore
                ? 'Show fewer'
                : `Show all ${filterOptionsQty} ${filterHeading} options`;
        },
        shouldShowList(items) {
            const isBrand = this.title === 'Brand';

            if (items.length <= 1 && isBrand && this.facetSearch === '') {
                return false;
            }
            return true;
        },
        toggleShowMore() {
            this.isShowingMore = !this.isShowingMore;
        },
        canToggleShowMore(filterOptionCount) {
            return (
                filterOptionCount > this.$config.productGridShowMoreThreshold
            );
        },
        isFilterOptionHidden(filterOptionIndex, filterOptionsQty) {
            return (
                this.canToggleShowMore(filterOptionsQty) &&
                !this.isShowingMore &&
                filterOptionIndex >=
                    this.$config.productGridShowMoreCollapsedSize
            );
        },
        getFilterToggleText(filterOptionsQty) {
            if (this.canToggleShowMore(filterOptionsQty)) {
                if (this.isShowingMore) {
                    return 'Show fewer';
                }

                return `Show all ${filterOptionsQty}`;
            }

            return '';
        },
        sortItems(items) {
            const comparator = new Comparator(this.sort.dir);
            let comparer = comparator.compareByNameNum;

            if (this.sort.type === 'range') {
                comparer = comparator.compareByNumberRange;
            } else if (this.sort.type === 'count' && !this.isShowingMore) {
                comparer = comparator.compareByCount;
            } else if (this.sort.type === 'count' && this.isShowingMore) {
                comparator.setSortDirection('asc');
            }

            /**
             * Sorting the items array directly will alter the original array and
             * cause Algolia "infinite update loop" warnings to occur. By copying
             * the array, we can sort without worry. Because we don't change anything
             * about the items themselves, we don't need to worry that this is not a
             * deep copy.
             */
            const sortableItems = [...items];
            return sortableItems.sort(comparer);
        },
        shouldShowSearch(filterOptionCount) {
            return (
                filterOptionCount > this.$config.searchFieldShowThreshold ||
                this.facetSearch !== ''
            );
        },
    },
};
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
.site-search__submit {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: none;
    border: 0;
    border-radius: 3px 0 0 3px;
    color: rgba(46, 45, 43, 0.8);
    cursor: pointer;
    height: 100%;
    left: 0;
    padding: 0;
    position: absolute;
    top: 0;
    width: 40px;
}

.filter-list {
    color: color('base');
    font-size: 1.4rem;

    /** recompile */
    &--hidden {
        display: none;
    }

    ul {
        list-style: none;
        max-height: 470px;
        overflow: hidden auto;
    }

    &__item {
        padding: 3px 0;

        &--checked .filter-list__link {
            &::before,
            &:hover::before {
                background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -10 100 100"><path d="M34.964 75.673a8.288 8.288 0 01-6.391-2.739L3.011 47.372c-9.129-9.129 4.565-22.823 13.694-13.694l18.259 18.259 49.3-49.3c9.129-8.216 22.823 4.565 13.694 13.694l-55.691 55.69c-2.7 2.701-4.564 3.652-7.303 3.652z" fill="white"/></svg>');
                background-color: color('blue');
                border-color: color('blue');
            }
        }

        &--hidden {
            display: none;
        }
    }

    &__link {
        color: inherit;
        display: block;
        padding: 5px 0 5px 15px;
        position: relative;
        text-decoration: none;

        &:link,
        &:visited {
            color: color('base');
        }

        &::before {
            background: color('white');
            border: 1px solid color('gray');
            border-radius: 0;
            color: color('white');
            content: '';
            display: block;
            float: left;
            height: 15px;
            left: 0;
            margin: 0;
            position: absolute;
            text-align: center;
            top: 5px;
            transition: all 0.2s ease;
            width: 15px;

            @media (max-width: 480px) {
                top: 7px;
            }
        }

        &:hover {
            .filter-list__label {
                color: color('blue');
                text-decoration: underline;
            }

            &::before {
                border-color: color('blue');
            }
        }
    }

    &__count {
        color: color('gray');
        padding-left: 4px;
    }

    &__label {
        padding-left: 8px;
    }

    &__toggle {
        &.flat-secondary-small {
            background-color: #f2f1f0;
            border: none;
            border-radius: 4px;
            color: #2e2e2d;
            cursor: pointer;
            height: 3.2rem;
            margin: 1rem 0;
            padding-left: 1.6rem;
            padding-right: 1.6rem;

            &:hover {
                background-color: #e5e4e3;
            }
        }
    }
}
</style>
