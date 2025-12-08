import styled from 'styled-components';
import {CanvasWidget} from "../../../widgets/CanvasWidget";

export const MainPage = () => {
    return (
        <PageContainer>
            <Title>QuickChart — минималистичный конструктор схем</Title>
            <Subtitle>Добавляйте элементы, перетаскивайте их, выбирайте и удаляйте</Subtitle>
            <CanvasWidget/>
        </PageContainer>
    );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
  background: ${({theme}) => theme.colors.background};
`;

const Title = styled.h1`
  margin-bottom: 8px;
  color: ${({theme}) => theme.colors.text.primary};
`;

const Subtitle = styled.p`
  margin-bottom: 20px;
  color: ${({theme}) => theme.colors.text.secondary};
`;
