import styled from 'styled-components';
import {lazy, Suspense} from "react";
import {Loader} from "@/shared/Button";
// import {CanvasWidget} from "@/widgets/CanvasWidget";
const CanvasWidget = lazy(() => import('@/widgets/CanvasWidget'));

export const MainPage = () => {
    return (
        <PageContainer>
            <Title>QuickChart — минималистичный конструктор схем</Title>
            <Subtitle>Добавляйте элементы, перетаскивайте их, выбирайте и удаляйте</Subtitle>
            <Suspense fallback={
                <Loader style={{
                    borderTopColor: 'red',
                    marginLeft: '1rem',
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                }} size={"lg"}/>
            }>
                <CanvasWidget/>
            </Suspense>
        </PageContainer>
    );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
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
