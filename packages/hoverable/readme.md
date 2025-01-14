# React Native Hoverable

Bring hover and additional state to custom components and React Native components.

[![npm version](https://badge.fury.io/js/%40rnw-community%2Fhoverable.svg)](https://badge.fury.io/js/%40rnw-community%2Fhoverable)
[![npm downloads](https://img.shields.io/npm/dm/%40rnw-community%2Fhoverable.svg)](https://www.npmjs.com/package/%40rnw-community%2Fhoverable)

This package exposes `withHover` higher order component.

Following states and props will be added to the passed component:

| state    |      style prop |   state flag |
| -------- | --------------: | -----------: |
| Disabled | `disabledStyle` | `isDisabled` |
| Active   |   `activeStyle` |   `isActive` |
| Hovered  |    `hoverStyle` |  `isHovered` |
| Regular  |         `style` |              |

Component can only be in one state.

Hoverable components can be nested, giving ability to receive state from the parent Hoverable component.

### Example usage:

```tsx
import { HoverView, withHover } from '@rnw-community/hoverable';
import { Text } from 'react-native';

const TextComponent = ({ style }) => <Text style={style}>I am a component</Text>;

const HoverTextComponent = withHover(TextComponent);

const Example = () => (
    <HoverView>
        <HoverTextComponent hoverStyle={{ backgroundColor: 'red' }} />
        <HoverTextComponent hoverStyle={{ backgroundColor: 'green' }} />
    </HoverView>
);
```

## License

This library is licensed under The [MIT License](./LICENSE.md).
