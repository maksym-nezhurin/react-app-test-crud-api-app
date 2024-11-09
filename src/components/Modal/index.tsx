import { Button } from "../ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog"

export const Modal:React.FC = ({ title, description, trigger: Tr, children }: {
    title: string;
    description: string;
    trigger: React.ReactNode;
    children: React.ReactNode
}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {Tr}
                {/*<Button variant="outline">Share</Button>*/}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <>
                        {children}
                    </>
                </div>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
