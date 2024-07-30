import { Input, InputProps } from '@nextui-org/react';
import React from 'react';
import { cn } from '@nextui-org/react';
import { z } from 'zod'
import { Control, FieldPath } from "react-hook-form";
import { authFormSchema } from '@/utils';
import { FormControl, FormField } from './Form';

const formSchema = authFormSchema('sign-in')

const newFormSchema = formSchema.omit({ terms: true, rememberSession: true, gender: true, dateOfBirth: true });
interface CustomInputProps {
    label?: string;
    placeholder?: string;
    type: string;
    autoComplete?: string;
    variant?: "flat" | "faded" | "bordered" | "underlined" | undefined;
    autoFocus?: boolean;
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
    className?: string;
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
    errorMessage?: string;
    control: Control<z.infer<typeof newFormSchema>>;
    name: FieldPath<z.infer<typeof newFormSchema>>;
}

const CustomInput: React.FC<CustomInputProps & InputProps> = ({
    label,
    placeholder,
    type,
    autoComplete,
    variant,
    autoFocus,
    startContent,
    endContent,
    className,
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
    errorMessage,
    control,
    name,
    ...props
}) => {
    return (
        <FormField
            name={name}
            control={control}
            render={({ field }) =>
                <FormControl>
                    <Input
                        autoFocus={autoFocus}
                        startContent={startContent}
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
                        errorMessage={errorMessage}
                        {...field}
                    />
                </FormControl>

            }
        />


    )
}

export default CustomInput
