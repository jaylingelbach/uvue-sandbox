export const returnUniqueSorted = arr => {
    // check if incoming value is an array and has length
    if (Array.isArray(arr) && arr.length) {
        // sort by position ascending; then title ascending
        arr.sort((a, b) => {
            // in case of position null use facet with position
            // eslint-disable
            if (
                typeof a.position === 'number' &&
                typeof b.position !== 'number'
            ) {
                return -1;
            } else if (
                typeof a.position !== 'number' &&
                typeof b.position === 'number'
            ) {
                return 1;
            }
            return (
                a.position - b.position ||
                (a.title && a.title.localeCompare(b.title))
            );
        });
        // return unique array
        return Array.from(new Set(arr.map(o => o.title))).map(title =>
            arr.find(o => o.title === title),
        );
    }
    // return empty array
    return [];
};

const combineFacets = userData => {
    // check if incoming value is an array
    if (Array.isArray(userData)) {
        // set array length to constant
        const userDataLength = userData.length;

        // declare facets
        let defaultFacets = [];
        let facets = [];

        for (let i = 0; i < userDataLength; i++) {
            // ensure object has property defaultFacets
            if (
                Object.prototype.hasOwnProperty.call(
                    userData[i],
                    'defaultFacets',
                )
            ) {
                // set array length to constant
                const defaultFacetsLength = userData[i].defaultFacets.length;

                // ensure defaultFacets has length
                if (defaultFacetsLength) {
                    for (let k = 0; k < defaultFacetsLength; k++) {
                        // ensure object has keys
                        if (Object.keys(userData[i].defaultFacets[k]).length) {
                            // add to defaultFacets array
                            defaultFacets.push(userData[i].defaultFacets[k]);
                        }
                    }
                }
            }

            // ensure object has property facets
            if (Object.prototype.hasOwnProperty.call(userData[i], 'facets')) {
                // set array length to constant
                const facetsLength = userData[i].facets.length;

                // ensure defaultFacets has length
                if (facetsLength) {
                    for (let k = 0; k < facetsLength; k++) {
                        // ensure object has keys
                        if (Object.keys(userData[i].facets[k]).length) {
                            // add to facets array
                            facets.push(userData[i].facets[k]);
                        }
                    }
                }
            }
        }

        // sort facets
        defaultFacets = returnUniqueSorted(defaultFacets);
        facets = returnUniqueSorted(facets);

        // filter title undefined or empty string
        defaultFacets = defaultFacets.filter(o => o.title && o.title !== '');
        facets = facets.filter(o => o.title && o.title !== '');

        // filter position null
        const arr1 = defaultFacets.filter(o => o.position);
        const arr2 = facets.filter(o => o.position);
        const arr3 = defaultFacets.filter(o => !o.position);
        const arr4 = facets.filter(o => !o.position);

        // return unique sorted facets
        return [{ facets: [...arr1, ...arr2, ...arr3, ...arr4] }];
    }

    // return fallback userData array
    return [{ facets: [] }];
};

export default combineFacets;
