import { MComponent } from '@topo/schema';

export interface MVideo extends MComponent {
  src: string;
  videoType: string;
  autoplay: boolean;
  controls: boolean;
  poster: string;
  muted: boolean;
  playbackRate: number;
}
