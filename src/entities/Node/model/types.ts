export interface NodeType {
    id: string;
    type: 'rectangle' | 'circle';
    x: number;
    y: number;
    text: string;
};

export type NodeProps = Omit<NodeType, 'id'>;