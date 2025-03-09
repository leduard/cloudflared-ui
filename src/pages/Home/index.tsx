import { Fragment, useRef, useState } from "react";
import { TunnelListing } from "./components/TunnelListing";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TunnelCreateModal } from "./components/TunnelCreateModal";

function Home(): JSX.Element {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="mt-4 flex justify-center">
                <Button
                    variant="outline"
                    onClick={() => {
                        setOpen(true);
                    }}
                >
                    <Plus className="mr-2" /> New Tunnel
                </Button>
            </div>

            <hr className="mt-4" />

            <TunnelListing />

            <hr />
            <div className="p-2">
                <div className="text-sm text-gray-500">
                    <strong>Data directory:</strong>
                </div>
            </div>

            <TunnelCreateModal isOpen={open} setOpen={setOpen} />
        </>
    );
}

export default Home;
