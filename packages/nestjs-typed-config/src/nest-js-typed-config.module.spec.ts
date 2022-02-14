import Joi from 'joi';

import { NestJSTypedConfigModule } from './nest-js-typed-config.module';

import type { ObjectSchema } from 'joi';

enum EnvironmentVariablesEnum {
    ENVIRONMENT_VARIABLE = 'ENVIRONMENT_VARIABLE',
}

interface EnvironmentVariablesInterface {
    [EnvironmentVariablesEnum.ENVIRONMENT_VARIABLE]: string;
}

describe('NestJSTypedConfigModule', () => {
    it('should create type config module with exported service', () => {
        expect.assertions(3);

        const validationSchema = Joi.object({});

        const [ConfigModule, ConfigService] = NestJSTypedConfigModule.create<
            EnvironmentVariablesEnum,
            EnvironmentVariablesInterface
        >(validationSchema as ObjectSchema<EnvironmentVariablesInterface>);

        expect(ConfigModule.exports).toContain(ConfigService);
        expect(ConfigModule.providers).toContain(ConfigService);
        expect(typeof ConfigService === 'function').toBeTruthy();
    });

    it('should successfully be created if required environment variable is set', () => {
        expect.assertions(1);

        const validationSchema = Joi.object({
            [EnvironmentVariablesEnum.ENVIRONMENT_VARIABLE]: Joi.string().required(),
        });

        process.env[EnvironmentVariablesEnum.ENVIRONMENT_VARIABLE] = 'value';

        expect(() =>
            NestJSTypedConfigModule.create<EnvironmentVariablesEnum, EnvironmentVariablesInterface>(
                validationSchema as ObjectSchema<EnvironmentVariablesInterface>
            )
        ).not.toThrow();

        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete process.env[EnvironmentVariablesEnum.ENVIRONMENT_VARIABLE];
    });

    it('should throw an error if required environment variable is not set', () => {
        expect.assertions(1);

        const validationSchema = Joi.object({
            [EnvironmentVariablesEnum.ENVIRONMENT_VARIABLE]: Joi.string().required(),
        });

        expect(() =>
            NestJSTypedConfigModule.create<EnvironmentVariablesEnum, EnvironmentVariablesInterface>(
                validationSchema as ObjectSchema<EnvironmentVariablesInterface>
            )
        ).toThrow(`Config validation error: "${EnvironmentVariablesEnum.ENVIRONMENT_VARIABLE}" is required`);
    });
});
