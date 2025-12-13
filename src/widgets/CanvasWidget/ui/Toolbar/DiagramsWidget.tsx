import styled from 'styled-components';
import {useMutation, useQuery} from "@apollo/client/react";
import {ALL_DIAGRAMS_TITLES, DELETE_DIAGRAM} from "@/shared/api";
import {Button, Loader} from "@/shared/Button";
import {useState} from "react";
import type {DiagramType} from "@/entities/Diagram";

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
    const [titleInputValue, setTitleInputValue] = useState<string>('');
    const [isTitleInputOpen, setIsTitleInputOpen] = useState<boolean>(false);
    const {data, error, loading} = useQuery(ALL_DIAGRAMS_TITLES);
    const [removeDiagram, {error: removeError}] = useMutation(DELETE_DIAGRAM, {
        update(cache, {data: {removeDiagram}}) {
            cache.modify({
                fields: {
                    allDiagrams(existingDiagrams = []) {
                        return existingDiagrams.filter((diagram: {__ref: string}) => diagram.__ref !== `Diagram:${removeDiagram.id}`);
                    }
                }
            });
        }
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleInputValue(e.target.value);
    };

    const handleSaveButtonClick = () => {
        if (!isTitleInputOpen) {
            setIsTitleInputOpen(true);
        } else if (titleInputValue.trim()) {
            handleSaveDiagram();
        }
    };

    const handleSaveDiagram = () => {
        console.log('Сохранение диаграммы с названием:', titleInputValue);
        setTitleInputValue('');
        setIsTitleInputOpen(false);

        // Здесь будет
        //todo вызов мутации для сохранения
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && titleInputValue.trim()) {
            handleSaveDiagram();
        }
    };

    const handleDeleteDiagram = (id: string) => {
        removeDiagram({
            variables: {id}
        });
    };

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
                {data && data?.allDiagrams.map((diagram: DiagramType) =>
                    (<div key={diagram.title + 'del' + diagram.id}
                          style={{display: 'flex', alignItems: 'center', gap: '.2rem'}}>
                        <Button
                            style={{minWidth: '1.2rem', padding: 0, height: '1.2rem'}}

                            variant={'ghost'}
                            size={"sm"}
                            onClick={() => handleDeleteDiagram(diagram.id)}
                        >❌</Button>
                        <Button key={diagram.id + 'diagram' + diagram.title}>
                            {diagram.title}
                        </Button>
                    </div>)
                )}
            </div>
            <input
                value={titleInputValue}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                hidden={!isTitleInputOpen}
                style={{
                    width: '10rem',
                    backgroundColor: !titleInputValue.length ? 'red' : '#fff',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    border: '1px solid #ccc'
                }}
                type={'text'}
                placeholder="Введите название"
            />
            <Button
                style={titleInputValue.length ? {backgroundColor: '#25cb13', color: '#fff'} : {}}
                disabled={isTitleInputOpen && !titleInputValue.length}
                onClick={handleSaveButtonClick}
                variant={'secondary'}
            >
                Save Diagram in DB
            </Button>
        </DiagramsWidgetContainer>
    );
};
