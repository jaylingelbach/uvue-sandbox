export default localeString => {
    let locales = [
        {
            code: 'en-US',
            language: 'en',
            country: 'US',
            quality: 1.0,
        },
    ];

    if (!localeString) return locales;

    /**
     * @note
     * Regex playground: https://regex101.com/r/TwbKtQ/2
     */
    const localeRegex = /([a-z]{2})(?:-[A-Z]{2})?(?:\s*;q=([0-1]\.[0-9]))?(?:\s*|$)/gi;
    const localeMatches = localeString.match(localeRegex);

    if (localeMatches) {
        locales = localeMatches.map(match => {
            const bits = match.split(';');
            const languageBits = bits[0].split('-');
            const quality = bits[1] && parseFloat(bits[1].split('=')[1]);
            const country = languageBits[1] && languageBits[1].toUpperCase();

            return {
                code: bits[0],
                country: country || null,
                language: languageBits[0],
                quality: quality || 1.0,
            };
        });
    }

    return locales;
};
