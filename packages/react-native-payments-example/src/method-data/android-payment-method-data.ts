import { EnvironmentEnum } from '@rnw-community/react-native-payments/src';

import {
    AndroidAllowedAuthMethodsEnum,
    type AndroidPaymentMethodDataInterface,
    PaymentMethodNameEnum,
    SupportedNetworkEnum,
} from '@rnw-community/react-native-payments';

export const androidPaymentMethodData: AndroidPaymentMethodDataInterface = {
    data: {
        requestBilling: true,
        requestShipping: true,
        requestEmail: true,
        environment: __DEV__ ? EnvironmentEnum.TEST : EnvironmentEnum.PRODUCTION,
        // USD: will not show total and merchantInfo
        currencyCode: 'EUR',
        supportedNetworks: [SupportedNetworkEnum.Visa, SupportedNetworkEnum.Mastercard],
        // HINT: default allowedAuthMethods is both PAN_ONLY and CRYPTOGRAM_3DS
        allowedAuthMethods: [AndroidAllowedAuthMethodsEnum.PAN_ONLY],
        /*
         * HINT: Android gateway configuration, ask your payment provider, Google Pay should support it
         * https://developers.google.com/pay/api/android/reference/request-objects#gateway
         */
        gatewayConfig: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId',
        },
    },
    supportedMethods: PaymentMethodNameEnum.AndroidPay,
};
