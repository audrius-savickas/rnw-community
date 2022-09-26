// eslint-disable-next-line max-classes-per-file
import { mockDefaultConfig } from '../../element.mock';
import { RootedComponent } from '../rooted-component';

import { getExtendedRootedComponent } from './get-extended-rooted-component';

enum ParentRootedSelectorsEnum {
    ParentButton = 'ParentRootedSelectorsEnum.ParentButton',
    Root = 'ParentRootedSelectorsEnum.Root',
}

enum RootedSelectorsEnum {
    Button = 'RootedSelectorsEnum.Button',
    Root = 'RootedSelectorsEnum.Root',
}

class ParentRootedComponent extends getExtendedRootedComponent(ParentRootedSelectorsEnum, RootedComponent) {}
class CustomRootedComponent extends getExtendedRootedComponent(RootedSelectorsEnum, ParentRootedComponent) {}

describe('getExtendedRootedComponent', () => {
    it('should call parent RootedComponent methods', async () => {
        expect.assertions(5);

        const component = new CustomRootedComponent();

        await component.RootEl;
        expect(mockDefaultConfig.elSelectorFn).toHaveBeenNthCalledWith(1, RootedSelectorsEnum.Root);

        await component.Button.el();
        expect(mockDefaultConfig.elSelectorFn).toHaveBeenNthCalledWith(2, RootedSelectorsEnum.Root);
        expect(mockDefaultConfig.elSelectorFn).toHaveBeenNthCalledWith(
            3,
            RootedSelectorsEnum.Button,
            expect.objectContaining({})
        );

        await component.ParentButton.el();
        expect(mockDefaultConfig.elSelectorFn).toHaveBeenNthCalledWith(4, RootedSelectorsEnum.Root);
        expect(mockDefaultConfig.elSelectorFn).toHaveBeenNthCalledWith(
            5,
            ParentRootedSelectorsEnum.ParentButton,
            expect.objectContaining({})
        );
    });
});
