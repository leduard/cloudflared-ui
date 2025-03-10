type Tunnel = {
    id: number;
    name: string;
    description: string;
    online: boolean;
    publicHost: string;
    localHost: string;
    createdAt: string;
};

type SettingsManagerSchema = {
    theme: "dark" | "light";
    tunnels: Tunnel[];
};
