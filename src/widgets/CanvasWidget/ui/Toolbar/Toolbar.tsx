import styled from 'styled-components';
import {Button} from "../../../../shared/ui/Button/Button.tsx";

const StyledToolbar = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Toolbar = () => {
    return (
        <StyledToolbar>
            <Button>Добавить прямоугольник</Button>
            <Button>Добавить круг</Button>
            <Button>Выбрать</Button>
            <Button>Удалить</Button>
        </StyledToolbar>
    );
};
