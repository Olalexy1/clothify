'use client';

import React, { useState } from 'react'
import { MailIcon, AppleIcon, GoogleIcon, CalendarIcon } from "@/assets/icons";
import { ModalHeader, ModalBody, Checkbox, cn, Select, SelectItem, DatePicker } from "@nextui-org/react";
import ModalComp from './Modal';
import Button from './Button';
import { Loader2 } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import CustomInput from './CustomInput';
import { genders } from '@/constants';
import { useForm, Controller } from "react-hook-form";
import { authFormSchema, encryptId, showToast } from '@/utils';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login, signUp } from '@/utils/actions/user.actions';
import { Form } from './Form';
import { parseDate } from "@internationalized/date";

const AuthForm = ({ isModalOpen, onModalOpenChange, onModalClose, type, onFormTypeChange }: AuthFormProps) => {

    const [user, setUser] = useState<any>(null);
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

    const formSchema = authFormSchema(type);

    const methods = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            // terms: false
        }
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);

        console.log(type, 'see type')

        try {

            // if (type === 'sign-up') {
            //     const userData = {
            //         firstName: data.firstName!,
            //         lastName: data.lastName!,
            //         dateOfBirth: data.dateOfBirth!,
            //         email: data.email!,
            //         password: encryptId(data.password!)
            //     }

            //     const newUser = await signUp(userData);

            //     // console.log(newUser, 'See New Data')

            //     setUser(newUser?.data);

            //     if (newUser.error) {
            //         showToast("error", `Sign Up failed: ${newUser.error || newUser.error.error}`);
            //     } else {
            //         showToast("success", "Sign up successful");
            //         // router.push('/dashboard');
            //         showToast("info", "Verification email sent");
            //     }
            // }

            if (type === 'sign-up') {

                const userData = {
                    firstName: data.firstName!,
                    lastName: data.lastName!,
                    // dateOfBirth: data.dateOfBirth!,
                    email: data.email!,
                    password: encryptId(data.password!),
                    terms: data.terms!,
                    gender: data.gender!
                }

                console.log(userData, 'see user sign-up data');

            }

            if (type === 'sign-in') {

                const userData = {
                    email: data.email!,
                    password: encryptId(data.password!),
                    remember: data.rememberSession!,
                }

                console.log(userData, 'see user sign-in data');

                const response = await login({
                    email: data.email!,
                    password: encryptId(data.password!),
                })

                if (response?.loginError) {
                    showToast("error", `Login failed: ${response.loginError}`);
                }
                else {
                    showToast("success", "User successfully logged in");
                    setIsLoading(false);
                }
            }

            // if (type === 'forgot-password') {
            //     const response = await createPasswordRecovery({
            //         email: data.email!
            //     })

            //     if (response?.error) {
            //         showToast("error", `Password recovery failed: ${response.error}`);
            //     }
            //     else {
            //         showToast("info", "Password recovery email sent");
            //         setRecoveryEmail(data.email!)
            //         handleModalState();
            //     }
            // }

        } catch (error) {
            console.log(error);
            showToast("error", `${type === 'sign-in' ? 'Login failed' : 'user registration failed'} ${error}`);
        } finally {
            setIsLoading(false);
        }
    }

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
                <Form {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-3">
                        <CustomInput
                            autoFocus={true}
                            endContent={
                                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                            }
                            label="Email"
                            variant="bordered"
                            labelPlacement="inside"
                            type='email'
                            // isRequired={true}
                            isInvalid={!!methods.formState.errors.email}
                            errorMessage={methods.formState.errors.email?.message}
                            control={methods.control}
                            name="email"
                        />

                        {type === "sign-up" &&
                            <>
                                <div className='flex justify-between items-center gap-3'>
                                    <CustomInput
                                        label="First Name"
                                        // placeholder="Enter your email"
                                        variant="bordered"
                                        labelPlacement="inside"
                                        type='text'
                                        isInvalid={!!methods.formState.errors.firstName}
                                        errorMessage={methods.formState.errors.firstName?.message}
                                        control={methods.control}
                                        name="firstName"
                                    />

                                    <CustomInput
                                        label="Last Name"
                                        // placeholder="Enter your email"
                                        variant="bordered"
                                        labelPlacement="inside"
                                        type='text'
                                        isInvalid={!!methods.formState.errors.lastName}
                                        errorMessage={methods.formState.errors.lastName?.message}
                                        control={methods.control}
                                        name="lastName"
                                    />
                                </div>
                                <div className='flex justify-between items-center gap-3'>

                                    {/* <Controller
                                        name="dateOfBirth"
                                        control={methods.control}
                                        render={({ field: { onChange, onBlur, value } }) => (

                                            <DatePicker
                                                label="Date Of Birth"
                                                endContent={
                                                    <CalendarIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                                }
                                                variant='bordered'
                                                labelPlacement="inside"
                                                // isInvalid={!!methods.formState.errors.dateOfBirth}
                                                // errorMessage={methods.formState.errors.dateOfBirth?.message}
                                                // errorMessage={(value) => {
                                                //     if (value.isInvalid) {
                                                //         return "Please enter a valid date.";
                                                //     }
                                                // }}
                                                showMonthAndYearPickers
                                                onBlur={onBlur}
                                                value={methods.getValues(`dateOfBirth`)}
                                                onChange={onChange}
                                            // value={value ? new Date(value).toISOString().slice(0, 10) : ""}
                                            // onChange={(date) => {
                                            //     const newDateValue = date ? parseDate(date) : null;
                                            //     onChange(newDateValue);
                                            // }}
                                            />
                                        )}
                                    /> */}

                                    <Controller
                                        name="gender"
                                        control={methods.control}
                                        render={({ field: { onChange, onBlur, value, name, } }) => (
                                            <Select
                                                label="Select Gender"
                                                variant="bordered"
                                                // placeholder="Select your Gender"
                                                className="w-full"
                                                labelPlacement="inside"
                                                selectionMode='single'
                                                value={value}
                                                name='gender'
                                                // onSelectionChange={value => field.onChange({
                                                //     target: {
                                                //         name: field.name,
                                                //         value,
                                                //     },
                                                // })}
                                                // onBlur={onBlur}
                                                // onChange={value => onChange({
                                                //     target: {
                                                //         name: name,
                                                //         value: value.key,
                                                //     },
                                                // })}
                                                // onChange={value => onChange(value.key)}
                                                onChange={onChange}
                                                isInvalid={!!methods.formState.errors.gender}
                                                errorMessage={methods.formState.errors.gender?.message}
                                            >
                                                {genders.map((gender) => (
                                                    <SelectItem key={gender.key} value={gender.key}>
                                                        {gender.label}
                                                    </SelectItem>
                                                ))}
                                            </Select>
                                        )}
                                    />
                                </div>
                            </>

                        }

                        <CustomInput
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
                            // placeholder="Enter your password"
                            type={show ? "text" : "password"}
                            variant="bordered"
                            labelPlacement="inside"
                            // isRequired={true}
                            isInvalid={!!methods.formState.errors.password}
                            errorMessage={methods.formState.errors.password?.message}
                            control={methods.control}
                            name="password"
                        />
                        {/* 
                        {type === "sign-up" &&
                            <CustomInput
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
                                // placeholder="Confirm your password"
                                type={showTwo ? "text" : "password"}
                                variant="bordered"
                                labelPlacement="inside"
                                isInvalid={!!methods.formState.errors.confirmPassword}
                                errorMessage={methods.formState.errors.confirmPassword?.message}
                                control={methods.control}
                                name="confirmPassword"
                            />
                        } */}

                        {type === "sign-in" &&
                            <div className="flex py-2 px-1 justify-between">
                                <Controller
                                    name="rememberSession"
                                    control={methods.control}
                                    render={({ field: { onChange, onBlur, value } }) => (
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
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            isSelected={value}
                                        >
                                            Remember me
                                        </Checkbox>
                                    )}
                                />

                                <button className="focus:outline-none font-semibold text-sm hover:bg-opacity-10">
                                    Forgot Password?
                                </button>
                            </div>
                        }

                        {type === "sign-up" &&
                            <div className="flex py-2 px-1 justify-between">
                                <Controller
                                    name="terms"
                                    control={methods.control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({ field: { onChange, onBlur, value } }) => (
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
                                            onBlur={onBlur}
                                            onChange={onChange}
                                            isSelected={value}
                                            isInvalid={!!methods.formState.errors.terms}
                                        >
                                            Terms and Conditions
                                        </Checkbox>
                                    )}
                                />

                            </div>
                        }


                        <Button type="submit" isDisabled={isLoading || type === 'sign-up' && !methods.watch('terms')} className='transition ease-in duration-200 shadow-md focus:outline-none' fullWidth>
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
                </Form>
            </ModalBody>
        </ModalComp>
    )
}

export default AuthForm
