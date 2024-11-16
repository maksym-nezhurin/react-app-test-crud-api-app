import React, {FC} from "react";
import { Button } from "../ui/button";
import { DialogFooter } from "../ui/dialog";
import {Modal} from "../Modal";

interface IProps {
    title?: string;
    description?: string;
    withReject: boolean;
    confirmButtonLabel: string;
    onConfirm: () => void;
    onClose: () => void;
    children?: React.ReactNode
}
const LogoutConfirmationModal: FC<IProps> = (props: IProps) => {
    const {
        title = 'Are you sure?',
        description = 'You are about to log out. This action will end your current session.',
        withReject = true,
        confirmButtonLabel = 'Logout',
        onConfirm,
        onClose,
        children
    } = props;

    const handleConfirm = () => {
        // Add your logout logic here
        onConfirm()
    };

    return (
        <>
            <Modal title={title} description={description} footer={<DialogFooter>


                <div className={'flex'}></div>
                {
                    withReject && <Button type={'button'} variant="ghost" onClick={() => onClose()}>
                        Cancel
                    </Button>
                }
                <Button variant="destructive" onClick={handleConfirm}>
                    {confirmButtonLabel}
                </Button>
            </DialogFooter>}>
                {children}
            </Modal>
        </>
    );
};

export default LogoutConfirmationModal;
