import {create} from 'zustand';
import type {ArrowType, CanvasArrowType, CanvasNodeType, CanvasStore, NodeType} from '../types';
import {persist} from "zustand/middleware";

export const useCanvasStore = create(
    persist<CanvasStore>(
        (set) => ({
            nodes: [],
            arrows: [],
            selectedNodeId: null,
            selectedArrowId: null,

            loadDiagram: (nodes: CanvasNodeType[], arrows: CanvasArrowType[]) => {
                set(() => ({
                    nodes: nodes.map((node) => ({
                        ...node,
                        isSelected: false,
                    })),
                    arrows: arrows.map((arrow) => ({
                        ...arrow,
                        isSelected: false,
                    })),
                    selectedNodeId: null,
                    selectedArrowId: null,
                }));
            },

            addNode: (type: NodeType, x: number, y: number) => {
                const newNode: CanvasNodeType = {
                    id: `node-${crypto.randomUUID()}`,
                    type,
                    x,
                    y,
                    width: type === 'rectangle' ? 120 : 80,
                    height: type === 'rectangle' ? 80 : 80,
                    text: type === 'rectangle' ? 'Прямоугольник' : 'Круг',
                    isSelected: true,
                };

                set((state) => ({
                    nodes: [...state.nodes.map((node) => ({
                        ...node,
                        isSelected: false,
                    })), newNode],
                    selectedNodeId: newNode.id,
                }));
            },

            updateNodePosition: (id: string, x: number, y: number) => {
                set((state) => ({
                    nodes: state.nodes.map((node) =>
                        node.id === id ? {...node, x, y} : node
                    ),
                }));
            },

            selectNode: (id: string | null) => {
                set((state) => ({
                    nodes: state.nodes.map((node) => ({
                        ...node,
                        isSelected: node.id === id,
                    })),
                    selectedNodeId: id,
                }));
            },

            deleteNode: (id: string) => {
                set((state) => ({
                    arrows: state.arrows.filter((arrow) => arrow.sourceId !== id && arrow.targetId !== id),
                    nodes: state.nodes.filter((node) => node.id !== id),
                    selectedNodeId: state.selectedNodeId === id ? null : state.selectedNodeId,
                }));
            },

            clearSelection: () => {
                set((state) => state.selectedNodeId || state.selectedArrowId ? (
                    {
                    nodes: state.nodes.map((node) => ({
                        ...node,
                        isSelected: false,
                    })),
                    arrows: state.arrows.map((arrow) => ({
                        ...arrow,
                        isSelected: false,
                    })),
                    selectedNodeId: null,
                    selectedArrowId: null,
                }): state);
            },

            updateNodeText: (id: string, text: string) => {
                set((state) => ({
                    nodes: state.nodes.map((node) =>
                        node.id === id ? {...node, text} : node
                    ),
                }));
            },

            // Экшены для стрелок
            addArrow: (type: ArrowType, sourceId: string, targetId: string) => {
                const newArrow: CanvasArrowType = {
                    id: `arrow-${crypto.randomUUID()}`,
                    sourceId,
                    targetId,
                    type,
                }

                set((state) => ({
                    arrows: [...state.arrows, newArrow],
                    selectedArrowId: newArrow.id,
                }));
            },

            deleteArrow: (id: string) => {
                set((state) => ({
                    arrows: state.arrows.filter((arrow) => arrow.id !== id),
                    selectedArrowId: state.selectedArrowId === id ? null : state.selectedArrowId,
                }));
            },

            selectArrow: (id: string | null) => {
                set((state) => ({
                    arrows: state.arrows.map((arrow) => ({
                        ...arrow,
                        isSelected: arrow.id === id,
                    })),
                    selectedArrowId: id,
                }));
            },

            updateArrowType: (id: string, type: ArrowType) => {
                set((state) => ({
                    arrows: state.arrows.map((arrow) =>
                        arrow.id === id ? {...arrow, type} : arrow
                    ),
                }));
            },

            updateArrowSource: (id: string, sourceId: string) => {
                set((state) => ({
                    arrows: state.arrows.map((arrow) =>
                        arrow.id === id ? {...arrow, sourceId} : arrow
                    ),
                }));
            },

            updateArrowTarget: (id: string, targetId: string) => {
                set((state) => ({
                    arrows: state.arrows.map((arrow) =>
                        arrow.id === id ? {...arrow, targetId} : arrow
                    ),
                }));
            },
        }),
        {
            name: 'canvas-store',
        }
    )
);