import { ReloadIcon } from "@radix-ui/react-icons"

import { Button } from "../ui/button"

export function ButtonLoading() {
    return (
        <Button disabled className="w-full">
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please wait
        </Button>
    )
}
