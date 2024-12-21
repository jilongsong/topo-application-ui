import { css } from '@emotion/css';
import tinycolor from 'tinycolor2';

import { CompoundVariant, styleCompoundNaming, StyleValue } from '../type';

export const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type Breakpoint = keyof typeof breakpoints;

export class StyleManager {
  private styles = new Map<string, string>();
  private variantRegistry = new Map<string, Map<string, CompoundVariant>>();
  private variantStylesCache = new Map<string, Map<string, string>>();

  private readonly states = {
    hover: ':hover',
    focus: ':focus',
    pressed: ':active',
  } as const;

  private readonly mediaQueries: Record<Breakpoint, string>;
  private readonly colorCache = new Map<string, string>();

  constructor() {
    this.mediaQueries = this.generateMediaQueries();
  }

  private generateVariantStyles(variant: CompoundVariant): string {
    // 收集所有状态的样式
    const styles: Record<string, any> = {};

    // 1. 首先处理默认状态
    const defaultState = variant.states.find((s) => s.state === 'default');
    if (defaultState) {
      Object.assign(styles, defaultState.styles);
    }

    // 2. 处理其他状态为伪类
    variant.states.forEach((state) => {
      if (state.state !== 'default') {
        const pseudo = this.states[state.state];
        if (pseudo) {
          styles[`&${pseudo}`] = state.styles;
        }
      }
    });

    // 3. 生成单个类，包含所有状态
    return css(styles);
  }

  public registerComponentVariants(component: string, variants: CompoundVariant[]) {
    if (!this.variantRegistry.has(component)) {
      this.variantRegistry.set(component, new Map());
      this.variantStylesCache.set(component, new Map());
    }

    const componentVariants = this.variantRegistry.get(component)!;
    const componentStyles = this.variantStylesCache.get(component)!;

    variants.forEach((variant) => {
      componentVariants.set(variant.name, variant);
      // 预生成并缓存变体样式
      componentStyles.set(variant.name, this.generateVariantStyles(variant));
    });
  }

  public registerStyleConfig(config: Record<string, CompoundVariant[]>) {
    Object.entries(config).forEach(([component, variants]) => {
      this.registerComponentVariants(component, variants);
    });
  }

  public getRegisteredComponents(): string[] {
    return Array.from(this.variantRegistry.keys());
  }

  public getVariantNames(component: string): string[] {
    return Array.from(this.variantRegistry.get(component)?.keys() || []);
  }

  public getVariant(component: string, variantName: string): CompoundVariant | undefined {
    return this.variantRegistry.get(component)?.get(variantName);
  }

  public getAllVariants(component: string): CompoundVariant[] {
    return Array.from(this.variantRegistry.get(component)?.values() || []);
  }

  public hasVariant(component: string, variantName: string): boolean {
    return this.variantRegistry.get(component)?.has(variantName) || false;
  }

  private calculateContrastRatio(color1: string, color2: string): number {
    const l1 = tinycolor(color1).getLuminance();
    const l2 = tinycolor(color2).getLuminance();
    const brightest = Math.max(l1, l2);
    const darkest = Math.min(l1, l2);
    return (brightest + 0.05) / (darkest + 0.05);
  }

  public getTextColor(
    bg: string,
    options: {
      light?: string;
      dark?: string;
      minContrastRatio?: number;
      preferredColor?: string;
    } = {}
  ): string {
    const cacheKey = `${bg}-${options.preferredColor || ''}-${options.minContrastRatio || 4.5}`;
    const cached = this.colorCache.get(cacheKey);
    if (cached) return cached;

    const { light = '#ffffff', dark = '#000000', minContrastRatio = 4.5, preferredColor } = options;
    const bgInstance = tinycolor(bg);
    const bgLuminance = bgInstance.getLuminance();

    let result: string;

    if (preferredColor) {
      const contrast = this.calculateContrastRatio(bg, preferredColor);
      if (contrast >= minContrastRatio) {
        result = preferredColor;
      } else {
        result = bgLuminance > 0.5 ? dark : light;
      }
    } else {
      result = bgLuminance > 0.5 ? dark : light;
    }

    const finalContrast = this.calculateContrastRatio(bg, result);
    if (finalContrast < minContrastRatio) {
      result = bgLuminance > 0.5 ? '#000000' : '#ffffff';
    }

    this.colorCache.set(cacheKey, result);
    return result;
  }

