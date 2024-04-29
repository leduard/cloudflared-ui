import { useEffect, useState } from "react";
import { appDataDir } from "@tauri-apps/api/path";
import { Header } from "../../components/Header";

function Settings(): JSX.Element {
    const [dataDir, setDataDir] = useState<string>("");
    const [configDir, setConfigDir] = useState<string>("");

    useEffect(() => {
        async function run() {
            const baseDir = await appDataDir();

            setConfigDir(`${baseDir}/config`);
            setDataDir(`${baseDir}/data`);
        }

        run();
    }, []);

    return (
        <>
            <Header />
            <h1>Settings</h1>
        </>
    );
}

export default Settings;
