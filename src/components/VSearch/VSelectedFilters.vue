<template>
    <AisCurrentRefinements class="selected-filters">
        <template slot-scope="{ items, createURL }">
            <SelectedFiltersList :items="items" :create-url="createURL" />
        </template>
    </AisCurrentRefinements>
</template>

<script>
import { AisCurrentRefinements } from 'vue-instantsearch';
import SelectedFiltersList from './SelectedFiltersList.vue';

export default {
    name: 'VSelectedFilters',
    components: {
        AisCurrentRefinements,
        SelectedFiltersList,
    },
};
</script>
