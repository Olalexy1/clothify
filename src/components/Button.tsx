import Image from "next/image";
import { Children, ReactNode } from "react";

interface ButtonPops {
    label?: string;
    iconURL?: string;
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
    fullWidth?: boolean;
    children?: ReactNode;
    className?: string;
    onClick?: () => void;
    isDisabled?: boolean;
    type?: "submit" | "reset" | "button" | undefined;
}

const Button: React.FC<ButtonPops> = ({
    label,
    iconURL,
    backgroundColor,
    textColor,
    borderColor,
    fullWidth,
    children,
    className,
    onClick,
    isDisabled,
    type
}) => {
    return (
        <button
            type={type}
            disabled={isDisabled}
            className={`flex justify-center items-center gap-2 px-7 py-4 border font-montserrat text-base leading-none hover:opacity-80
        ${backgroundColor
                    ? `${backgroundColor} ${textColor} ${borderColor}`
                    : "bg-coral-red text-white border-coral-red"
                } rounded-lg ${className} ${fullWidth && "w-full"} ${isDisabled && "!opacity-50 hover:!opacity-50"}`}
            onClick={onClick}
        >
            {label}

            {children && (
                <span className="inline-block transition-transform">
                    {children}
                </span>
            )}

            {iconURL && (
                <span className="inline-block transition-transform">
                    <Image
                        src={iconURL}
                        alt='icon'
                        className='ml-2 rounded-full bg-white w-5 h-5'
                    />
                </span>
            )}
        </button>
    );
};

export default Button;
