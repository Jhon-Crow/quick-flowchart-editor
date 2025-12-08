import styled from 'styled-components';
import {useCanvasStore} from "../../../../entities/Node/model/store/useCanvasStore.ts";
import {Button} from "../../../../shared/ui/Button/Button.tsx";

export const Toolbar = () => {
    const {
        addNode,
        deleteNode,
        selectedNodeId,
        nodes
    } = useCanvasStore();

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

    const handleSelect = () => {
        // В этом режиме выбор происходит по клику на элемент
        // Эта кнопка может переключать режим или просто быть информативной
        console.log('Режим выбора активен (кликайте на элементы)');
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
                <Button onClick={handleSelect} variant="secondary">
                    ✏ Выбрать
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
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
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
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 14px;
`;

const InfoText = styled.span`
  padding: 4px 8px;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 4px;
`;
