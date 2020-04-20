import { combine, Enum } from '@rnw-community/object-field-tree';

export const getFont = (fontFamilyObj: Enum, fontSizeObj: Enum<string>, fontColorObj: Enum) => {
    // noinspection SuspiciousTypeOfGuard
    if (Object.values(fontSizeObj).some((item) => typeof item === 'number')) {
        throw new Error('fontSizeObj must have string values');
    }

    return combine(
        (fontFamily, fontSize, color) => ({
            fontFamily: fontFamilyObj[fontFamily],
            fontSize: parseInt(fontSizeObj[fontSize], 10),
            color: fontColorObj[color],
        }),
        fontFamilyObj,
        fontSizeObj,
        fontColorObj
    );
};
