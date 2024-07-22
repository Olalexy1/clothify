import React from "react";
import { Modal, ModalContent } from "@nextui-org/react";

const ModalComp = ({ isModalOpen, onModalOpenChange, children, onModalClose }: ModalProps) => {

    return (
        <>
            <Modal
                isOpen={isModalOpen}
                onOpenChange={onModalOpenChange}
                placement="center"
                isDismissable={false}
                isKeyboardDismissDisabled={true}
                backdrop="blur"
                size="xl"
                onClose={onModalClose}
                scrollBehavior="normal"
            >
                <ModalContent className="py-10">
                    {(onClose) => (
                        <>
                            {children}
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default ModalComp
