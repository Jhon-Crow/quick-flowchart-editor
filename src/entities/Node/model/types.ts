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

// Определите отдельно тип состояния (только данные)
interface CanvasState {
    nodes: CanvasNodeType[];
    arrows: CanvasArrowType[];
    selectedNodeId: string | null;
    selectedArrowId: string | null;
}

// Определите тип действий отдельно
interface CanvasActions {
    loadDiagram: (nodes: CanvasNodeType[], arrows: CanvasArrowType[]) => void;
    addNode: (type: NodeType, x: number, y: number) => void;
    updateNodePosition: (id: string, x: number, y: number) => void;
    selectNode: (id: string | null) => void;
    deleteNode: (id: string) => void;
    clearSelection: () => void;
    updateNodeText: (id: string, text: string) => void;
    addArrow: (type: ArrowType, sourceId: string, targetId: string) => void;
    deleteArrow: (id: string) => void;
    selectArrow: (id: string | null) => void;
    updateArrowType: (id: string, type: ArrowType) => void;
    updateArrowSource: (id: string, sourceId: string) => void;
    updateArrowTarget: (id: string, targetId: string) => void;
}

// Объедините типы для хранилища
export type CanvasStore = CanvasState & CanvasActions;