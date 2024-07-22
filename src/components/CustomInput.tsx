import { Input } from '@nextui-org/react'
import React from 'react'
import { cn } from '@nextui-org/react';

interface CustomInputProps {
    label?: string;
    placeholder: string;
    type: string;
    autoComplete?: string;
    variant?: "flat" | "faded" | "bordered" | "underlined" | undefined;
    autofocus?: boolean;
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
    endContentClick?: () => void;
    className?: string;
    ref?: any;
    isDisabled?: boolean;
    isClearable?: boolean;
    isRequired?: boolean;
    defaultValue?: string;
    labelPlacement?: "outside" | "outside-left" | "inside" | undefined;
    description?: string;
    isInvalid?: boolean;
    classNames?: Partial<Record<"base" | "label" | "inputWrapper" | "innerWrapper" | "mainWrapper" | "input" | "clearButton" | "helperWrapper" | "description" | "errorMessage", string>>;
    fullWidth?: boolean;
    size?: "sm" | "md" | "lg" | undefined;
}

const CustomInput: React.FC<CustomInputProps> = ({
    label,
    placeholder,
    type,
    autoComplete,
    variant,
    autofocus,
    startContent,
    endContent,
    endContentClick,
    className,
    ref,
    isDisabled,
    isClearable,
    isRequired,
    defaultValue,
    labelPlacement,
    description,
    isInvalid,
    classNames,
    fullWidth,
    size,
}) => {
    return (
        <Input
            autoFocus={autofocus}
            startContent={startContent}
            // endContent={
            //     <button className="focus:outline-none" type="button" onClick={endContentClick}
            //     aria-label="toggle password visibility"
            //     >
            //         {endContent}
            //     </button>
            // }
            endContent={endContent}
            label={label}
            placeholder={placeholder}
            variant={variant}
            className={cn(
                "",
                className
            )}
            type={type}
            autoComplete={autoComplete}
            ref={ref}
            isDisabled={isDisabled}
            isClearable={isClearable}
            isRequired={isRequired}
            defaultValue={defaultValue}
            labelPlacement={"inside" || labelPlacement}
            description={description}
            isInvalid={isInvalid}
            color={isInvalid ? "danger" : "default"}
            classNames={classNames}
            fullWidth={fullWidth}
            size={size}
        />
    )
}

export default CustomInput
