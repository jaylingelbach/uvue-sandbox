import algoliasearch from 'algoliasearch/lite';

export default async function algoliaSearchIndex(series) {
    // eslint-disable
    const searchClient = algoliasearch(
        process.env.VUE_APP_ALGOLIA_APP_ID,
        process.env.VUE_APP_ALGOLIA_API_KEY,
    );
    const index = searchClient.initIndex(process.env.VUE_APP_ALGOLIA_INDEX);
    return index.search('', { ruleContexts: ['main', series] });
}
