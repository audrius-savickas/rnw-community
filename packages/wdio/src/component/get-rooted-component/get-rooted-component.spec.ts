import { testID$ } from '../../command';
import { mockElement } from '../element.mock';

import { getRootedComponent } from './get-rooted-component';

enum RootedSelectorsEnum {
    Button = 'Selectors.Button',
    Root = 'Selectors.Root',
}

enum SelectorsWithoutRootEnum {
    Button = 'Selectors.Button',
}

class RootedComponent extends getRootedComponent(RootedSelectorsEnum) {}

jest.mock('../../command', () => ({
    testID$: jest.fn(() => Promise.resolve(mockElement)),
    testID$$: jest.fn(() => Promise.resolve([mockElement])),
    testID$$Index: jest.fn(() => Promise.resolve(mockElement)),
}));

/*
 * TODO: Add root methods test
 */
describe('getRootedComponent', () => {
    it('should throw an error if no root selector is passed nor Root enum key exists', () => {
        expect.assertions(1);

        expect(() => new (getRootedComponent(SelectorsWithoutRootEnum))()).toThrow(
            'Cannot create RootedVisibleComponent - Neither root selector not root element is passed'
        );
    });

    it('should use Root enum selector as VisibleComponent RootEl', async () => {
        expect.assertions(2);

        const component = new RootedComponent();

        await component.Button.el();

        expect(testID$).toHaveBeenNthCalledWith(1, RootedSelectorsEnum.Root);
        expect(testID$).toHaveBeenNthCalledWith(2, RootedSelectorsEnum.Button, expect.objectContaining({}));
    });
});
