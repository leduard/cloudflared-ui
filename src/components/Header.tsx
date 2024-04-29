import { ActivityIcon, MountainIcon, SettingsIcon } from "lucide-react";
import { Link } from "react-router-dom";

export function Header(): JSX.Element {
    return (
        <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b bg-white dark:bg-gray-950 drop-shadow-md">
            <Link className="flex items-center gap-2" to={{ pathname: "/" }}>
                <MountainIcon className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
            </Link>
            <div className="flex items-center gap-4">
                <Link
                    className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
                    to={{ pathname: "/logs" }}
                >
                    <ActivityIcon className="h-5 w-5" />
                    Logs
                </Link>
                <Link
                    className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
                    to={{ pathname: "/settings" }}
                >
                    <SettingsIcon className="h-5 w-5" />
                    Settings
                </Link>
            </div>
        </header>
    );
}
