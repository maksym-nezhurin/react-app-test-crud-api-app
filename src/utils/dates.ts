interface IOptions extends Intl.DateTimeFormatOptions {
    locale?: string;
}

export const formatDate = (date: string, passedOptions: IOptions = {}) => {
    const { locale, ...dateOptions } = passedOptions;
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        ...dateOptions
    };
    return new Date(date).toLocaleDateString(locale, options);
};
