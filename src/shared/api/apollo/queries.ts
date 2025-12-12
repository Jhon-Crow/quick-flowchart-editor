import {gql} from "@apollo/client";


export const ALL_DIAGRAMS = gql`
    query MyQuery {
        allDiagrams(sortOrder: "createdAt") {
            id
            nodes
            title
            arrows
        }
    }
`;