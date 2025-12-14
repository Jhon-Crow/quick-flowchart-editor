import type {CanvasArrowType, CanvasNodeType} from "@/entities/Node";

export type DiagramTitleType = {
    id: string;
    title: string;
};
export type AllDiagramsTitlesType = { allDiagrams: DiagramTitleType[] };
export type DiagramByIdType = { Diagram: { nodes: CanvasNodeType[]; arrows: CanvasArrowType[] } };
