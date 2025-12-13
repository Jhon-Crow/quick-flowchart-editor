import {gql} from "@apollo/client";


export const DELETE_DIAGRAM = gql`
    mutation DeleteDiagram($id:ID!) {
        removeDiagram(id: $id) {
            id
        }
    }
`;