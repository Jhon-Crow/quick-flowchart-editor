import {gql} from "@apollo/client";


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