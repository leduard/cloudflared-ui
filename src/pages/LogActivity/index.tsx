import { Button } from "@/components/ui/button";

function LogActivity(): JSX.Element {
    return (
        <>
            <div className="flex flex-col items-center justify-center mt-60">
                <h1 className="text-2xl font-bold">To be implemented</h1>

                <Button className="mt-4" onClick={() => history.back()}>
                    Go Back
                </Button>
            </div>
        </>
    );
}

export default LogActivity;
