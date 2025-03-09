import { CardContent, CardFooter, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";

export function TunnelItem(tunnelData: Tunnel): JSX.Element {
    const { name, description, online, publicHost, localHost, createdAt } =
        tunnelData;

    return (
        <Card className="flex flex-col p-5 mb-5">
            <CardContent className="flex-1 grid gap-2 p-0 mb-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {online ? (
                            <div
                                className={`w-3 h-3 rounded-full bg-green-500`}
                            />
                        ) : (
                            <div
                                className={`w-3 h-3 rounded-full bg-red-500`}
                            />
                        )}
                        <h3 className="font-medium">{name}</h3>
                    </div>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                    {description}
                </p>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {publicHost} - {localHost}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {createdAt}
                    </span>
                </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between p-0 justify-end">
                <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                        {online ? "Turn Off" : "Turn On"}
                    </Button>
                    <Button
                        className="text-red-500 hover:bg-red-500 hover:text-white"
                        size="sm"
                        variant="outline"
                    >
                        <TrashIcon className="mr-2 h-4 w-4" />
                        Delete
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
}
