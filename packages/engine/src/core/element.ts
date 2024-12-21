import { Id, MElement, State, Variable } from '@topo/schema';

import { Project } from './project';

export const DEFAULT_VALUE = {
  fill: 'rgba(255,255,255,1)',
  nodeFill: 'rgba(255,255,255,0)',
  nodeStroke: 'rgba(255,255,255,1)',
  nodeFillOpacity: 1,
  nodeStrokeOpacity: 0,
  fillWidth: 2,
  fillOpacity: 1,
  stroke: 'rgba(255,255,255,1)',
  strokeWidth: 4,
  strokeDasharray: 15,
  strokeOpacity: 1,
  color: '#fff',
  colorOpacity: 1,
  fontSize: 14,
};

export const DEFAULT_STYLE = `
--fill: ${DEFAULT_VALUE.fill}; 
--nodeFill: ${DEFAULT_VALUE.nodeFill};
--nodeStroke: ${DEFAULT_VALUE.nodeStroke};
--nodeFillOpacity: ${DEFAULT_VALUE.nodeFillOpacity};
--nodeStrokeOpacity: ${DEFAULT_VALUE.nodeStrokeOpacity};
--fillWidth: ${DEFAULT_VALUE.fillWidth};
--fillOpacity: ${DEFAULT_VALUE.fillOpacity}; 
--stroke: ${DEFAULT_VALUE.stroke}; 
--strokeWidth: ${DEFAULT_VALUE.strokeWidth}; 
--strokeDasharray: ${DEFAULT_VALUE.strokeDasharray};
--strokeOpacity: ${DEFAULT_VALUE.strokeOpacity}; 
--color: ${DEFAULT_VALUE.color}; 
--colorOpacity: ${DEFAULT_VALUE.colorOpacity}; 
--fontSize: ${DEFAULT_VALUE.fontSize};
`;

export class Element {
  public id: Id;
  public name: string;
  public fill?: string;
  public nodeFill?: string;
  public nodeStroke?: string;
  public nodeFillOpacity?: number;
  public nodeStrokeOpacity?: number;
  public fillWidth?: number;
  public fillOpacity?: number;
  public stroke?: string;
  public strokeWidth?: number;
  public strokeDasharray?: number;
  public strokeOpacity?: number;
  public color?: string;
  public colorOpacity?: number;
  public fontSize?: number;
  public animation?: string;
  public zIndex?: number;
  public states: State[];
  public variables?: Variable[];

  public project: Project;

  constructor(options: MElement, project: Project) {
    this.project = project;
    this.id = options.id;
    this.name = options.name;
    this.nodeFill = options.nodeFill ?? DEFAULT_VALUE.nodeFill;
    this.nodeStroke = options.nodeStroke ?? DEFAULT_VALUE.nodeStroke;
    this.nodeFillOpacity = options.nodeFillOpacity ?? DEFAULT_VALUE.nodeFillOpacity;
    this.nodeStrokeOpacity = options.nodeStrokeOpacity ?? DEFAULT_VALUE.nodeStrokeOpacity;
    this.fill = options.fill ?? DEFAULT_VALUE.fill;
    this.fillWidth = options.fillWidth ?? DEFAULT_VALUE.fillWidth;
    this.fillOpacity = options.fillOpacity ?? DEFAULT_VALUE.fillOpacity;
    this.stroke = options.stroke ?? DEFAULT_VALUE.stroke;
    this.strokeOpacity = options.strokeOpacity ?? DEFAULT_VALUE.strokeOpacity;
    this.strokeWidth = options.strokeWidth ?? DEFAULT_VALUE.strokeWidth;
    this.strokeDasharray = options.strokeDasharray ?? DEFAULT_VALUE.strokeDasharray;
    this.color = options.color ?? DEFAULT_VALUE.color;
    this.colorOpacity = options.colorOpacity ?? DEFAULT_VALUE.colorOpacity;
    this.fontSize = options.fontSize ?? DEFAULT_VALUE.fontSize;
    this.zIndex = options.zIndex;
    this.states = options.states;
    this.variables = options.variables;
    this.animation = options.animation;
  }

  public update(options: MElement): void {
    this.fill = options.fill;
    this.nodeFill = options.nodeFill;
    this.nodeStroke = options.nodeStroke;
    this.nodeFillOpacity = options.nodeFillOpacity;
    this.nodeStrokeOpacity = options.nodeStrokeOpacity;
    this.fillWidth = options.fillWidth;
    this.fillOpacity = options.fillOpacity;
    this.stroke = options.stroke;
    this.strokeOpacity = options.strokeOpacity;
    this.strokeWidth = options.strokeWidth;
    this.strokeDasharray = options.strokeDasharray;
    this.color = options.color;
    this.colorOpacity = options.colorOpacity;
    this.fontSize = options.fontSize;
    this.zIndex = options.zIndex;
    this.states = options.states;
    this.variables = options.variables;
    this.animation = options.animation;
  }

  public getStyle(): string {
    return `
        --fill: ${this.fill}; 
        --nodeFill: ${this.nodeFill};
        --nodeStroke: ${this.nodeStroke};
        --nodeFillOpacity: ${this.nodeFillOpacity};
        --nodeStrokeOpacity: ${this.nodeStrokeOpacity};
        --fillWidth: ${this.fillWidth};
        --fillOpacity: ${this.fillOpacity}; 
        --stroke: ${this.stroke}; 
        --strokeWidth: ${this.strokeWidth}; 
        --strokeOpacity: ${this.strokeOpacity}; 
        --strokeDasharray: ${this.strokeDasharray};
        --color: ${this.color}; 
        --colorOpacity: ${this.colorOpacity}; 
        --fontSize: ${this.fontSize};
        --animation: ${this.animation}
        `;
  }

  public toJSON(): MElement {
    return {
      id: this.id,
      name: this.name,
      fill: this.fill,
      nodeFill: this.nodeFill,
      nodeStroke: this.nodeStroke,
      nodeFillOpacity: this.nodeFillOpacity,
      nodeStrokeOpacity: this.nodeStrokeOpacity,
      fillWidth: this.fillWidth,
      fillOpacity: this.fillOpacity,
      stroke: this.stroke,
      strokeWidth: this.strokeWidth,
      strokeDasharray: this.strokeDasharray,
      strokeOpacity: this.strokeOpacity,
      color: this.color,
      colorOpacity: this.colorOpacity,
      fontSize: this.fontSize,
      zIndex: this.zIndex,
      states: this.states,
      variables: this.variables,
      animation: this.animation,
    };
  }
}

export default Element;
