<template>
    <AisHierarchicalMenu
        :attributes="source"
        :class-names="classNames"
        :show-parent-level="false"
        :sort-by="['isRefined', 'count:desc']"
    >
        <template slot-scope="{ createURL, items, refine }">
            <FilterUIBehaviors v-if="items.length" heading="Category">
                <!-- eslint-disable-next-line vue/attribute-hyphenation -->
                <HierarchicalList :createURL="createURL" :items="items" :refine="refine" />
            </FilterUIBehaviors>
        </template>
    </AisHierarchicalMenu>
</template>

<script>
import { AisHierarchicalMenu } from 'vue-instantsearch';
import FilterUIBehaviors from '@/components/VSearch/FilterUIBehaviors.vue';
import HierarchicalList from './HierarchicalList.vue';

export default {
    name: 'VFilterHierarchical',
    components: {
        AisHierarchicalMenu,
        FilterUIBehaviors,
        HierarchicalList,
    },
    props: {
        source: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            classNames: {
                'ais-HierarchicalMenu': 'filter',
            },
        };
    },
};
</script>
