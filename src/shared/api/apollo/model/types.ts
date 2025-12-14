import type {CanvasArrowType, CanvasNodeType} from "@/entities/Node";

export type DiagramTitleType = {
    id: string;
    title: string;
};
export type AllDiagramsTitlesType = { allDiagrams: DiagramTitleType[] };
export type DiagramByIdType = { Diagram: { nodes: CanvasNodeType[]; arrows: CanvasArrowType[] } };

// Типы для переменных мутаций
export interface DeleteDiagramVariables {
    id: string;
}

export interface CreateDiagramVariables {
    title: string;
    createdAt: string;
    updatedAt: string;
    nodes: CanvasNodeType[];
    arrows: CanvasArrowType[];
}

// Типы для возвращаемых данных мутаций
export interface DeleteDiagramResponse {
    removeDiagram: DiagramTitleType;
}

export interface CreateDiagramResponse {
    createDiagram: DiagramTitleType;
}