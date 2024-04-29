import { Button } from "@/components/ui/button";
import { TunnelItem } from "./TunnelItem";
import { Plus } from "lucide-react";

const TUNNEL_LIST: Tunnel[] = [
    {
        id: 1,
        name: "Minecraft Vanilla",
        description: "Simple Minecraft server for friends and family",
        online: true,
        publicHost: "tcp://mc1.eduaard.com",
        localHost: "tcp://localhost:27000",
        createdAt: "2023-06-14",
    },
    {
        id: 2,
        name: "SSH Tunnel",
        description: "SSH tunnel for secure connection to home network",
        online: false,
        publicHost: "tcp://ssh.eduaard.com",
        localHost: "tcp://localhost:27001",
        createdAt: "2023-06-14",
    },
    {
        id: 2,
        name: "SSH Tunnel",
        description: "SSH tunnel for secure connection to home network",
        online: false,
        publicHost: "tcp://ssh.eduaard.com",
        localHost: "tcp://localhost:27001",
        createdAt: "2023-06-14",
    },
];

export function TunnelListing() {
    return (
        <>
            <div className="mt-4 flex justify-center">
                <Button variant="outline">
                    <Plus className="mr-2" /> New Tunnel
                </Button>
            </div>

            <hr className="mt-4" />

            <div
                className="px-4 py-4 bg-gray-100"
                style={{
                    maxHeight: "calc(100vh - 160px)",
                    overflowY: "scroll",
                }}
            >
                {TUNNEL_LIST.map((tunnel) => (
                    <TunnelItem key={tunnel.id} {...tunnel} />
                ))}
            </div>
        </>
    );
}
