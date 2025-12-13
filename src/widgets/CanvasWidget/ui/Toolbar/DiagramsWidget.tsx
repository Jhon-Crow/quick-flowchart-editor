import styled from 'styled-components';
import {useMutation, useQuery} from "@apollo/client/react";
import {ALL_DIAGRAMS_TITLES, DELETE_DIAGRAM} from "@/shared/api";
import {Button, Loader} from "@/shared/Button";

const DiagramsWidgetContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  right: 2rem;
  bottom: 2rem;
  z-index: 999;
`;

export const DiagramsWidget = () => {
    const {data, error, loading} = useQuery(ALL_DIAGRAMS_TITLES);
    const [removeDiagram, {error: removeError}] = useMutation(DELETE_DIAGRAM);

    // todo сделать функцию сохранения диаграмм
    //  добавить инпут для названия диаграммы
    return (
        <DiagramsWidgetContainer>
            {loading && <Loader style={{borderTopColor: 'red'}} size={"lg"}/>}
            {error && <p style={{color: 'red'}}>{error.message}</p>}
            {removeError && <p style={{color: 'red'}}>{removeError.message}</p>}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                gap: '.2rem'
            }}>
                {data && data?.allDiagrams.map((diagram) =>
                    (<div style={{display: 'flex', alignItems: 'center', gap: '.2rem'}}>
                        <Button
                            style={{minWidth: '1.2rem', padding: 0, height: '1.2rem'}}
                            key={diagram.title + 'del' + diagram.id}
                            variant={'ghost'}
                            size={"sm"}
                            onClick={() => removeDiagram({
                                variables: {
                                    id: diagram.id
                                }
                            })}
                        >❌</Button>
                        <Button key={diagram.id + 'diagram' + diagram.title}>
                            {diagram.title}
                        </Button>
                    </div>)
                )}
            </div>
            <Button variant={'secondary'}>Save Diagram in DB</Button>
        </DiagramsWidgetContainer>
    );
};