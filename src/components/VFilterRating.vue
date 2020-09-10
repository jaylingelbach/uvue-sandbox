<template>
    <AisRatingMenu attribute="rating" :max="5">
        <template
            slot-scope="{
                createURL,
                refine,
                items,
                items: { length: optionsQty },
            }"
        >
            <FilterUIBehaviors v-if="optionsQty" heading="Rating">
                <ul>
                    <li v-for="item in items" :key="item.value">
                        <a
                            :href="createURL(item.value)"
                            :style="{
                                color: item.isRefined ? 'gold' : 'black',
                            }"
                            @click.prevent="refine(item.value)"
                        >
                            <span
                                v-for="(full, index) in item.stars"
                                :key="index"
                            >
                                <!-- eslint-disable -->
                                {{ full ? '★' : '☆' }}
                            </span>
                            ({{ item.count }})
                        </a>
                    </li>
                </ul>
            </FilterUIBehaviors>
        </template>
    </AisRatingMenu>
</template>

<script>
import { AisRatingMenu } from 'vue-instantsearch';
import FilterUIBehaviors from './FilterUIBehaviors';

export default {
    name: 'VFilterRating',
    components: {
        AisRatingMenu,
        FilterUIBehaviors,
    },
};
</script>
