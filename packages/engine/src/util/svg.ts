export const generateCirclePath = (radius: number): string =>
  `M0,0 A${radius},${radius} 0 1,1 ${radius * 2},0 A${radius},${radius} 0 1,1 0,0`;

export const generateArrowPath = (width: number, height: number): string =>
  `M 0 ${-height / 2} ${width} 0 0 ${height / 2} z`;
