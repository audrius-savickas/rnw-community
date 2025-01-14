import { mockElement } from '../../element.mock';
import { RootedComponentSelectorsMock } from '../../rooted-component/mocks/rooted-component-selectors.mock';

import { createRootedComponent$ } from './create-rooted-component$';

describe('createRootedComponent$', () => {
    it('should create RootedComponent instance with selectors and $* selector functions', async () => {
        expect.assertions(3);

        const component = createRootedComponent$(RootedComponentSelectorsMock, RootedComponentSelectorsMock.Root);

        await expect(component.Button.el()).resolves.toMatchObject(mockElement);
        await expect(component.Button.els()).resolves.toMatchObject([mockElement]);
        await expect(component.Button.byIdx(1)).resolves.toMatchObject(mockElement);
    });
});
