import qs from 'qs';
import algoliasearchHelper from 'algoliasearch-helper';
import algoliaSearchIndex from '../modules/algoliaSearchIndex';
import combineFacets from '../modules/combineFacets';

const returnQueryString = params => {
    return qs.stringify(params, {
        addQueryPrefix: true,
        arrayFormat: 'repeat',
    });
};

// eslint-disable-next-line consistent-return
const redirectMinimumPage = ({ redirect, route }) => {
    const { page, ...params } = route.query;
    const currentPage = parseInt(page || 1);
    if (currentPage < 1) {
        const queryString = returnQueryString(params);
        return redirect(`${route.path}${queryString}`, 301);
    }
};

// eslint-disable-next-line consistent-return
const resultErrorRedirect = ({ error, redirect, result, route }) => {
    const {
        hits: products,
        nbHits: totalProducts,
        nbPages: totalPages,
    } = result;
    const { page, ...params } = route.query;
    const currentPage = parseInt(page || 1);
    if (totalProducts === 0) {
        return error(new Error('No products found'), 404);
    } else if (totalProducts === 1) {
        const firstProductUrl = products.length ? products[0].url : '';
        if (firstProductUrl) {
            return redirect(firstProductUrl, 302);
        }
        return error(new Error('Product URL not found'), 404);
    } else if (currentPage > totalPages || currentPage <= 0) {
        const queryString = returnQueryString({
            ...params,
            ...(currentPage > totalPages && { page: totalPages }),
        });
        return redirect(`${route.path}${queryString}`, 302);
    }
};

const showFallback = ({
    error,
    fallbackReason,
    fallbackRedirect,
    logger,
    redirect,
}) => {
    const { statusCode, url } = fallbackRedirect;
    if (statusCode && url) {
        logger.warn(`Redirecting to fallback: ${fallbackReason}`);
        return redirect(url, statusCode);
    }
    logger.error(
        `Showing 404 because no fallback redirect URL was found. Original reason for fallback: ${fallbackReason}`,
    );
    return error(new Error('Page not found'), 404);
};

const algoliaSearch = async ({ app, cmsPage, error, redirect, route }) => {
    const query = Object.keys(route.query).length && route.query.query;

    const searchParameters = {
        filters: 'section:main',
        hitsPerPage: app.$config.itemsPerPage,
    };

    let sectionArray = ['main'];

    // google observes case sensitivity therefore we will enforce a lowercase route
    if (cmsPage && cmsPage.route !== route.path) {
        const redirectUrl = route.fullPath.replace(route.path, cmsPage.route);
        return redirect(redirectUrl, 301);
    }

    let disjunctiveFacets = ['section'];

    // update searchParameters and sectionArray if series page
    if (
        cmsPage &&
        cmsPage.productSearchOptions &&
        cmsPage.productSearchOptions.appliedRefinements
    ) {
        const { section } = cmsPage.productSearchOptions.appliedRefinements;
        const data = await algoliaSearchIndex(section[0]);
        const userData = combineFacets(data.userData)[0].facets;

        // add userData facets to disjunctiveFacets removing empty elements
        disjunctiveFacets = userData.map(o => o.source).filter(Boolean);
        disjunctiveFacets.push('section');

        // update searchParameters prop for ProductGrid
        searchParameters.filters = section
            .map(s => `section:${s}`)
            .join(' AND ');
        sectionArray = section;

        // add searchParameters prop to ProductGrid
        const productGridIndex = cmsPage.content.findIndex(
            o => o.el === 'ProductGrid',
        );
        // eslint-disable-next-line no-param-reassign
        cmsPage.content[
            productGridIndex
        ].data.props.searchParameters = searchParameters;
        // build filters with userData for named slot
        const children = [];
        const l = userData.length;
        for (let i = 0; i < l; i++) {
            if (userData[i].type === 'list') {
                children.push({
                    isComponent: true,
                    el: 'VFilterList',
                    data: {
                        props: {
                            collapsed: userData[i].collapsed,
                            sort: userData[i].sort,
                            source: userData[i].source,
                            title: userData[i].title,
                        },
                    },
                });
            } else if (userData[i].type === 'single') {
                children.push({
                    isComponent: true,
                    el: 'VFilterSingleOption',
                    data: {
                        props: {
                            collapsed: userData[i].collapsed,
                            removeUrl: userData[i].removeUrl,
                            text: userData[i].text,
                        },
                    },
                });
            } else if (userData[i].type === 'swatch') {
                children.push({
                    isComponent: true,
                    el: 'VFilterColor',
                    data: {
                        props: {
                            collapsed: userData[i].collapsed,
                            source: userData[i].source,
                            title: userData[i].title,
                        },
                    },
                });
            } else if (userData[i].type === 'tree') {
                children.push({
                    isComponent: true,
                    el: 'VFilterHierarchical',
                    data: {
                        props: {
                            source: userData[i].source,
                        },
                    },
                });
            }
        }

        // eslint-disable-next-line no-param-reassign
        cmsPage.content[productGridIndex].children = [
            // add AisSearchBox to prevent ui state error log
            {
                isComponent: true,
                el: 'AisSearchBox',
                data: { style: { display: 'none' } },
            },
            // add filters to named slot
            {
                el: 'template',
                data: { slot: 'vFilterList' },
                children,
            },
        ];
    }
    const helper = algoliasearchHelper(
        app.instantsearch.client,
        app.$algoliaIndexName,
        {
            disjunctiveFacets,
            hitsPerPage: app.$config.itemsPerPage,
        },
    );
    helper.addDisjunctiveFacetRefinement('section', sectionArray);

    const result = await helper.searchOnce({
        ...(query && { query }),
    });

    if (result && result.content) {
        resultErrorRedirect({
            error,
            redirect,
            result: result.content,
            route,
        });
    }

    return {
        cmsPage,
        searchParameters,
    };
};

export {
    algoliaSearch,
    redirectMinimumPage,
    resultErrorRedirect,
    returnQueryString,
    showFallback,
};
