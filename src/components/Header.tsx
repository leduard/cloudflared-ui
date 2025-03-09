import {
    //  ActivityIcon,
    MountainIcon,
    SettingsIcon,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function Header(): JSX.Element {
    const location = useLocation();

    const homePath = "/";
    // const logsPath = "/logs";
    const settingsPath = "/settings";

    const activeClass = "text-black";

    return (
        <header className="text-gray-400 sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b bg-white dark:bg-gray-950 drop-shadow-md">
            <Link
                className={`flex items-center gap-2 font-medium hover:text-black ${
                    location.pathname === homePath && activeClass
                } transition duration-200 ease-in-out`}
                to={{ pathname: homePath }}
            >
                <MountainIcon className="h-6 w-6" />
                <span>FlaredPannel</span>
            </Link>
            <div className="flex items-center gap-4">
                {/* <Link
                    className={`inline-flex items-center gap-2 text-sm font-medium hover:text-black ${
                        location.pathname === logsPath && activeClass
                    } transition duration-200 ease-in-out`}
                    to={{ pathname: logsPath }}
                >
                    <ActivityIcon className="h-5 w-5" />
                    Logs
                </Link> */}
                <Link
                    className={`inline-flex items-center gap-2 text-sm font-medium hover:text-black ${
                        location.pathname === settingsPath && activeClass
                    } transition duration-200 ease-in-out`}
                    to={{ pathname: settingsPath }}
                >
                    <SettingsIcon className="h-5 w-5" />
                    Settings
                </Link>
            </div>
        </header>
    );
}
