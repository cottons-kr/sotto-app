import {
	type StyleRule,
	globalStyle as _globalStyle,
	style as _style,
} from '@vanilla-extract/css';

type StyleFunction = typeof _style;

type GlobalStyleFunction = typeof _globalStyle;

type ClassNames = string | Array<ClassNames>;

export function getLayerApplier(layer: string) {
	function style(...args: Parameters<StyleFunction>) {
		const [rule, debugId] = args;

		const appliedRule = Array.isArray(rule)
			? rule.map((r) => (isLayerApplicable(r) ? applyLayer(layer, r) : r))
			: applyLayer(layer, rule);

		return _style(appliedRule, debugId);
	}

	function globalStyle(...args: Parameters<GlobalStyleFunction>) {
		const [selector, rule] = args;

		return _globalStyle(selector, applyLayer(layer, rule));
	}

	return {
		style,
		globalStyle,
	};
}

export function applyLayer(layer: string, rule: StyleRule) {
	return { '@layer': { [layer]: rule } };
}

function isLayerApplicable(rule: StyleRule | ClassNames): rule is StyleRule {
	return typeof rule === 'object' && !Array.isArray(rule);
}

export function addOpacity(hex: string, opacity: number) {
	const opacityHex = Math.round((opacity / 100) * 255)
		.toString(16)
		.padStart(2, '0');

	return `${hex}${opacityHex}`;
}

export const scaleFactor = process.env.NODE_ENV === 'production' ? 13 / 10 : 1;

export function calculateScaleFactor(size: number) {
	return `${(size * scaleFactor).toFixed(1)}px`;
}
