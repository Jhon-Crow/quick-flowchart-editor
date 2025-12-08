import {Canvas} from "../../../widgets/CanvasWidget/ui/Canvas/Canvas.tsx";
import {Toolbar} from "../../../widgets/CanvasWidget/ui/Toolbar/Toolbar.tsx";

export const MainPage = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Toolbar/>
            <Canvas/>
        </div>
    );
};