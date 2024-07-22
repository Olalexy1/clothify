/* eslint-disable no-unused-vars */

declare interface ModalProps {
  isModalOpen: boolean;
  onModalOpenChange: () => void;
  children: React.ReactNode;
  onModalClose: () => void;
}

declare type FormType = 'sign-in' | 'sign-up';

declare interface AuthFormProps {
  isModalOpen: boolean;
  onModalOpenChange: () => void;
  onModalClose: () => void;
  type: FormType;
  onFormTypeChange: (newType: { type: "sign-in" | "sign-up" }) => void;
}

