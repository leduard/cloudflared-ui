import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Settings from "./pages/Settings";

function Router() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/settings" element={<Settings />} />

                {/* handles not existent routes */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </>
    );
}

export default Router;
