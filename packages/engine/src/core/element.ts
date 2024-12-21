import { Id, MElement, State, Variable } from '@topo/schema';

import { Project } from './project';

export const DEFAULT_VALUE = {
  fill: 'rgba(255,255,255,1)',
  fillOpacity: 1,
  stroke: 'rgba(255,255,255,1)',
  strokeWidth: 4,
  strokeDasharray: 0,
  strokeOpacity: 1,
  color: '#fff',
  colorOpacity: 1,
  fontSize: 14,
};

export const DEFAULT_STYLE = `
--fill: ${DEFAULT_VALUE.fill}; 
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
  public fillOpacity?: number;
  public stroke?: string;
  public strokeWidth?: number;
  public strokeDasharray?: number;
  public strokeOpacity?: number;
  public color?: string;
  public colorOpacity?: number;
  public fontSize?: number;
  public zIndex?: number;
  public states: State[];
  public variables?: Variable[];

  public project: Project;

  constructor(options: MElement, project: Project) {
    this.project = project;

    this.id = options.id;
    this.name = options.name;
    this.fill = options.fill ?? DEFAULT_VALUE.fill;
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
  }

  public update(options: MElement): void {
    this.fill = options.fill;
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
  }

  public getStyle(): string {
    return `
        --fill: ${this.fill}; 
        --fillOpacity: ${this.fillOpacity}; 
        --stroke: ${this.stroke}; 
        --strokeWidth: ${this.strokeWidth}; 
        --strokeOpacity: ${this.strokeOpacity}; 
        --strokeDasharray: ${this.strokeDasharray};
        --color: ${this.color}; 
        --colorOpacity: ${this.colorOpacity}; 
        --fontSize: ${this.fontSize};
        `;
  }

  public toJSON(): MElement {
    return {
      id: this.id,
      name: this.name,
      fill: this.fill,
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
    };
  }
}

export default Element;
