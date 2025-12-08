import type { CanvasNodeType } from '../types';

export const generateNodeId = (): string => {
    return `node-${crypto.randomUUID()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const createDefaultNode = (
    type: 'rectangle' | 'circle',
    x: number,
    y: number
): CanvasNodeType => ({
    id: generateNodeId(),
    type,
    x,
    y,
    width: type === 'rectangle' ? 120 : 80,
    height: type === 'rectangle' ? 80 : 80,
    text: type === 'rectangle' ? 'Новый прямоугольник' : 'Новый круг',
    isSelected: true,
});