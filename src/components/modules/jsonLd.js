const jsonLd = {
    // Products
    getProductCollectionPageLd(pageId, items) {
        // Build item array
        const jsonObject = {
            // Grid level stuff
            '@context': 'http://schema.org',
            '@type': 'CollectionPage',
            '@id': pageId,
            mainEntity: {
                '@type': 'ItemList',
                itemListElement: this.getProductsLd(items),
            },
        };
        const jsonLd = JSON.stringify(jsonObject);
        return jsonLd;
    },
    getProductsLd(itemLd) {
        return itemLd.map(item => this.getProductLd(item));
    },
    getProductLd(item) {
        let itemLd = {
            '@type': 'Product',
            name: item.productName,
            productID: item.objectID,
            image: item.image && item.image.path,
            description: item.longDescription,
            url: item.url,
            brand: {
                '@type': 'Organization',
                name: item.brand,
            },
        };
        itemLd = this.getProductRating(item, itemLd);
        itemLd = this.getProductOffers(item, itemLd);

        return itemLd;
    },
    getProductRating(item, itemLd) {
        if (item.rating && item.rating.average && item.rating.count) {
            // eslint-disable-next-line no-param-reassign
            itemLd.aggregateRating = {
                '@type': 'AggregateRating',
                worstRating: 1,
                bestRating: 5,
                reviewCount: item.rating.count,
                ratingValue: item.rating.average,
            };
        }
        return itemLd;
    },
    getProductOffers(item, itemLd) {
        if (item.price) {
            // eslint-disable-next-line no-param-reassign
            itemLd.offers = {
                '@type': 'Offer',
                itemCondition: this.getProductCondition(item),
                priceCurrency: 'USD',
                price: item.price.finalPrice,
            };
        }
        return itemLd;
    },
    getProductCondition(item) {
        let condition = 'NewCondition';
        if (item.attributes.isAltCondition) {
            if (item.attributes.condition === 'Used' || item.attributes.condition === 'Demo') {
                condition = 'UsedCondition';
            }
            if (item.attributes.condition === 'B-Stock') {
                condition = 'RefurbishedCondition';
            }
        }
        return `https://schema.org/${condition}`;
    },

    // Breadcrumbs
    getBreadcrumbListLd(crumbs) {
        const jsonObject = {
            '@context': 'http://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: this.getBreadcrumbsLd(crumbs),
        };
        const jsonLd = JSON.stringify(jsonObject);
        return jsonLd;
    },
    getBreadcrumbsLd(crumbs) {
        return crumbs.map((crumb, index) => {
            return {
                '@type': 'ListItem',
                position: index + 1,
                name: crumb.text,
                url: crumb.href,
                item: {
                    '@type': 'Thing',
                    '@id': crumb.href,
                },
            };
        });
    },
};
export default jsonLd;
