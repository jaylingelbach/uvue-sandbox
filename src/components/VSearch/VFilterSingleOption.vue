<template>
    <FilterUIBehaviors :heading="title">
        <div class="single-filter">
            <a class="single-filter__link" :href="removeUrl" :aria-label="ariaLabel" :title="linkTitle">x</a>
            <span class="single-filter__text">{{ text }}</span>
        </div>
    </FilterUIBehaviors>
</template>

<script>
import FilterUIBehaviors from '@/components/VSearch/FilterUIBehaviors.vue';

export default {
    name: 'VFilterSingleOption',
    components: {
        FilterUIBehaviors,
    },
    props: {
        removeUrl: {
            type: String,
            required: true,
            default: '',
        },
        text: {
            type: String,
            required: true,
            default: '',
        },
        title: {
            type: String,
            required: true,
            default: '',
        },
    },
    computed: {
        linkTitle() {
            return `Remove ${this.title}: ${this.text}`;
        },
        ariaLabel() {
            return `Click to remove the ${this.title} filter: ${this.text}`;
        },
    },
};
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
.single-filter {
    align-items: center;
    display: flex;
    justify-content: flex-start;
    padding: 1rem;

    &__link {
        background-color: #ddd;
        border-radius: 2rem;
        color: #fff;
        font-size: 1rem;
        margin: 0;
        padding: 0 4px;
        text-align: center;
        text-decoration: none;
    }

    &__text {
        font-family: 'Sweetwater';
        font-size: 1.8rem;
        font-weight: 600;
        line-height: 1.1;
        margin-left: 1rem;
        padding: 0 15px 0 0;
    }
}
</style>
