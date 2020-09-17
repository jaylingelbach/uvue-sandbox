<template>
    <AisRefinementList
        :limit="$config.colorSwatches.length"
        :attribute="source"
        class="filter-color"
        data-testid="VFilterColor.component"
    >
        <!-- eslint-disable -->
        <template slot-scope="{ createURL, refine, items, items: { length: optionsQty } }">
            <FilterUIBehaviors v-if="optionsQty" :heading="title" :init-collapsed="collapsed">
                <ul>
                    <li
                        v-for="swatch in $config.colorSwatches"
                        :key="swatch.id"
                        class="filter-color__item"
                        data-testid="VFilterColor.filterOption"
                    >
                        <a
                            v-if="isAvailableColor(swatch.id, items)"
                            :href="createURL(swatch.id)"
                            data-testid="VFilterColor.activeColor"
                            :aria-label="getAriaLabel(isSelectedColor(swatch.id, items), swatch.name)"
                            role="button"
                            @click.prevent="refine(swatch.id)"
                        >
                            <span
                                :class="[
                                    'filter-color__swatch',
                                    { 'filter-color__swatch--selected': isSelectedColor(swatch.id, items) },
                                ]"
                                :style="{ 'background-color': swatch.hex }"
                                :title="`${swatch.name} (${getProductCount(swatch.id, items)})`"
                            ></span>
                        </a>

                        <span
                            v-else
                            data-testid="VFilterColor.disabledColor"
                            class="filter-color__swatch filter-color__swatch--disabled"
                            :style="{ 'background-color': swatch.hex }"
                            :title="`${swatch.name} (0)`"
                        ></span>
                    </li>
                </ul>
            </FilterUIBehaviors>
        </template>
    </AisRefinementList>
</template>

<script>
import { AisRefinementList } from 'vue-instantsearch';
import FilterUIBehaviors from '@/components/VSearch/FilterUIBehaviors.vue';

export default {
    name: 'VFilterColor',
    components: {
        AisRefinementList,
        FilterUIBehaviors,
    },
    props: {
        collapsed: {
            type: Boolean,
            required: false,
            default: false,
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
    methods: {
        getAriaLabel(isSelected, colorName) {
            if (isSelected) {
                return `Remove filter by color ${colorName}`;
            }
            return `Filter by color ${colorName}`;
        },
        getProductCount(colorId, filterOptions) {
            const filterOption = filterOptions.find(
                option => option.value === colorId,
            );
            if (filterOption) {
                return filterOption.count;
            }
            return 0;
        },
        isAvailableColor(colorId, filterOptions) {
            return (
                filterOptions.find(option => option.value === colorId) !==
                undefined
            );
        },
        isSelectedColor(colorId, filterOptions) {
            const filterOption = filterOptions.find(
                option => option.value === colorId,
            );
            return filterOption ? filterOption.isRefined : false;
        },
    },
};
</script>
<style rel="stylesheet/scss" type="text/scss" lang="scss" scoped>
.filter-color {
    &__item {
        display: inline-block;
        height: 34px;
        margin: 0 1.15rem 1.15rem 0;
        width: 34px;

        a {
            display: block;
            height: 100%;
            width: 100%;
        }
    }

    &__swatch {
        box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
        display: inline-block;
        height: 100%;
        width: 100%;

        &--disabled {
            background: url('data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNMzAuODA1LTEuMjhsLTMyLjE3IDMyLjEyOCAyMjUuMTk1IDIyNS4xNTItMjI0LjEyOCAyMjQuMTcxIDMyLjE3IDMyLjE3MSAyMjQuMTI4LTIyNC4xMjggMjI0LjEyOCAyMjQuMTI4IDMyLjE3MS0zMi4xNzEtMjI0LjEyOC0yMjQuMTcxIDIyNS4xOTUtMjI1LjE1Mi0zMi4xNzEtMzIuMTctMjI1LjE5NSAyMjUuMDI0LTIyNS4xOTUtMjI0Ljk4MnoiPjwvcGF0aD48L3N2Zz4=no-repeatcentercenter/80%auto');
            background-position: center;
            background-repeat: no-repeat;
            background-size: 75%;
            opacity: 0.4;
        }

        &--selected {
            box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.21) inset,
                0 0 0 3px #fff inset, 0 0 0 4px rgba(0, 0, 0, 0.15) inset;
            position: relative;
        }

        &--selected::before {
            background: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBkPSJNMjU2IDQwLjk2QzEzNy4yMTYgNDAuOTYgNDAuOTYgMTM3LjI2NyA0MC45NiAyNTZjMCAxMTguNzg0IDk2LjI4IDIxNS4wNCAyMTUuMDQgMjE1LjA0IDExOC43NiAwIDIxNS4wNC05Ni4yOCAyMTUuMDQtMjE1LjA0IDAtMTE4Ljc1OC05Ni4yOC0yMTUuMDQtMjE1LjA0LTIxNS4wNHpNMzAwLjI2MiAyNTZsNzguMzYyIDc4LjM2LTQ0LjI2MiA0NC4yNjNMMjU2IDMwMC4yNmwtNzguMzYyIDc4LjM2MkwxMzMuNCAzMzQuMzZsNzguMzM3LTc4LjM2Mi03OC4zMzYtNzguMzM2TDE3Ny42NCAxMzMuNCAyNTYgMjExLjczNmw3OC4zNi03OC4zMzYgNDQuMjYzIDQ0LjIzN0wzMDAuMjYgMjU2eiIgZmlsbD0iI0UxMzIzMyIvPjwvc3ZnPg==')
                no-repeat 0 0 / contain #fff;
            border-radius: 50%;
            content: '';
            height: 18px;
            left: -5px;
            position: absolute;
            top: -5px;
            width: 18px;
        }
    }
}
</style>
