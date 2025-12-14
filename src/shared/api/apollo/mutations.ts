import {gql, TypedDocumentNode} from "@apollo/client";
import type {
    CreateDiagramResponse,
    CreateDiagramVariables,
    DeleteDiagramResponse,
    DeleteDiagramVariables
} from "@/shared/api/apollo/model/types.ts";


export const DELETE_DIAGRAM: TypedDocumentNode<
    DeleteDiagramResponse,
    DeleteDiagramVariables
> = gql`
    mutation DeleteDiagram($id:ID!) {
        removeDiagram(id: $id) {
            id
            title
        }
    }
`;

export const CREATE_DIAGRAM: TypedDocumentNode<
    CreateDiagramResponse,
    CreateDiagramVariables
> = gql`
    mutation CreateDiagram($title: String!, $createdAt: String!, $updatedAt: String!, $nodes: JSON!, $arrows: JSON!) {
        createDiagram(
            title: $title
            nodes: $nodes
            arrows: $arrows
            createdAt: $createdAt
            updatedAt: $updatedAt
        ) {
            id
            title
        }
    }
`;