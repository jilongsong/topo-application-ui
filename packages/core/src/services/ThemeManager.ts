import { ref } from 'vue';
import tinycolor from 'tinycolor2';

import {
  STANDARD_COLOR_TOKENS,
  STANDARD_RADIUS_TOKENS,
  STANDARD_SHADOW_TOKENS,
  STANDARD_SPACING_TOKENS,
  StandardColorToken,
  StandardRadiusToken,
  StandardShadowToken,
  StandardSpacingToken,
  Theme,
  ThemeCategory,
} from '../type';

export class ThemeManager {
  private PREFIX: string;
  private themes?: { light: Theme; dark: Theme };
  private mode = ref('light');
  private styleSheet?: CSSStyleSheet;
  private shadeCache = new Map<string, string[]>();
  private themeCache = new Map<string, string>();

  constructor(prefix: string = '--topo') {
    this.PREFIX = prefix;
  }

  public get currentMode() {
    return this.mode;
  }

  private checkTokens(tokens: Partial<Theme>): boolean {
    const required = {
      colors: STANDARD_COLOR_TOKENS,
      spacing: STANDARD_SPACING_TOKENS,
      radius: STANDARD_RADIUS_TOKENS,
      shadows: STANDARD_SHADOW_TOKENS,
    };

    for (const [type, list] of Object.entries(required)) {
      const provided = new Set(Object.keys(tokens[type as keyof Theme] || {}));
      for (const token of list) {
        if (!provided.has(token)) {
          console.error(`Missing required ${type} token: ${token}`);
          return false;
        }
      }
    }
    return true;
  }

  private initSheet() {
    const existing = Array.from(document.styleSheets).find((sheet) => sheet.title === 'theme-vars');

    if (existing) {
      this.styleSheet = existing as CSSStyleSheet;
      return;
    }

    const style = document.createElement('style');
    style.title = 'theme-vars';
    document.head.appendChild(style);

    const sheet = style.sheet;
    if (!sheet) throw new Error('Failed to create stylesheet');

    this.styleSheet = sheet;
  }

  private apply(theme: Theme) {
    if (!this.styleSheet) {
      this.initSheet();
    }

    // 使用主题配置的序列化作为缓存key
    const cacheKey = JSON.stringify(theme);
    const cached = this.themeCache.get(cacheKey);

    if (cached) {
      // 清除所有样式规则
      while (this.styleSheet!.cssRules.length) {
        this.styleSheet!.deleteRule(0);
      }
      this.styleSheet!.insertRule(`:root { ${cached} }`, 0);
      return;
    }

    // 清除所有样式规则
    while (this.styleSheet!.cssRules.length) {
      this.styleSheet!.deleteRule(0);
    }

    const vars = new Set<string>();

    // 处理颜色和色阶变体
    for (const [key, value] of Object.entries(theme.colors)) {
      vars.add(`${this.PREFIX}-color-${key}: ${value}`);

      // 生成1-12的色阶变体
      const shades = this.createShades(value, 12);
      for (let i = 0; i < shades.length; i++) {
        vars.add(`${this.PREFIX}-color-${key}-${i + 1}: ${shades[i]}`);
      }
    }

    // 处理其他主题属性
    for (const [type, values] of Object.entries({
      spacing: theme.spacing,
      radius: theme.radius,
      shadows: theme.shadows,
    })) {
      for (const [key, value] of Object.entries(values)) {
        vars.add(`${this.PREFIX}-${type}-${key}: ${value}`);
      }
    }

    const css = Array.from(vars).join(';\n');
    this.themeCache.set(cacheKey, css);
    this.styleSheet!.insertRule(`:root { ${css} }`, 0);
  }

  private getColor(color: string): string {
    if (!color.startsWith('var(')) return color;

    const cssVar = color.slice(4, -1).trim();
    const value = getComputedStyle(document.documentElement).getPropertyValue(cssVar);
    if (value) return value.trim();

    try {
      return tinycolor(color).toString();
    } catch {
      return color;
    }
  }

  public createShades(base: string, count: number = 5): string[] {
    const key = `${base}-${count}`;
    const cached = this.shadeCache.get(key);
    if (cached) return cached;

    const color = tinycolor(this.getColor(base));
    const step = 40 / (count - 1);

    const shades = new Array(count);
    for (let i = 0; i < count; i++) {
      shades[i] = color
        .clone()
        .lighten(20 - step * i)
        .toHexString();
    }

    this.shadeCache.set(key, shades);
    return shades;
  }

  public getVar<C extends ThemeCategory, T extends string>(
    type: C,
    name: C extends 'color'
      ? StandardColorToken | T
      : C extends 'spacing'
      ? StandardSpacingToken | T
      : C extends 'radius'
      ? StandardRadiusToken | T
      : C extends 'shadows'
      ? StandardShadowToken | T
      : T
  ): string {
    return `var(${this.PREFIX}-${type}-${name})`;
  }

  public set(themes: { light: Theme; dark: Theme }) {
    if (!this.checkTokens(themes.light) || !this.checkTokens(themes.dark)) {
      throw new Error('Invalid theme: missing required tokens');
    }

    this.themes = themes;
    this.apply(this.mode.value === 'dark' ? themes.dark : themes.light);
  }

  public toggle() {
    if (!this.themes) throw new Error('Themes not set');

    // 使用 requestAnimationFrame 优化渲染时机
    requestAnimationFrame(() => {
      this.mode.value = this.mode.value === 'dark' ? 'light' : 'dark';
      this.apply(this.mode.value === 'dark' ? this.themes!.dark : this.themes!.light);
    });
  }
}
