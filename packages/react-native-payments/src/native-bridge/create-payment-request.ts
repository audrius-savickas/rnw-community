// TODO: Android has no implementation, do we need it? Can we improve the API?
import { isAndroid } from '@rnw-community/platform';
import { isDefined } from '@rnw-community/shared';

import { type PaymentOptions, emptyPaymentOptions } from '../interface/payment-options';

import type { PaymentDetailsInit } from '../interface/payment-details-init';
import type { PaymentMethodData } from '../interface/payment-method-data/payment-method-data';
import type { Spec } from '../NativePayments';

export const createPaymentRequest =
    (nativePayments: Spec) =>
    (
        methodData: PaymentMethodData,
        details: PaymentDetailsInit,
        options: PaymentOptions = emptyPaymentOptions
    ): Promise<void> =>
        new Promise((resolve, reject) => {
            /*
             * Android Pay doesn't a PaymentRequest interface on the
             * Java side.  So we create and show Android Pay when
             * the user calls `.show`.
             */
            if (isAndroid) {
                resolve();
            } else {
                nativePayments.createPaymentRequest(methodData, details, options, err => {
                    if (isDefined(err)) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
            }
        });