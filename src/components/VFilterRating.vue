<template>
    <AisRatingMenu attribute="rating" :max="5">
        <ul slot-scope="{ createURL, refine, items }">
            <li v-for="item in items" :key="item.value">
                <a
                    :href="createURL(item.value)"
                    :style="{ color: item.isRefined ? 'gold' : 'black' }"
                    @click.prevent="refine(item.value)"
                >
                    <span v-for="(full, index) in item.stars" :key="index">
                        <!-- eslint-disable -->
                        {{
                        full ? '★' : '☆'
                        }}
                    </span>
                    ({{ item.count }})
                </a>
            </li>
        </ul>
    </AisRatingMenu>
</template>

<script>
import { AisRatingMenu } from 'vue-instantsearch';

export default {
    name: 'VFilterRating',
    components: {
        AisRatingMenu,
    },
};
</script>
