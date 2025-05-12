import { getLayerApplier } from '@/utils/style';
import { globalLayer } from '@vanilla-extract/css';

export const resetLayer = globalLayer('reset');
export const layoutLayer = globalLayer('layout');
export const uiLayer = globalLayer('ui');

export const { style: resetStyle, globalStyle: resetGlobalStyle } =
	getLayerApplier(resetLayer);

export const { style: layoutStyle, globalStyle: layoutGlobalStyle } =
	getLayerApplier(layoutLayer);

export const { style: uiStyle, globalStyle: uiGlobalStyle } =
	getLayerApplier(uiLayer);
