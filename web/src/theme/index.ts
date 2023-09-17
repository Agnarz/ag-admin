import { MantineThemeOverride } from '@mantine/core';

export const theme: MantineThemeOverride = {
  colors: {
    ag: ['#b1bac4', '#8b949e', '#6e7681', '#484f58', '#30363d', '#21262d', '#161b22', '#0d1117', '#010409']
  },
  colorScheme: 'dark',
  primaryColor: 'blue',
  primaryShade: 9,
  fontFamily: 'Roboto, sans-serif',
  shadows: { sm: '1px 1px 3px rgba(0, 0, 0, 0.5)' },
  headings: { fontFamily: 'Roboto' },
  focusRing: 'never',
  components: {
    Checkbox: {
      styles: {
        input: { background: '#ffffff14' },
      }
    },
    TextInput: {
      styles: {
        input: { background: '#ffffff14', borderColor: '#ffffff14' },
      }
    },
    NumberInput: {
      styles: {
        input: { background: '#ffffff14', borderColor: '#ffffff14' },
        controlDown: { borderColor: '#ffffff14' },
        controlUp: { borderColor: '#ffffff14' },
      }
    },
    Select: {
      styles: {
        input: { background: '#ffffff14', borderColor: '#ffffff14' },
        itemsWrapper: { background: '#0d1117' },
      }
    },
    MultiSelect: {
      styles: {
        input: { background: '#ffffff14', borderColor: '#ffffff14' },
        itemsWrapper: { background: '#0d1117' },
      }
    },
    Autocomplete: {
      styles: {
        input: { background: '#ffffff14', borderColor: '#ffffff14' },
        itemsWrapper: { background: '#0d1117' },
      }
    },
    Text: {
      styles: {
        root: { color: '#c1c2c5' },
      }
    },
    Slider: {
      styles: {
        marksContainer: { color: '#c1c2c5' },
        markWrapper: { color: '#c1c2c5' },
      }
    },
  }
}
// Customizations
// https://mantine.dev/theming/customization
// https://mantine.dev/theming/theming-context
// https://mantine.dev/theming/color-scheme

