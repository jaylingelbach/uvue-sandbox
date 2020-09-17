/**
 * A factory for generating a specified number of mock Algolia item objects.
 * By default, each one is unique in some key ways (brand, price, object ID etc.).
 * Any further modification to suit specific test needs can be done to the object(s)
 * after creating them.
 * @param { Number } qty Quantity of items desired in collection; default is one
 */
export default function getMockAlgoliaItems(qty = 1) {
    const mockAlgoliaItems = [];
    for (let i = 1; i <= qty; i++) {
        const mockItem = {
            brand: `Brand-${i}`,
            financing: [
                {
                    expires: '',
                    monthlyPayment: 28,
                    months: 24,
                    monthsMarker: '**',
                    paymentsMarker: '§',
                },
            ],
            image: {
                path: `/path/to/img${i}.jpg`,
                badge: '',
                version: '1.2.3.4',
            },
            longDescription: `This is a long description for item ${i}`,
            objectID: `SW-${i}`,
            specialOffer: {
                title: `Get free advice with every SW-${i}`,
                text: '',
                value: 20,
            },
            price: {
                catalogPrice: 99.99 + i,
                finalPrice: 99.99 + 1,
                hasPriceDrop: false,
                isSpecialPrice: false,
                quantityUnit: {
                    short: 'ea',
                    long: 'each',
                    plural: 'each',
                    code: '',
                },
                rebateAmount: 0,
            },
            productName: `Brand-${i} SW-${i}`,
            rating: {
                average: 4.5,
                count: 10,
                reviewUrl: `/store/detail/SW-${i}/addreview`,
            },
            url: `/store/detail/SW-${i}`,
            attributes: {
                parentItemId: '',
                hasFreeShipping: true,
                isNew: true,
                isNewArrival: false,
                condition: 'New',
                isAltCondition: false,
            },
        };
        mockAlgoliaItems.push(mockItem);
    }
    return mockAlgoliaItems;
}
