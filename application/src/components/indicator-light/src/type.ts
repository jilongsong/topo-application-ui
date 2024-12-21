import { MComponent } from '@topo/schema';

interface light {
  color: string;
  sign: string;
}

export interface MIndicatorLight extends MComponent {
  value: string;
  lightGroup: light[];
}
