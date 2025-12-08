import { create } from 'zustand';
import type { CanvasNodeType, CanvasStore, NodeType } from '../types';

export const useCanvasStore = create<CanvasStore>((set) => ({
    // Начальное состояние
    nodes: [],
    selectedNodeId: null,

    // Добавление нового элемента
    addNode: (type: NodeType, x: number, y: number) => {
        const newNode: CanvasNodeType = {
            id: `node-${crypto.randomUUID()}`,
            type,
            x,
            y,
            width: type === 'rectangle' ? 120 : 80,
            height: type === 'rectangle' ? 80 : 80,
            text: type === 'rectangle' ? 'Прямоугольник' : 'Круг',
            isSelected: false,
        };

        set((state) => ({
            nodes: [...state.nodes, newNode],
            selectedNodeId: newNode.id,
        }));
    },

    // Обновление позиции элемента
    updateNodePosition: (id: string, x: number, y: number) => {
        set((state) => ({
            nodes: state.nodes.map((node) =>
                node.id === id ? { ...node, x, y } : node
            ),
        }));
    },

    // Выбор элемента
    selectNode: (id: string | null) => {
        set((state) => ({
            nodes: state.nodes.map((node) => ({
                ...node,
                isSelected: node.id === id,
            })),
            selectedNodeId: id,
        }));
    },

    // Удаление элемента
    deleteNode: (id: string) => {
        set((state) => ({
            nodes: state.nodes.filter((node) => node.id !== id),
            selectedNodeId: state.selectedNodeId === id ? null : state.selectedNodeId,
        }));
    },

    // Очистка выделения
    clearSelection: () => {
        set((state) => ({
            nodes: state.nodes.map((node) => ({
                ...node,
                isSelected: false,
            })),
            selectedNodeId: null,
        }));
    },

    // Обновление текста элемента
    updateNodeText: (id: string, text: string) => {
        set((state) => ({
            nodes: state.nodes.map((node) =>
                node.id === id ? { ...node, text } : node
            ),
        }));
    },
}));