import {gql} from "@apollo/client";


//todo вероятно не понадобится
export const ALL_DIAGRAMS = gql`
    query GetAllDiagrams {
        allDiagrams(sortOrder: "createdAt") {
            id
            title
            nodes
            arrows
        }
    }
`;

export const ALL_DIAGRAMS_TITLES = gql`
    query GetAllDiagramsTitles {
        allDiagrams(sortOrder: "createdAt") {
            id
            title
        }
    }
`;

export const GET_DIAGRAM_BY_ID = gql`
query GetDiagram($id: ID!) {
  Diagram(id: $id) {
    arrows
    nodes
  }
}

`