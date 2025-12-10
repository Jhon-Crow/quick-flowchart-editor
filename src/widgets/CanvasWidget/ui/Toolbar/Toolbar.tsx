import styled from 'styled-components';
import {useCanvasStore} from "@/entities/Node";
import {Button} from "@/shared/Button";
import React, {useEffect, useRef, useState} from "react";
import type {ArrowType} from "@/entities/Node/model/types.ts";

export const Toolbar = () => {
    const {
        addNode,
        updateNodeText,
        deleteNode,
        selectedNodeId,
        clearSelection,
        nodes,
        addArrow,
    } = useCanvasStore();

    const ref = useRef<HTMLInputElement | null>(null);

    const [isArrowMode, setIsArrowMode] = useState(false);

    const [addSimpleArrowActive, setAddSimpleArrowActive] = useState(false);
    const [addDoubleArrowActive, setAddDoubleArrowActive] = useState(false);

    const [sourceId, setSourceId] = useState<string | null>(null);
    const [arrowType, setArrowType] = useState<ArrowType | null>(null);

    const handleEditNodeText = () => {
        if (selectedNodeId && ref.current) {
            updateNodeText(selectedNodeId, ref.current.value || '');
        }
    };

    const handleAddSimpleArrow = (e: React.MouseEvent) => {
        e.preventDefault();
        clearSelection();
        setAddSimpleArrowActive(true);
        setArrowType("directional");
        setIsArrowMode(true);
    };

    const handleAddDoubleArrow = (e: React.MouseEvent) => {
        e.preventDefault();
        clearSelection();
        setAddDoubleArrowActive(true);
        setArrowType("bidirectional");
        setIsArrowMode(true);
    };

    useEffect(() => {
        if (isArrowMode) {
            if (!sourceId) {
                setSourceId(selectedNodeId);
            } else {
                if (arrowType && selectedNodeId) addArrow(arrowType, sourceId, selectedNodeId);
                setArrowType(null);
                setSourceId(null);
                setIsArrowMode(false);
                setAddSimpleArrowActive(false);
                setAddDoubleArrowActive(false);
            }
        }
    }, [selectedNodeId]);

    const handleAddRectangle = () => {
        addNode('rectangle', 100, 100);
    };

    const handleAddCircle = () => {
        addNode('circle', 250, 150);
    };

    const handleDelete = () => {
        if (selectedNodeId) {
            deleteNode(selectedNodeId);
        }
    };

    const selectedNode = nodes.find(node => node.id === selectedNodeId);

    return (
        <StyledToolbar>
            <ToolbarSection>
                <Button onClick={handleAddRectangle} variant="primary">
                    ▭ Добавить прямоугольник
                </Button>
                <Button onClick={handleAddCircle} variant="primary">
                    ○ Добавить круг
                </Button>
                <Button
                    isActive={addSimpleArrowActive}
                    disabled={isArrowMode}
                    onClick={handleAddSimpleArrow}
                    variant="secondary">
                    → Добавить стрелку
                </Button>
                <Button
                    isActive={addDoubleArrowActive}
                    disabled={isArrowMode}
                    onClick={handleAddDoubleArrow}
                    variant="secondary">
                    ↔ Добавить двойную стрелку
                </Button>

                <input
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleEditNodeText();
                        }
                    }}
                    disabled={!selectedNodeId}
                    placeholder={'Изменить текст выбранного элемента'} type={'text'}
                    ref={ref}/>
                <Button
                    onClick={handleEditNodeText}
                    variant={'ghost'}
                    disabled={!selectedNodeId}>
                    📝 Редактировать текст
                </Button>

                <Button
                    onClick={handleDelete}
                    variant="danger"
                    disabled={!selectedNodeId}
                >
                    🗑 Удалить
                </Button>
            </ToolbarSection>

            <InfoPanel>
                {selectedNode ? (
                    <InfoText>
                        Выбран: {selectedNode.text} (ID: {selectedNodeId?.slice(0, 8)}...)
                    </InfoText>
                ) : (
                    <InfoText>Ничего не выбрано</InfoText>
                )}
                <InfoText>Элементов: {nodes.length}</InfoText>
            </InfoPanel>
        </StyledToolbar>
    );
};

const StyledToolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: ${({theme}) => theme.colors.surface};
  border-bottom: 1px solid ${({theme}) => theme.colors.border};
  flex-wrap: wrap;
  gap: 16px;
`;

const ToolbarSection = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const InfoPanel = styled.div`
  display: flex;
  gap: 16px;
  color: ${({theme}) => theme.colors.text.secondary};
  font-size: 14px;
`;

const InfoText = styled.span`
  padding: 4px 8px;
  background: ${({theme}) => theme.colors.background};
  border-radius: 4px;
`;
