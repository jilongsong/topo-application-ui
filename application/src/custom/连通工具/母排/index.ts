import { NodeType, PortEnergyType, PortTnodeIo, Tag } from '@topo/schema';

import status from '../../../assets/model/运行.svg';
import { CustomNode } from '../../types';

const node = {
  group: '连通工具',
  vertex: {
    id: '',
    name: '母排',
    tag: Tag.image,
    type: NodeType.Node,
    states: [
      {
        name: '运行',
        src: status,
        default: true,
      },
      {
        name: '停机',
        src: status,
      },
      {
        name: '检修',
        src: status,
      },
      {
        name: '故障',
        src: status,
      },
    ],
    width: 200,
    height: 2,
    x: 0,
    y: 0,
    angle: 0,
    fill: 'rgba(0, 255, 0, 1)',
    stroke: 'rgba(255, 255, 255, 0)',
    ports: [
      {
        id: 'TN001',
        tnodeName: '端点1',
        tnodeCode: 'TN001',
        descr: '',
        energyType: PortEnergyType.Electricity,
        needCon: 0,
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
        energyType: PortEnergyType.Electricity,
        needCon: 0,
        tnodeIo: PortTnodeIo.Normal,
        position: {
          refX: 0.2,
          refY: 0,
        },
      },
      {
        id: 'TN003',
        tnodeName: '端点3',
        tnodeCode: 'TN003',
        descr: '',
        energyType: PortEnergyType.Electricity,
        needCon: 0,
        tnodeIo: PortTnodeIo.Normal,
        position: {
          refX: 0.4,
          refY: 0,
        },
      },
      {
        id: 'TN004',
        tnodeName: '端点4',
        tnodeCode: 'TN004',
        descr: '',
        energyType: PortEnergyType.Electricity,
        needCon: 0,
        tnodeIo: PortTnodeIo.Normal,
        position: {
          refX: 0.6,
          refY: 0,
        },
      },
      {
        id: 'TN005',
        tnodeName: '端点5',
        tnodeCode: 'TN005',
        descr: '',
        energyType: PortEnergyType.Electricity,
        needCon: 0,
        tnodeIo: PortTnodeIo.Normal,
        position: {
          refX: 0.8,
          refY: 0,
        },
      },
      {
        id: 'TN006',
        tnodeName: '端点6',
        tnodeCode: 'TN006',
        descr: '',
        energyType: PortEnergyType.Electricity,
        needCon: 0,
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
