import parseLocales from './parseLocales';

export default locale => {
    const locales = parseLocales(locale);
    const uniqueLanguages = [...new Set(locales.map(locale => locale.language.toLowerCase()))];
    const accepts = (languages = []) => {
        if (languages.length === 0) {
            return false;
        }

        const result = languages.every(language => {
            // eslint-disable-next-line no-param-reassign
            language = language.toLowerCase();

            return uniqueLanguages.includes(language);
        });

        return result;
    };

    return {
        accepts,
        acceptsMultipleLanguages: uniqueLanguages.length > 1,
        available: locales,
        primary: locales[0],
        uniqueLanguages,
    };
};
