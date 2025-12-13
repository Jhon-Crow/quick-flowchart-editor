import type {CanvasArrowType, CanvasNodeType} from "@/entities/Node/model/types.ts";

export interface DiagramType {
    id: string;
    title: string;
    createdAt: string,
    updatedAt: string,
    nodes: CanvasNodeType[];
    arrows: CanvasArrowType[];
}