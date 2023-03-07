import { StorybookConfig } from '@storybook/nextjs';
import path from 'path';

const toPath = (filePath: string) => path.join(process.cwd(), filePath);

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.tsx',
    '../src/**/*.stories.@(ts|tsx)'
  ],
  addons: ['@storybook/addon-essentials', '@storybook/addon-links'],
  framework: {
    name: '@storybook/nextjs',
    options: {
      builder: {
        lazyCompilation: true,
        fsCache: true
      },
      nextConfigPath: toPath('next.config.js')
    }
  },
  staticDirs: ['../public'],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      // @ts-ignore
      allowSyntheticDefaultImports: false,
      // speeds up storybook build time
      esModuleInterop: false,
      // speeds up storybook build time
      shouldExtractLiteralValuesFromEnum: true,
      // makes union prop types like variant and size appear as select controls
      shouldRemoveUndefinedFromOptional: true,
      // makes string and boolean types that can be undefined appear as inputs and switches
      propFilter: (prop) =>
        prop.parent ? !/node_modules\/(?!@mui)/.test(prop.parent.fileName) : true
    }
  },
  webpackFinal: async (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...(config.resolve?.alias ?? {}),
          'next-i18next': 'react-i18next',
          '@emotion/core': toPath('node_modules/@emotion/react'),
          'emotion-theming': toPath('node_modules/@emotion/react'),
          '@/assets': toPath('public'),
          '@': toPath('src')
        },
        fallback: {
          ...(config.resolve?.fallback ?? {}),
          https: require.resolve('https-browserify'),
          http: require.resolve('stream-http'),
          url: require.resolve('url/'),
          v8: false
        }
      }
    };
  },
  docs: {
    autodocs: 'tag'
  }
};

export default config;
