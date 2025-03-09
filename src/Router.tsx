import { Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Settings from "./pages/Settings";
import LogActivity from "./pages/LogActivity";

function Router() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/logs" element={<LogActivity />} />

                {/* handles not existent routes */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </>
    );
}

export default Router;
