import { isDefined, isNotEmptyString } from '@rnw-community/shared';

import { WebSelectorConfig } from '../config';

import { Platform } from './get-platform.util';

import type { AndroidTestIDProps, TestIDProps, WebTestIDProps } from '../interface';

const isWebTestIDProps = (props: AndroidTestIDProps | TestIDProps | WebTestIDProps): props is Required<WebTestIDProps> =>
    WebSelectorConfig in props && isDefined(props[WebSelectorConfig]);

/**
 * Read testID field from platform specific TestID props generated by setTestID
 *
 * @see setTestID
 *
 * @params {AndroidTestIDProps | TestIDProps | WebTestIDProps} Props object
 * @params {string} Default TestID value
 * @returns TestID object field
 */
export const getTestID = (props: AndroidTestIDProps | TestIDProps | WebTestIDProps, defaultTesID = ''): string => {
    if (Platform.OS === 'web' && isWebTestIDProps(props)) {
        return props[WebSelectorConfig];
    } else if (isNotEmptyString(props.testID)) {
        return props.testID;
    }

    return defaultTesID;
};
