import {AppProviders} from "./providers/AppProviders.tsx";
import {MainPage} from "../pages/MainPage/ui/MainPage.tsx";

function App() {

    return (
        <>
            <AppProviders>
                <MainPage/>
            </AppProviders>
        </>
    )
}

export default App
