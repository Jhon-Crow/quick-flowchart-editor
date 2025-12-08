// src/entities/Node/model/types.ts
export type NodeType = 'rectangle' | 'circle';

export interface CanvasNodeType {
    id: string;
    type: NodeType;
    x: number;
    y: number;
    width: number;
    height: number;
    text: string;
    isSelected: boolean;
}

export interface CanvasStore {
    // Состояние
    nodes: CanvasNodeType[];
    selectedNodeId: string | null;

    // Действия (actions)
    addNode: (type: NodeType, x: number, y: number) => void;
    updateNodePosition: (id: string, x: number, y: number) => void;
    selectNode: (id: string | null) => void;
    deleteNode: (id: string) => void;
    clearSelection: () => void;
    updateNodeText: (id: string, text: string) => void;
}

export type NodeProps = Omit<CanvasNodeType, 'id'>;