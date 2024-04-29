import { useEffect, useState } from "react";
import { appDataDir } from "@tauri-apps/api/path";
import { TunnelListing } from "../../components/TunnelListing";
import { Header } from "../../components/Header";

function Home(): JSX.Element {
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
            <TunnelListing />

            <hr />
            <div className="p-2">
                <div className="text-sm text-gray-500">
                    <p>
                        <strong>Data directory:</strong>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Home;
