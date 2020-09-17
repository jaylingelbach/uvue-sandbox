<template functional>
    <ul class="filter__list">
        <li v-for="item in props.items" :key="item.value" class="filter__item" data-testid="filter-item">
            <a
                :href="props.createURL(item.value)"
                :aria-label="item.isRefined ? 'Remove filter by ' + item.label : 'Filter by ' + item.label"
                :class="[
                    'filter__link',
                    {
                        'filter__link--selected': item.isRefined,
                        'filter__link--deselected': !item.isRefined,
                        'filter__link--has-children': item.data && item.data.length,
                    },
                ]"
                data-testid="filter-link"
                @click.prevent="props.refine(item.value)"
            >
                <span class="filter__icon" data-testid="filter-icon" />
                <span>
                    <span class="filter__label" data-testid="filter-label">{{ item.label }}</span>
                    <span v-if="item.count" class="filter__count" data-testid="filter-count"
                        >({{ item.count.toLocaleString() }})</span
                    >
                </span>
            </a>
            <!-- eslint-disable-next-line vue/attribute-hyphenation -->
            <HierarchicalList v-if="item.data" :createURL="props.createURL" :items="item.data" :refine="props.refine" />
        </li>
    </ul>
</template>

<script>
export default {
    name: 'HierarchicalList',
};
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
.filter {
    &__count {
        color: color('gray');
        font-size: 1.2rem;
        padding-left: 4px;
    }

    &__link {
        align-items: baseline;
        display: flex;
        padding: 5px 0;

        &--selected {
            .filter__label {
                font-weight: 700;
            }
        }
    }

    &__list {
        list-style: none;
    }

    &__item {
        .filter__item {
            padding-left: 8px;
        }

        a,
        a:link,
        a:visited {
            color: color('base');
            font-size: 1.4rem;
            position: relative;
            text-decoration: none;
        }
    }
}

.filter__link--has-children.filter__link--selected + .filter__list > .filter__item > .filter__link {
    // stylelint-disable-next-line selector-max-compound-selectors
    .filter__icon {
        height: 10px;
        width: 10px;
    }
}

.filter__link--has-children.filter__link--selected {
    .filter__icon {
        content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path d="M6 24 L58 24 L32 48 Z" fill="black" /></svg>');
        height: 10px;
        margin-right: 2px;
        width: 10px;
    }
}
</style>
