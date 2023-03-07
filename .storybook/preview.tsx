import { Preview } from '@storybook/react';

const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    expanded: true, // Adds the description and default columns
    matchers: {
      color: /(background)$/i,
      date: /Date$/,
      text: /label$/i
    }
  }
};

const globalTypes = {
  locale: {
    name: 'Locale',
    description: 'Internationalization locale',
    defaultValue: 'en',
    toolbar: {
      icon: 'globe',
      items: [{ value: 'en', right: '🇺🇸', title: 'English' }]
    }
  }
};

const preview: Preview = {
  parameters,
  globalTypes
};

export default preview;
