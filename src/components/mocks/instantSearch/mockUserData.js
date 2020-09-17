import combineFacets from '../modules/combineFacets.js';

export default combineFacets([
    {
        defaultFacets: [
            {
                collapsed: false,
                position: 1,
                sort: { type: 'count', dir: 'desc' },
                source: [
                    'categories.lvl0',
                    'categories.lvl1',
                    'categories.lvl2',
                    'categories.lvl3',
                ],
                title: 'Categories',
                type: 'tree',
            },
            {
                collapsed: false,
                position: 2,
                searchable: true,
                sort: { type: 'count', dir: 'desc' },
                source: 'brand',
                title: 'Brand',
                type: 'list',
            },
            {
                collapsed: false,
                position: 3,
                rangeInput: {
                    source: 'price.finalPrice',
                    type: 'currency',
                    delineator: 'to',
                },
                sort: { type: 'range', dir: 'asc' },
                source: 'facets.Price Range',
                title: 'Price',
                type: 'list',
            },
            {
                collapsed: true,
                position: 4,
                sort: { type: 'name_num', dir: 'desc' },
                source: 'facets.Financing',
                title: 'Financing',
                type: 'list',
            },
        ],
        facets: [
            {
                collapsed: false,
                position: null,
                source: 'facets.color_code',
                title: 'Color',
                type: 'swatch',
            },
            {
                collapsed: true,
                position: null,
                sort: { type: 'yesno', dir: 'asc' },
                source: 'facets.In Stock',
                title: 'In Stock',
                type: 'list',
            },
            {
                collapsed: false,
                position: null,
                sort: null,
                source: null,
                title: 'Onsie',
                type: 'single',
                removeUrl: '/fender-player/series',
                text: 'Test Filter Option',
            },
        ],
    },
])[0].facets;