  public createResponsiveStyle(
    baseStyle: Record<string, any>,
    responsiveOverrides: Partial<Record<Breakpoint, Record<string, any>>>
  ) {
    const responsiveStyles = Object.entries(responsiveOverrides).reduce((acc, [breakpoint, overrideStyle]) => {
      if (breakpoint !== 'xs') {
        acc[this.mediaQueries[breakpoint as Breakpoint]] = overrideStyle;
      }
      return acc;
    }, {} as Record<string, Record<string, any>>);

    return {
      ...baseStyle,
      ...responsiveStyles,
    };
  }

  private getProps(value: StyleValue, props: Record<string, any>): StyleValue {
    if (value === undefined || typeof value !== 'string' || !value.startsWith('props.')) {
      return value;
    }
    return props[value.slice(6)];
  }

  private resolveStyles(styles: Record<string, any>, props: Record<string, any>) {
    const result: Record<string, any> = {};
    for (const [key, value] of Object.entries(styles)) {
      result[key] = this.getProps(value, props);
    }
    return result;
  }

  private expandCompositeStyle(style: Record<string, any>): Record<string, any> {
    if (typeof style !== 'object' || style === null) {
      throw new Error('Invalid style object');
    }
    const expandedStyle: Record<string, any> = {};
    Object.entries(styleCompoundNaming).forEach(([key, compoundKey]) => {
      if (key in style) {
        expandedStyle[key] = style[key]; // 保留原始键值
      }

      if (compoundKey in style) {
        const compoundValue = style[compoundKey];

        if (typeof compoundValue === 'object' && compoundValue !== null) {
          if ('value' in compoundValue && 'perSide' in compoundValue) {
            // 处理 perSide 逻辑的通用方式
            if (compoundValue.perSide) {
              ['Top', 'Right', 'Bottom', 'Left'].forEach((direction) => {
                const dirKey = `${key}${direction}`;
                expandedStyle[dirKey] = compoundValue[`${key}${direction}`] ?? 0;
              });
            } else {
              expandedStyle[key] = compoundValue.value;
            }
          } else {
            // 默认展开逻辑
            Object.entries(compoundValue).forEach(([subKey, subValue]) => {
              if (!(subKey in expandedStyle)) {
                expandedStyle[subKey] = subValue;
              }
            });
          }
        }
      }
    });
    Object.entries(style).forEach(([key, value]) => {
      if (!Object.keys(styleCompoundNaming).includes(key) && !(key in expandedStyle)) {
        expandedStyle[key] = value;
      }
    });
    return expandedStyle;
  }

  public createStyles(component: string) {
    return (props: Record<string, any> = {}, extras: Record<string, any> = {}) => {
      const standardStyle = this.expandCompositeStyle(props);
      // 构造优化后的缓存key
      const cacheKey = JSON.stringify({
        variantName: standardStyle.variantName || 'default',
        // 过滤掉非样式相关的props
        styles: Object.fromEntries(
          Object.entries(standardStyle).filter(
            ([key, _]) =>
              key !== 'variantName' &&
              key !== 'responsive' &&
              !Object.keys(this.states).includes(key) &&
              !key.startsWith('on')
          )
        ),
        // 只在有响应式配置时才加入缓存key
        responsive: props.responsive,
        extras: Object.keys(extras).length > 0 ? extras : undefined,
        component,
      });

      const cached = this.styles.get(cacheKey);
      if (cached) return cached;

      const classes: string[] = [];

      // 1. 变体样式
      const variantName = props.variantName || 'default';
      const variantStyles = this.variantStylesCache.get(component)?.get(variantName);
      if (variantStyles) {
        classes.push(variantStyles);
      }

      // 2. 动态样式
      const dynamicStyles: Record<string, any> = {};
      Object.entries(standardStyle).forEach(([key, value]) => {
        if (key !== 'variantName' && key !== 'responsive' && !Object.keys(this.states).includes(key)) {
          dynamicStyles[key] = this.getProps(value, standardStyle);
        }
      });

      if (Object.keys(dynamicStyles).length > 0) {
        classes.push(css(dynamicStyles));
      }

      // 3. 响应式样式
      if (standardStyle.responsive) {
        const responsiveStyles = this.createResponsiveStyle({}, standardStyle.responsive);
        classes.push(css(responsiveStyles));
      }

      // 4. 额外样式
      if (Object.keys(extras).length > 0) {
        const extraStyles = this.resolveStyles(extras, standardStyle);
        classes.push(css(extraStyles));
      }

      const result = classes.join(' ');
      this.styles.set(cacheKey, result);
      return result;
    };
  }

  private generateMediaQueries(): Record<Breakpoint, string> {
    return Object.entries(breakpoints).reduce((acc, [key, value]) => {
      const bpKey = key as Breakpoint;
      acc[bpKey] = `@media (min-width: ${value}px)`;
      return acc;
    }, {} as Record<Breakpoint, string>);
  }
}
