/**
 * A factory to generate filter options as made available through the scoped slot "items"
 * array.
 * https://www.algolia.com/doc/api-reference/widgets/refinement-list/vue/#customize-the-ui
 */
export function getFilterOptions(qty = 1, valuePrefix = '') {
    const filterOptions = [];
    for (let i = 1; i <= qty; i++) {
        filterOptions.push({
            count: 10 + i,
            isRefined: false,
            label: valuePrefix + i,
            value: valuePrefix + i,
        });
    }

    return filterOptions;
}

/**
 * Objects that are available as scope bound variables. These are exported independently
 * so they can be inspected easily. They should also be bound in the slot definition in
 * the template.
 * https://www.algolia.com/doc/api-reference/widgets/refinement-list/vue/#scope
 */
export const createURL = jest.fn(() => '#');
export const refine = jest.fn();
export const searchForItems = jest.fn();

export const aisRefinementListData = {
    createURL,
    items: getFilterOptions(2, 'TEST'),
    refine,
    searchForItems,
};

export const mockAisRefinementList = {
    name: 'AisRefinementList',
    template: `
        <div>
            <slot
                v-bind:createURL="createURL",
                v-bind:items="items",
                v-bind:refine="refine",
                v-bind:searchForItems="searchForItems",
            />
        </div>
    `,
    data() {
        return aisRefinementListData;
    },
};
