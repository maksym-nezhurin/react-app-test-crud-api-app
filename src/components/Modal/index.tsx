import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog"
import {ReactNode} from "react";
import {useModal} from "../../hooks/useModal.tsx";  // Assuming ModalContext is in the same directory

interface ModalProps {
    title?: string;
    description?: string;
    trigger?: ReactNode;
    children?: ReactNode;
    footer?: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
                                                title,
                                                description,
                                                trigger,
    footer,
                                                children
}) => {
    const {isModalOpen, closeModal} = useModal();

    if (!isModalOpen) return null;

    return (
        <Dialog open={isModalOpen} onOpenChange={closeModal}>
            {trigger && <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>}

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <div className="space-x-2">
                    <>
                        {children}
                    </>
                </div>
                {
                    footer && <DialogFooter className="sm:justify-start">
                        {footer}
                    </DialogFooter>
                }

            </DialogContent>
        </Dialog>
    )
}
