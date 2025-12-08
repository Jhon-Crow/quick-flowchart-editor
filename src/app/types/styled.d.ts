import type {Theme} from "../styles";
declare module 'styled-components' {
    export interface DefaultTheme extends Theme {} // Добавьте {}
}
