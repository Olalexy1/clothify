'use client';

import React, { useState } from 'react'
import { MailIcon, LockIcon, AppleIcon, GoogleIcon, CalendarIcon } from "@/assets/icons";
import { Link, Input, Button as NextUIButton, ModalHeader, ModalBody, ModalFooter, Checkbox, cn, Select, SelectItem, Selection } from "@nextui-org/react";
import ModalComp from './Modal';
import Button from './Button';
import { Loader2 } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import CustomInput from './CustomInput';
import { DateInput } from "@nextui-org/react";
import { CalendarDate, parseDate } from "@internationalized/date";
import { genders } from '@/constants';

const AuthForm = ({ isModalOpen, onModalOpenChange, onModalClose, type, onFormTypeChange }: AuthFormProps) => {

    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [showTwo, setShowTwo] = useState(false);
    const handleClick = () => setShow(!show);
    const handleClickTwo = () => setShowTwo(!showTwo);

    const handleFormTypeToggle = (e: any) => {
        e.preventDefault();
        const newType = type === 'sign-in' ? 'sign-up' : 'sign-in';
        onFormTypeChange({ type: newType });
    };

    // const { handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(loginSchema) });
    return (
        <ModalComp isModalOpen={isModalOpen} onModalOpenChange={onModalOpenChange} onModalClose={onModalClose}>
            <ModalHeader className="flex flex-col pb-0">{type === 'sign-in' ? 'Log In' : 'Register'}</ModalHeader>
            {
                type === "sign-in" ?
                    <>
                        <p className='px-6 text-sm font-medium text-gray-500 dark:text-gray-400'>
                            Welcome back! Please log in to your account to continue
                        </p>
                    </> :

                    <>
                        <p className='px-6 text-sm font-medium text-gray-500 dark:text-gray-400'>Welcome to our e-commerce platform. We are happy to invite you to explore the amazing world of online shopping</p>
                    </>
            }

            <ModalBody className='mt-3'>
                <form className="space-y-3">
                    <Input
                        autoFocus
                        endContent={
                            <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        label="Email"
                        placeholder="Enter your email"
                        variant="bordered"
                        labelPlacement="inside"
                    />
                    {type === "sign-up" &&
                        <div className='flex justify-between items-center gap-3'>

                            <DateInput
                                label="Date Of Birth"
                                // defaultValue={parseDate("2024-04-04")}
                                // placeholderValue={new CalendarDate(1995, 11, 6)}
                                endContent={
                                    <CalendarIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                                // isInvalid
                                // errorMessage={(value) => {
                                //     if (value.isInvalid) {
                                //         return "Please enter a valid date.";
                                //     }
                                // }}
                                className='w-full'
                                variant='bordered'
                                labelPlacement="inside"
                            />

                            <Select
                                label="Select Gender"
                                variant="bordered"
                                placeholder="Select your Gender"
                                // selectedKeys={value}
                                className="w-full"
                                // onSelectionChange={setValue}
                                labelPlacement="inside"
                            >
                                {genders.map((gender) => (
                                    <SelectItem key={gender.key}>
                                        {gender.label}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                    }

                    <Input
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={handleClick} aria-label="toggle password visibility">
                                {show ? (
                                    <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <FaEye className="text-2xl text-default-400 pointer-events-none" />
                                )}
                            </button>
                        }
                        label="Password"
                        placeholder="Enter your password"
                        type={show ? "text" : "password"}
                        variant="bordered"
                        labelPlacement="inside"
                    />

                    {type === "sign-up" &&
                        <Input
                            endContent={
                                <button className="focus:outline-none" type="button" onClick={handleClickTwo} aria-label="toggle confirm password visibility">
                                    {showTwo ? (
                                        <FaEyeSlash className="text-2xl text-default-400 pointer-events-none" />
                                    ) : (
                                        <FaEye className="text-2xl text-default-400 pointer-events-none" />
                                    )}
                                </button>
                            }
                            label="Confirm Password"
                            placeholder="Confirm your password"
                            type={showTwo ? "text" : "password"}
                            variant="bordered"
                            labelPlacement="inside"
                        />
                    }

                    <div className="flex py-2 px-1 justify-between">
                        <Checkbox
                            classNames={{
                                label: "text-sm font-semibold",
                                wrapper: "hover:bg-opacity-10 p-0 data-[selected=true]:outline-none data-[selected=true]:border-transparent",
                                icon: cn(
                                    "p-[2px]",
                                    "text-white font-bold",
                                    "bg-coral-red border border-red-600 w-full h-full rounded-md"
                                )
                            }}
                            radius='md'
                        >
                            Remember me
                        </Checkbox>
                        {type === "sign-in" &&
                            <button className="focus:outline-none font-semibold text-sm hover:bg-opacity-10">
                                Forgot Password?
                            </button>
                        }
                    </div>
                    <Button type="submit" isDisabled={isLoading} className='transition ease-in duration-200 shadow-md focus:outline-none' fullWidth>
                        {isLoading ? (
                            <div className='flex items-center space-x-1'>
                                <Loader2 size={20} className="animate-spin" />
                                <p className='text-[14px]'>Loading...</p>
                            </div>
                        ) : type === 'sign-in'
                            ? 'Login' : 'Register'
                        }
                    </Button>
                    <div className="flex items-center justify-between mt-4 space-x-2">
                        <span className="w-5/6 border-b dark:border-gray-600"></span>
                        <button
                            className="text-xs font-semibold text-gray-500 dark:text-gray-400 focus:outline-none hover:underline w-full"
                            onClick={(e) => handleFormTypeToggle(e)}
                        >{type === "sign-in" ? "Don't have an account? Register" : "Already have an account? Log in"}
                        </button>
                        <span className="w-5/6 border-b dark:border-gray-600"></span>
                    </div>

                    <div className="flex justify-center items-center w-full">
                        <div className="flex flex-col justify-center items-center w-full">
                            <button
                                className="flex items-center justify-center py-2 bg-white hover:bg-gray-200 focus:ring-offset-blue-200 text-gray-700 !w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
                            >
                                <GoogleIcon />
                                {type === "sign-in" ?
                                    <>
                                        <span className="ml-2">Login with Google</span>
                                    </> :
                                    <>
                                        <span className="ml-2">Register with Google</span>
                                    </>
                                }
                            </button>
                            <button
                                className="flex items-center justify-center py-2 bg-white hover:bg-gray-200  focus:ring-offset-blue-200 text-gray-700 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg mt-4"
                            >
                                <AppleIcon />

                                {type === "sign-in" ?
                                    <>
                                        <span className="ml-2">Login with Apple</span>
                                    </> :
                                    <>
                                        <span className="ml-2">Register with Apple</span>
                                    </>
                                }
                            </button>
                        </div>
                    </div>
                </form>
            </ModalBody>
        </ModalComp>
    )
}

export default AuthForm
