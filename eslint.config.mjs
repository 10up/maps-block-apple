/**
 * ESLint flat config. Extends the `@wordpress/scripts` default config.
 */

/**
 * WordPress dependencies
 */
import defaultConfig from '@wordpress/scripts/config/eslint.config.cjs';

export default [
	{
		ignores: [ 'build/**', 'node_modules/**', 'vendor/**', 'tests/**' ],
	},
	...defaultConfig,
	{
		languageOptions: {
			globals: {
				mapkit: 'writable',
				CustomEvent: 'readonly',
				Event: 'readonly',
			},
		},
		settings: {
			'import/core-modules': [
				'@wordpress/api-fetch',
				'@wordpress/block-editor',
				'@wordpress/blocks',
				'@wordpress/components',
				'@wordpress/compose',
				'@wordpress/data',
				'@wordpress/date',
				'@wordpress/dom-ready',
				'@wordpress/edit-post',
				'@wordpress/element',
				'@wordpress/hooks',
				'@wordpress/i18n',
				'@wordpress/keycodes',
				'@wordpress/plugins',
				'@wordpress/primitives',
				'@wordpress/rich-text',
			],
		},
	},
];
