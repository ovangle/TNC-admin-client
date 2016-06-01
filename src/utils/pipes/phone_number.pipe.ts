
export const DIGIT_PLACEHOLDER = 'd';

/**
 * Formats a phone number using the given format.
 *
 * @param phoneNumber
 * A string containing an Australian phone number
 * @param format
 * The string to format. The ith 'd' character in the
 * format string is replaced by the ith digit in the
 * source string. All other characters are output from
 * the format string unchanged
 *
 * e.g.
 * The format string `'(dd) dddd dddd'` * * would, given
 * the input `'0243903089`', output `'(02) 4390 3089'`
 *
 * Givent he input `'0430543002'` the same output string
 * would format as `'(04) 3054 3002'`
 */
export function formatPhoneNumber(source: string, format: string) {
    // Remove any non numeric chars from the source string.
    source = source.replace(/\D/g, '');

    var formatted = '';
    var sourceIndex = 0, fmtIndex = 0;
    var fmtChar: string;

    for (; fmtIndex < format.length; fmtIndex++) {
        fmtChar = format.charAt(fmtIndex);

        if (sourceIndex >= source.length)
            break;
        var sourceChar = source.charAt(sourceIndex);

        if (fmtChar === DIGIT_PLACEHOLDER) {
            formatted += sourceChar;
            sourceIndex++;
        } else {
            formatted += fmtChar;
        }
    }
    
    if (fmtChar !== DIGIT_PLACEHOLDER) {
        formatted += fmtChar;
    }
    
    return formatted;
}

