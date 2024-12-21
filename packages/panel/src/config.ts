import { Component } from 'vue';

import PanelFieldArray from './components/PanelFieldArray.vue';
import PanelFieldBoolean from './components/PanelFieldBoolean.vue';
import PanelFieldCode from './components/PanelFieldCode.vue';
import PanelFieldColor from './components/PanelFieldColor.vue';
import PanelFieldDate from './components/PanelFieldDate.vue';
import PanelFieldEnum from './components/PanelFieldEnum.vue';
import PanelFieldFile from './components/PanelFieldFile.vue';
import PanelFieldFont from './components/PanelFieldFont.vue';
import PanelFieldFusedNumber from './components/PanelFieldFusedNumber.vue';
import PanelFieldFusedString from './components/PanelFieldFusedString.vue';
import PanelFieldJEXL from './components/PanelFieldJEXL.vue';
import PanelFieldNumber from './components/PanelFieldNumber.vue';
import PanelFieldObject from './components/PanelFieldObject.vue';
import PanelFieldPosition from './components/PanelFieldPosition.vue';
import PanelFieldSliderNumber from './components/PanelFieldSliderNumber.vue';
import PanelFieldString from './components/PanelFieldString.vue';

export const INPUT_COMPONENTS: Record<string, Component> = {
  date: PanelFieldDate,
  enum: PanelFieldEnum,
  boolean: PanelFieldBoolean,
  number: PanelFieldNumber,
  string: PanelFieldString,
  file: PanelFieldFile,
  array: PanelFieldArray,
  object: PanelFieldObject,
  font: PanelFieldFont,
  fusedNumber: PanelFieldFusedNumber,
  fusedString: PanelFieldFusedString,
  color: PanelFieldColor,
  sliderNumber: PanelFieldSliderNumber,
  position: PanelFieldPosition,
  code: PanelFieldCode,
  jexl: PanelFieldJEXL,
};

export const registerInputComponent = (name: string, component: Component) => {
  INPUT_COMPONENTS[name] = component;
};
