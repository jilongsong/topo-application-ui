import { style } from '@vanilla-extract/css';

// 定义复合变体类型
type CompoundVariant = {
  name: string;
  states: {
    state: 'default' | 'hover' | 'pressed' | 'focus';
    styles: Record<string, any>;
  }[];
};

// 创建复合变体样式系统
export function createStyleSystem(compoundVariants: CompoundVariant[]) {
  return function generateStyles(props: Record<string, any> = {}, additionalStyles: Record<string, any> = {}) {
    let compoundVariantStyles = {};

    // 根据 variantName 获取当前需要的复合变体
    const activeCompoundVariant = compoundVariants.find(
      (compoundVariant) => compoundVariant.name === props.variantName
    );

    if (activeCompoundVariant) {
      // 遍历变体的 states 并将其转换为 CSS 伪类状态
      activeCompoundVariant.states.forEach((state) => {
        if (state.state === 'default') {
          // 默认状态直接合并
          compoundVariantStyles = {
            ...compoundVariantStyles,
            ...state.styles,
          };
        } else {
          // 其他状态（hover, focus, pressed等）转换为伪类
          const pseudoClass = {
            hover: ':hover',
            focus: ':focus',
            pressed: ':active', // 将 pressed 映射到 CSS 的 :active
          }[state.state];

          if (pseudoClass) {
            compoundVariantStyles = {
              ...compoundVariantStyles,
              [`&${pseudoClass}`]: state.styles,
            };
          }
        }
      });
    }

    // 使用vanilla-extract的 style API 创建静态类
    const dynamicStyles = Object.keys(props).reduce((acc, key) => {
      if (key !== 'variantName') {
        // 只处理除 `variantName` 外的属性
        acc[key] = props[key];
      }
      return acc;
    }, {} as Record<string, any>);

    // 创建静态样式
    const baseStyles = style({
      ...dynamicStyles, // 动态样式（如颜色、尺寸等）
      ...compoundVariantStyles, // 复合变体样式（包括伪类）
      ...additionalStyles, // 额外样式
    });

    // 返回生成的类名
    return baseStyles;
  };
}
