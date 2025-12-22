import {useEffect} from 'react';
import {useCanvasStore} from "@/entities/Node";
import {useShallow} from "zustand/react/shallow";

export const useKeyboardShortcuts = () => {
const { deleteNode, selectedNodeId, clearSelection } = useCanvasStore(
    useShallow((state) => ({
        deleteNode: state.deleteNode,
        selectedNodeId: state.selectedNodeId,
        clearSelection: state.clearSelection,
    }))
);
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Удаление по клавише Delete или Backspace
            if ((e.key === 'Delete' || e.key === 'Backspace') && selectedNodeId) {
                e.preventDefault();
                deleteNode(selectedNodeId);
            }

            // Отмена выбора по Escape
            if (e.key === 'Escape') {
                clearSelection();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [deleteNode, selectedNodeId]);
};
