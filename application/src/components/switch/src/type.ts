import { MComponent } from '@topo/schema';

export interface MSwitch extends MComponent {
  text?: string;
  disabled?: boolean;
  themeColor?: string;
  initVal?: boolean;
}
