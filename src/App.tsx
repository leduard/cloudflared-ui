import { BrowserRouter } from "react-router-dom";

import Router from "./Router";
import { Header } from "./components/Header";
import { initializeSettingsManager } from "./utils/settings-manager";
import { useEffect } from "react";

function App() {
    useEffect(() => {
        initializeSettingsManager();
    }, []);

    return (
        <>
            <BrowserRouter>
                <Header />
                <Router />
            </BrowserRouter>
        </>
    );
}

export default App;
