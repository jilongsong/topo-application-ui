import { MContainer } from '@topo/schema';

export interface MCarousel extends MContainer {
  type: 'carousel';
  property: {
    autoplay: boolean;
    activeIndex: number;
    // interval: number;
    // loop: boolean;
    // indicatorPosition: 'outside' | 'none';
    // arrow: 'always' | 'hover' | 'never';
    // pauseOnHover: boolean;
    // direction: 'horizontal' | 'vertical';
    // currentActiveItem: number;
  };
  items: MContainer[];
}
