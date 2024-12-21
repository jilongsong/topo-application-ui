import { EffectConfig, MComponent } from '@topo/schema';

export interface MButton extends MComponent {
  type: 'button';
  property: {
    disabled?: boolean;
    text?: string;
  };
  style: {
    [key: string]: any;
  };
  event: {
    onClick: EffectConfig[];
  };
}
