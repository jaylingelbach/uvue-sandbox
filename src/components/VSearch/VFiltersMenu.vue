<template>
    <div :class="['filters-menu', { 'filters-menu--active': !isCollapsed }]">
        <!-- Button option for dynamic control of  -->
        <button
            aria-controls="VFiltersMenu-filters"
            :aria-expanded="!isCollapsed ? 'true' : 'false'"
            aria-label="Search refinement filters"
            aria-haspopup="true"
            class="filters-menu__header filters-menu__header--control"
            data-testid="filters-menu__header--control"
            @click="setCollapsedFlag(!isCollapsed)"
        >
            <VBulletedListIcon class="filters-menu__filter-icon" />
            <h2 class="filters-menu__heading">Filters</h2>
            <span
                class="filters-menu__arrow"
                data-testid="filters-menu__arrow"
            ></span>
        </button>
        <!-- Non-button option for static presentation -->
        <div
            class="filters-menu__header filters-menu__header--static"
            data-testid="filters-menu__header--static"
        >
            <h2 class="filters-menu__heading">Filters</h2>
        </div>
        <div
            id="VFiltersMenu-filters"
            class="filters-menu__filters"
            data-testid="filters-menu__filters"
        >
            <VSelectedFilters class="filters-menu__selected-filters" />
            <slot />
        </div>
    </div>
</template>

<script>
import VBulletedListIcon from '@/components/icons/VBulletedListIcon.vue';

import VSelectedFilters from '@/components/VSearch/VSelectedFilters.vue';

export default {
    name: 'VFiltersMenu',
    components: {
        VBulletedListIcon,
        VSelectedFilters,
    },
    data() {
        return {
            // Indicates if options are collapsed (true) or expanded (false)
            isCollapsed: true,
        };
    },
    beforeDestroy() {
        // Since we're manating our own global event handlers, remove them when tearing
        // down the component so we don't create a memory leak.
        this.removeGlobalHandlers();
    },
    methods: {
        setCollapsedFlag(state) {
            // If the state isn't really changing, do nothing
            if (state === this.isCollapsed) {
                return;
            }

            if (state === true) {
                this.isCollapsed = true;
                this.removeGlobalHandlers();
            } else {
                this.isCollapsed = false;
                this.setGlobalHandlers();
            }
            this.$emit('filtersMenuCollapsed', this.isCollapsed);
        },
        handleOutsideEsc(event) {
            if (event.key === 'Escape') {
                this.setCollapsedFlag(true);
            }
        },
        setGlobalHandlers() {
            document.addEventListener('keyup', this.handleOutsideEsc);
        },
        removeGlobalHandlers() {
            document.removeEventListener('keyup', this.handleOutsideEsc);
        },
    },
};
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
.filters-menu {
    padding: 1.6rem 1.6rem 0;

    &__header {
        align-items: center;
        background: none;
        border: none;
        border-radius: 4px;
        display: flex;
        justify-content: flex-start;
        line-height: 1;
        width: 100%;

        h2 {
            font-size: 1.6rem;
            margin: 0;
        }
    }

    &__heading {
        display: inline-block;
        line-height: 2rem;
        padding: 1.6rem 1.6rem 1.6rem 0.8rem;
    }

    &__filter-icon {
        padding: 1.6rem 0 1.6rem 1.6rem;
    }

    &__arrow {
        background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 878 512"%3E%3Cdefs/%3E%3Cpath fill="%232e2d2b" d="M382.8 451.7l55.1 55.1L879.3 65.1 824.2 9.9 438 396.1 53.4 12.1l-55 55.2 384.4 384.4z"/%3E%3C/svg%3E');
        background-repeat: no-repeat;
        background-size: contain;
        display: inline-block;
        height: 10px;
        position: relative;
        top: 2px;
        transform: rotate(0) translateY(0);
        transition: all 0.2s ease-in-out;
        width: 10px;
    }

    &__apply-button {
        margin: 4rem auto 2rem;
    }

    &--active {
        .filters-menu__arrow {
            transform: rotate(-180deg) translateY(4px);
        }

        .filters-menu__filters {
            display: block;
        }
    }
}

// Demo:
// These styles can be moved to VProductFilter (or similar) when created
.product-filter {
    border: none;
    margin: 1rem 0;

    legend {
        font-size: 1.8rem;
        font-weight: 600;
    }

    &__option {
        cursor: pointer;
        display: block;
        margin: 0.5rem 0;

        input[type='checkbox'] {
            margin: 0 0.5rem;
        }
    }
}
</style>
