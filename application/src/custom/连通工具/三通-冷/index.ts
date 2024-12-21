import { PortEnergyType, PortTnodeIo, Tag } from '@topo/schema';

import { getNodeSrc } from '../../../util/index';
import { CustomNode } from '../../types';

const node = {
  group: '连通工具',
  vertex: {
    id: '',
    name: '三通-冷',
    tag: Tag.Pipe,
    type: 'PGY02_S0000_ST00000_U00000_GLZLFD_MP0000',
    states: [
      {
        name: '运行',
        src: getNodeSrc('/node/wire/运行.svg'),
        default: true,
      },
      {
        name: '停机',
        src: getNodeSrc('/node/wire/停机.svg'),
      },
      {
        name: '检修',
        src: getNodeSrc('/node/wire/检修.svg'),
      },
      {
        name: '故障',
        src: getNodeSrc('/node/wire/故障.svg'),
      },
    ],
    width: 100,
    height: 100,
    x: 0,
    y: 0,
    angle: 0,
    ports: [
      {
        id: 'TN001',
        tnodeName: '端点1',
        tnodeCode: 'TN001',
        descr: '',
        energyType: PortEnergyType.Cold,
        needCon: 1,
        tnodeIo: PortTnodeIo.Normal,
        position: {
          refX: 0,
          refY: 0,
        },
      },
      {
        id: 'TN002',
        tnodeName: '端点2',
        tnodeCode: 'TN002',
        descr: '',
        energyType: PortEnergyType.Cold,
        needCon: 1,
        tnodeIo: PortTnodeIo.Normal,
        position: {
          refX: 0.5,
          refY: 0,
        },
      },
      {
        id: 'TN003',
        tnodeName: '端点3',
        tnodeCode: 'TN003',
        descr: '',
        energyType: PortEnergyType.Cold,
        needCon: 1,
        tnodeIo: PortTnodeIo.Normal,
        position: {
          refX: 1,
          refY: 0,
        },
      },
    ],
  },
} as CustomNode;
export { node };
