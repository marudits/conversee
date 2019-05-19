const NUMBER_FORMAT = new Intl.NumberFormat('en-US', { maximumFractionDigits: 8 });

export function numberWithComma(value) {
    if (!value) {
        return value;
    }

    let [number, unit] = value.toString().split(' ');
    const FRACTIONS_DIGIT = number.toString().split('.')[1];

    try {
        number = parseFloat(number);
    } catch (e) {
        //
    }

    let localeString = NUMBER_FORMAT.format(number);

    localeString = localeString.split('.')[0];
    if (FRACTIONS_DIGIT) {
        localeString = localeString + '.' + FRACTIONS_DIGIT;
    }

    return unit ? `${localeString} ${unit}` : localeString;
}