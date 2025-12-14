import styled from 'styled-components';
import {useLazyQuery, useMutation, useQuery} from "@apollo/client/react";
import type {AllDiagramsTitlesType, DiagramByIdType} from "@/shared/api";
import {ALL_DIAGRAMS_TITLES, CREATE_DIAGRAM, DELETE_DIAGRAM, GET_DIAGRAM_BY_ID} from "@/shared/api";
import {Button, Loader} from "@/shared/Button";
import type {ChangeEvent, KeyboardEvent} from "react";
import {useRef, useState} from "react";
import {useCanvasStore} from "@/entities/Node";
import {useShallow} from "zustand/react/shallow";
import type {Reference} from "@apollo/client";

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

// todo обязательно отрефакторить
export const DiagramsWidget = () => {
    const {
        loadDiagram,
        clearSelection,
        nodes,
        arrows
    } = useCanvasStore(
        useShallow((state) => ({
            loadDiagram: state.loadDiagram,
            updateNodeText: state.updateNodeText,
            deleteNode: state.deleteNode,
            selectedNodeId: state.selectedNodeId,
            clearSelection: state.clearSelection,
            nodes: state.nodes,
            arrows: state.arrows,
        }))
    );

    const [createDiagram, {error: createError, loading: createLoading}] = useMutation(CREATE_DIAGRAM, {
        //@ts-expect-error expected unknown
        update(cache, {data: {newDiagram}}) {
            const {allDiagrams} = cache.readQuery({query: ALL_DIAGRAMS_TITLES}) as AllDiagramsTitlesType;

            cache.writeQuery({
                query: ALL_DIAGRAMS_TITLES,
                data: {
                    allDiagrams: [{...newDiagram, __typename: 'Diagram'}, ...allDiagrams]
                }
            });

            cache.modify({
                fields: {
                    Diagram() {
                        return newDiagram;
                    }
                }
            });
        }
    });

    const {data, error, loading} = useQuery<AllDiagramsTitlesType>(ALL_DIAGRAMS_TITLES);
    const [getDiagramById, {
        error: diagramByIdError,
        loading: diagramByIdLoading
    }] = useLazyQuery<DiagramByIdType>(GET_DIAGRAM_BY_ID);

    const [removeDiagram, {error: removeError, loading: removeLoading}] = useMutation(DELETE_DIAGRAM, {
        //@ts-expect-error expected unknown
        update(cache, {data: {removeDiagram}}) {
            // 1. Удаляем из списка allDiagrams
            cache.modify({
                fields: {
                    allDiagrams(existingDiagrams = [], {readField}) {
                        return existingDiagrams.filter((diagramRef: Reference) => {
                            const diagramId = readField('id', diagramRef);
                            return diagramId !== removeDiagram.id;
                        });
                    }
                }
            });

            // 2. Удаляем саму диаграмму из кэша
            const diagramId = cache.identify({
                __typename: 'Diagram',
                id: removeDiagram.id
            });

            if (diagramId) {
                cache.evict({id: diagramId});
            }

            // 3. Удаляем запрос Diagram({"id":"..."}) из ROOT_QUERY
            // Это критически важно, так как эта запись остается в кэше
            cache.evict({
                fieldName: 'Diagram',
                args: {id: removeDiagram.id},
            });

            // 4. Принудительно обновляем кэш
            cache.gc();
        }
    });


    const inputRef = useRef<HTMLInputElement | null>(null);
    const [titleInputValue, setTitleInputValue] = useState<string>('');
    const [isTitleInputOpen, setIsTitleInputOpen] = useState<boolean>(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleInputValue(e.target.value);
    };

    const handleSaveButtonClick = () => {
        if (!isTitleInputOpen) {
            setIsTitleInputOpen(true);
            clearSelection();
            if (inputRef.current) inputRef.current.focus();
        } else if (titleInputValue.trim()) {
            handleSaveDiagram();
            if (inputRef.current) inputRef.current.blur();
        }
    };

    const handleSaveDiagram = () => {
        setIsTitleInputOpen(false);
        if (nodes.length && titleInputValue.length) createDiagram({
            variables: {
                title: titleInputValue,
                nodes: nodes,
                arrows: arrows || [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        });
        setTitleInputValue('');
    };

    const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && titleInputValue.trim()) {
            handleSaveDiagram();
        }
    };

    const handleDeleteDiagram = (id: string) => {
        removeDiagram({
            variables: {id}
        });
    };

    const handleLoadDiagram = async (id: string) => {
        try {
            const {data} = await getDiagramById({
                variables: {id}
            });

            if (data?.Diagram) {
                loadDiagram(data.Diagram.nodes, data.Diagram.arrows);
            } else {
                console.error('Diagram not found');
            }
        } catch (error) {
            console.error('Error loading diagram:', error);
        }
    };

    return (
        <DiagramsWidgetContainer>
            {loading || diagramByIdLoading || createLoading || removeLoading &&
                <Loader style={{borderTopColor: loading || removeLoading ? 'red' : '#25cb13'}} size={"lg"}/>}

            {error && <p style={{color: 'red'}}>{error.message}</p>}
            {removeError && <p style={{color: 'red'}}>{removeError.message}</p>}
            {createError && <p style={{color: 'red'}}>{createError.message}</p>}
            {diagramByIdError && <p style={{color: 'red'}}>{diagramByIdError.message}</p>}
            {/*todo отрефакторить, сделать errorList*/}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                gap: '.2rem'
            }}>
                {data && data?.allDiagrams.map((diagram) =>
                    (<div key={diagram.title + 'del' + diagram.id}
                          style={{display: 'flex', alignItems: 'center', gap: '.2rem'}}>
                        <Button
                            style={{minWidth: '1.2rem', padding: 0, height: '1.2rem'}}
                            variant={'ghost'}
                            size={"sm"}
                            onClick={() => handleDeleteDiagram(diagram.id)}
                        >❌</Button>
                        <Button
                            onClick={() => handleLoadDiagram(diagram.id)}
                            key={diagram.id + 'diagram' + diagram.title}
                        >
                            {diagram.title}
                        </Button>
                    </div>)
                )}
            </div>
            <input
                ref={inputRef}
                value={titleInputValue}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                style={{
                    transition: 'all 0.24s ease-in',
                    height: isTitleInputOpen ? '2rem' : '0',
                    width: '10rem',
                    backgroundColor: !titleInputValue.length ? 'red' : '#fff',
                    padding: isTitleInputOpen ? '4px 8px' : '0',
                    borderRadius: '4px',
                    border: isTitleInputOpen ? '1px solid #ccc' : 'none'
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
