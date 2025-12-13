import {gql} from "@apollo/client";


export const DELETE_DIAGRAM = gql`
    mutation DeleteDiagram($id:ID!) {
        removeDiagram(id: $id) {
            id
            title
        }
    }
`;

export const CREATE_DIAGRAM = gql`
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