import { TunnelItem } from "./TunnelItem";
import { settingsManager } from "@/utils/settings-manager";
import { useEffect, useState } from "react";

export function TunnelListing() {
    const [tunnels, setTunnels] = useState<Tunnel[]>([]);

    useEffect(() => {
        async function run() {
            setTunnels(await settingsManager.get("tunnels"));
        }

        run();
    }, []);

    return (
        <div
            className="px-4 py-4 bg-gray-100"
            style={{
                height: "calc(100vh - 160px)",
                maxHeight: "calc(100vh - 160px)",
                overflowY: "scroll",
            }}
        >
            {tunnels.length === 0 && (
                <div className="text-center text-gray-500">
                    <p>No tunnels created yet.</p>
                    <p>Click on the "New Tunnel" button to create one.</p>
                </div>
            )}

            {tunnels.map((tunnel) => (
                <TunnelItem key={tunnel.id} {...tunnel} />
            ))}
        </div>
    );
}
