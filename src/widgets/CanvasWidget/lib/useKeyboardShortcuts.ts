import { useEffect } from 'react';
import {useCanvasStore} from "../../../entities/Node/model/store/useCanvasStore.ts";

export const useKeyboardShortcuts = () => {
    const { deleteNode, selectedNodeId } = useCanvasStore();

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Удаление по клавише Delete или Backspace
            if ((e.key === 'Delete' || e.key === 'Backspace') && selectedNodeId) {
                e.preventDefault();
                deleteNode(selectedNodeId);
            }

            // Отмена выбора по Escape
            if (e.key === 'Escape') {
                // Очистка выделения уже есть в клике на Canvas
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [deleteNode, selectedNodeId]);
};
