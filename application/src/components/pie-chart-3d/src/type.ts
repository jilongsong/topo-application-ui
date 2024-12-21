import { MComponent } from '@topo/schema';

export interface MPieChart3d extends MComponent {
  title: string;
  data: {
    name: string;
    value: number;
  }[];
  tooltip?: string;
  verticalAngle?: number;
  horizontalAngle?: number;
  legend?: boolean;
  legendAlign?: 'left' | 'center' | 'right';
  legendLayout?: 'horizontal' | 'vertical';
  legendVerticalAlign?: 'top' | 'middle' | 'bottom';
}
