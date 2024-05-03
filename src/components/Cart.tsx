"use client";
import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { cartProducts } from '@/constants';
import { Badge, Select, SelectItem } from "@nextui-org/react";

interface CartIconProps {
    count: number;
    size?: number;
    height?: number;
    width?: number
}

const Cart: React.FC<CartIconProps> = ({ count, size, height, width, ...props }) => {

    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="flex cursor-pointer space-x-3 hover:text-coral-red py-2" onClick={() => { setOpen(true) }}>
                <Badge color="danger" content={count > 99 ? `99+` : count} size="sm" placement='top-right' shape="circle"
                    classNames={{
                        badge: `bg-coral-red p-${count >= 10 ? '1' : '2'}`,
                        base: 'text-xs leading-none font-bold'
                    }}>
                    <svg
                        fill="none"
                        height={size || height || 24}
                        viewBox="0 0 24 24"
                        width={size || width || 24}
                        xmlns="http://www.w3.org/2000/svg"
                        {...props}
                    >
                        <path
                            d="M16.25 22.5C17.2165 22.5 18 21.7165 18 20.75C18 19.7835 17.2165 19 16.25 19C15.2835 19 14.5 19.7835 14.5 20.75C14.5 21.7165 15.2835 22.5 16.25 22.5Z"
                            fill='currentColor'
                        />
                        <path
                            d="M8.25 22.5C9.2165 22.5 10 21.7165 10 20.75C10 19.7835 9.2165 19 8.25 19C7.2835 19 6.5 19.7835 6.5 20.75C6.5 21.7165 7.2835 22.5 8.25 22.5Z"
                            fill='currentColor'
                        />
                        <path
                            d="M4.84 3.94L4.64 6.39C4.6 6.86 4.97 7.25 5.44 7.25H20.75C21.17 7.25 21.52 6.93 21.55 6.51C21.68 4.74 20.33 3.3 18.56 3.3H6.27C6.17 2.86 5.97 2.44 5.66 2.09C5.16 1.56 4.46 1.25 3.74 1.25H2C1.59 1.25 1.25 1.59 1.25 2C1.25 2.41 1.59 2.75 2 2.75H3.74C4.05 2.75 4.34 2.88 4.55 3.1C4.76 3.33 4.86 3.63 4.84 3.94Z"
                            fill='currentColor'
                        />
                        <path
                            d="M20.5101 8.75H5.17005C4.75005 8.75 4.41005 9.07 4.37005 9.48L4.01005 13.83C3.87005 15.54 5.21005 17 6.92005 17H18.0401C19.5401 17 20.8601 15.77 20.9701 14.27L21.3001 9.6C21.3401 9.14 20.9801 8.75 20.5101 8.75Z"
                            fill='currentColor'
                        />
                    </svg>
                </Badge>
                <p className='transition-colors duration-200 ease-out font-montserrat font-semibold'>Cart</p>
            </div>


            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-hidden">
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                <Transition.Child
                                    as={Fragment}
                                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                                    enterFrom="translate-x-full"
                                    enterTo="translate-x-0"
                                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                                    leaveFrom="translate-x-0"
                                    leaveTo="translate-x-full"
                                >
                                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                        <div className="flex h-full flex-col overflow-y-scroll bg-white dark:bg-black shadow-xl scrollbar-thumb-coral-red scrollbar-track-red-100 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                                            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 scrollbar-thumb-coral-red scrollbar-track-red-100 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
                                                <div className="flex items-start justify-between">
                                                    <Dialog.Title className="text-lg font-medium">Shopping cart</Dialog.Title>
                                                    <div className="ml-3 flex h-7 items-center">
                                                        <button
                                                            type="button"
                                                            className="relative -m-2 p-2"
                                                            onClick={() => setOpen(false)}
                                                        >
                                                            <span className="absolute -inset-0.5" />
                                                            <span className="sr-only">Close panel</span>
                                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="mt-8">
                                                    <div className="flow-root">
                                                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                            {cartProducts.map((product) => (
                                                                <li key={product.id} className="flex py-6">
                                                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                        <img
                                                                            src={product.imageSrc}
                                                                            alt={product.imageAlt}
                                                                            className="h-full w-full object-cover object-center"
                                                                        />
                                                                    </div>

                                                                    <div className="ml-4 flex flex-1 flex-col">
                                                                        <div>
                                                                            <div className="flex justify-between text-base font-medium">
                                                                                <h3>
                                                                                    <a href={product.href}>{product.name}</a>
                                                                                </h3>
                                                                                <p className="ml-4">{product.price}</p>
                                                                            </div>
                                                                            <p className="mt-1 text-sm">{product.color}</p>
                                                                        </div>
                                                                        <div className="flex flex-1 items-end justify-between text-sm">
                                                                            {/* <p className="text-gray-500">Qty {product.quantity}</p> */}

                                                                            <Select
                                                                                isRequired
                                                                                placeholder="Select Quantity"
                                                                                defaultSelectedKeys={[1]}
                                                                                className="max-w-20"
                                                                            >
                                                                                {[1, 2, 3, 4, 5].map((number) => (
                                                                                    <SelectItem key={number} value={number}>
                                                                                        {number}
                                                                                    </SelectItem>
                                                                                ))}
                                                                            </Select>

                                                                            <div className="flex">
                                                                                <button
                                                                                    type="button"
                                                                                    className="font-medium text-red-600 hover:text-red-500"
                                                                                >
                                                                                    Remove
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                                <div className="flex justify-between text-base font-medium">
                                                    <p>Subtotal</p>
                                                    <p>$262.00</p>
                                                </div>
                                                <p className="mt-0.5 text-sm">Shipping and taxes calculated at checkout.</p>
                                                <div className="mt-6">
                                                    <a
                                                        href="#"
                                                        className="flex items-center justify-center rounded-md border border-transparent bg-coral-red px-6 py-3 text-base font-medium text-white shadow-sm hover:opacity-90"
                                                    >
                                                        Checkout
                                                    </a>
                                                </div>
                                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                    <p>
                                                        or{' '}
                                                        <button
                                                            type="button"
                                                            className="font-medium text-coral-red hover:opacity-90"
                                                            onClick={() => setOpen(false)}
                                                        >
                                                            Continue Shopping
                                                            <span aria-hidden="true"> &rarr;</span>
                                                        </button>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

        </>

    );
};

export default Cart;
