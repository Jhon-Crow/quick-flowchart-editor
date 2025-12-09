export type NodeType = 'rectangle' | 'circle';
export type ArrowType = 'directional' | 'bidirectional' | 'none';

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

export interface CanvasArrowType {
    id: string;
    sourceId: string;
    targetId: string;
    type: ArrowType;
}

export interface CanvasStore {
    // Состояние
    nodes: CanvasNodeType[];
    arrows: CanvasArrowType[];
    selectedNodeId: string | null;
    selectedArrowId: string | null;

    // Действия с нодами
    addNode: (type: NodeType, x: number, y: number) => void;
    deleteNode: (id: string) => void;
    selectNode: (id: string | null) => void;
    updateNodePosition: (id: string, x: number, y: number) => void;
    updateNodeText: (id: string, text: string) => void;

    // Действия со стрелками
    addArrow: (sourceId: string, targetId: string, type: ArrowType) => void;
    deleteArrow: (id: string) => void;
    selectArrow: (id: string | null) => void;
    updateArrowType: (id: string, type: ArrowType) => void;
    updateArrowSource: (id: string, sourceId: string) => void;
    updateArrowTarget: (id: string, targetId: string) => void;

    clearSelection: () => void;
}

export type NodeProps = Omit<CanvasNodeType, 'id'>; //todo удалить если не понадобится