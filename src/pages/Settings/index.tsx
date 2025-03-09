import { useEffect, useState } from "react";
import { appLocalDataDir } from "@tauri-apps/api/path";
import { open } from "@tauri-apps/api/dialog";
import { join } from "@tauri-apps/api/path";
import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    CardFooter,
    Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FolderIcon } from "lucide-react";
import { checkAppFolders } from "@/utils/paths";
import { closeApp, showInFolder } from "@/utils/rust-functions";

function Settings(): JSX.Element {
    const [dataDir, setDataDir] = useState<string>("");
    const [_configDir, setConfigDir] = useState<string>("");
    const [cloudflaredPath, setCloudflaredPath] = useState<string>("");
    const [foldersChecked, setFoldersChecked] = useState<boolean>(false);

    useEffect(() => {
        async function run() {
            const localDataDir = await appLocalDataDir();

            // sets the data directory as being
            // C:\Users\<username>\AppData\Local\<app-name>\data
            setDataDir(await join(localDataDir, "data/"));
            setConfigDir(await join(localDataDir, "config/"));

            // sets cloudflared binary path as being inside the data directory
            setCloudflaredPath(await join(localDataDir, "data/cloudflared"));

            if (!foldersChecked) {
                setFoldersChecked(true);
                await checkAppFolders();
            }
        }

        run();
    }, []);

    const handleFileChange = async () => {
        const selected = (await open({
            defaultPath: dataDir,
            title: "Select Cloudflared binary",
        })) as string;

        setCloudflaredPath(selected);
    };

    return (
        <Card className="mx-auto max-w-md border-hidden shadow-none">
            <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>
                    Manage your app settings here.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label className="font-semibold" htmlFor="file-path">
                        Cloudflared Binary
                    </Label>
                    <div className="flex items-center gap-2">
                        <Input
                            id="file-path"
                            type="text"
                            placeholder={cloudflaredPath}
                            value={cloudflaredPath}
                            disabled
                            className="disabled:cursor-text disabled:opacity-100"
                        />
                        <Button variant="outline" onClick={handleFileChange}>
                            Browse
                        </Button>
                    </div>
                    <p className="text-sm text-justify text-gray-500">
                        You can find a list of all available binaries on the{" "}
                        Cloudflared{" "}
                        <a
                            className="text-blue-500 hover:underline"
                            href="https://github.com/cloudflare/cloudflared"
                            target="_blank"
                            rel="noreferrer"
                        >
                            GitHub
                        </a>{" "}
                        page.
                    </p>
                </div>
                <div className="flex justify-end gap-1">
                    <Button
                        variant="outline"
                        onClick={async () => {
                            showInFolder(await join(dataDir, "/"));
                        }}
                    >
                        <FolderIcon className="mr-2 h-4 w-4" />
                        Data Folder
                    </Button>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col justify-end items-end gap-2">
                <Button
                    className="w-full"
                    size="sm"
                    onClick={() => {
                        closeApp();
                    }}
                >
                    Close application
                </Button>
            </CardFooter>
        </Card>
    );
}

export default Settings;
