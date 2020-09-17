export default class Comparator {
    constructor(sortDirection) {
        this.setSortDirection(sortDirection);

        // We need to bind each method to `this` to maintain proper context
        // so that we don't lose reference to `sortDirection`
        this.setSortDirection = this.setSortDirection.bind(this);
        this.compareByCount = this.compareByCount.bind(this);
        this.compareByNameNum = this.compareByNameNum.bind(this);
        this.compareByNumberRange = this.compareByNumberRange.bind(this);
    }

    setSortDirection(sortDirection) {
        this.sortDirection = sortDirection === 'asc' ? 1 : -1;
    }

    compareByCount(a, b) {
        const aCount = a.count;
        const bCount = b.count;

        if (aCount < bCount) {
            return -1 * this.sortDirection;
        } else if (aCount > bCount) {
            return 1 * this.sortDirection;
        }

        // Counts are equal so sort by refinement label
        /**
         * Since we're comparing labels within the count sort,
         * set the sort direction to 'asc' to force sorting by
         * name to be done alphetically ascending order.
         */
        const oldSortDirection = this.sortDirection;
        this.setSortDirection('asc');

        const result = this.compareByNameNum(a, b);

        // Set sort direction back
        this.sortDirection = oldSortDirection;

        return result;
    }

    compareByNumberRange(a, b) {
        const numberRegex = /([-+]?(?:[0-9]+(?:\.[0-9]+)?|(?:[0-9]+)?\.[0-9]+))/g;
        const aLabel = a.label;
        const bLabel = b.label;

        const aNumberMatches = aLabel.match(numberRegex);
        const bNumberMatches = bLabel.match(numberRegex);

        if (!aNumberMatches || !bNumberMatches) {
            throw new Error(
                'One or both items compared do not contain any numbers. Please make sure your labels contain a number range.',
            );
        }

        const aMatchesLength = aNumberMatches.length;
        const bMatchesLength = bNumberMatches.length;

        // Force Under to beginning and Over to end
        if (aMatchesLength === 1 || bMatchesLength === 1) {
            const underRegex = /\b(under|smaller|lower|below|up to)\b/gi;
            const overRegex = /\b(over|larger|higher|above|and up)\b/gi;

            const aUnderMatches = aLabel.match(underRegex);
            const bUnderMatches = bLabel.match(underRegex);

            // Don't search for over matches if an under match has already been found
            const aOverMatches = !aUnderMatches && aLabel.match(overRegex);
            const bOverMatches = !bUnderMatches && bLabel.match(overRegex);
            // eslint-disable
            if (
                (aUnderMatches && !bUnderMatches) ||
                (bOverMatches && !aOverMatches)
            ) {
                return -1 * this.sortDirection;
            } else if (
                (aOverMatches && !bOverMatches) ||
                (bUnderMatches && !aUnderMatches)
            ) {
                return 1 * this.sortDirection;
            }
        }

        // No Over or Under so compare the last numbers found in number matches (last number corresponds to last number in range)
        const aLast = parseFloat(aNumberMatches[aMatchesLength - 1]);
        const bLast = parseFloat(bNumberMatches[bMatchesLength - 1]);
        if (aLast < bLast) {
            return -1 * this.sortDirection;
        } else if (aLast > bLast) {
            return 1 * this.sortDirection;
        }
        return 0;
    }

    compareByNameNum(a, b) {
        const aName = a.label;
        const bName = b.label;
        const collator = new Intl.Collator('en', {
            numeric: true,
            sensitivity: 'base',
        });
        const collatorResult = collator.compare(aName, bName);
        return collatorResult * this.sortDirection;
    }
}
