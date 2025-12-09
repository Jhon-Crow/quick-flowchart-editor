import {AppProviders} from "./providers/AppProviders.tsx";
import {MainPage} from "@/pages/MainPage";

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
