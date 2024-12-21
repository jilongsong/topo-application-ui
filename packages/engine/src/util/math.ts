import { Rectangle } from '@antv/x6';

import { Position, Size } from '@topo/schema';

export const distance = (p1: Position, p2: Position): number => {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
};

export const scale = (oldSize: Size, newSize: Size): number => {
  const horizontalScale = newSize.width / oldSize.width;
  const verticalScale = newSize.height / oldSize.height;
  return (horizontalScale + verticalScale) / 2;
};

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const getBoundingBox = (rectangles: Rectangle[]): BoundingBox => {
  let minX = rectangles[0].x;
  let minY = rectangles[0].y;
  let maxX = rectangles[0].x + rectangles[0].width;
  let maxY = rectangles[0].y + rectangles[0].height;

  for (const rectangle of rectangles) {
    if (rectangle.x < minX) {
      minX = rectangle.x;
    }
    if (rectangle.y < minY) {
      minY = rectangle.y;
    }
    if (rectangle.x + rectangle.width > maxX) {
      maxX = rectangle.x + rectangle.width;
    }
    if (rectangle.y + rectangle.height > maxY) {
      maxY = rectangle.y + rectangle.height;
    }
  }
  const bboxWidth = maxX - minX;
  const bboxHeight = maxY - minY;
  return {
    x: minX,
    y: minY,
    width: bboxWidth,
    height: bboxHeight,
  };
};

export const isBBoxContains = (bbox: Rectangle, minBBox: Rectangle): boolean => {
  const p1 = { x: minBBox.x, y: minBBox.y }; // 左上角点
  const p2 = { x: minBBox.x + minBBox.width, y: minBBox.y }; // 右上角点
  const p3 = { x: minBBox.x, y: minBBox.y + minBBox.height }; // 左下角点
  const p4 = { x: minBBox.x + minBBox.width, y: minBBox.y + minBBox.height }; // 右下角点

  return (
    p1.x >= bbox.x &&
    p1.y >= bbox.y &&
    p2.x <= bbox.x + bbox.width &&
    p2.y >= bbox.y &&
    p3.x >= bbox.x &&
    p3.y <= bbox.y + bbox.height &&
    p4.x <= bbox.x + bbox.width &&
    p4.y <= bbox.y + bbox.height
  );
};
