"use client"
import React, { useRef, Fragment, useState } from "react";
import { hamburger, SearchIcon } from "@/assets/icons";
import { ClothifyLogo } from "@/assets/images";
import { navLinks, navigation } from "../constants";
import Image from "next/image";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import { Dialog, Popover, Tab, Transition } from '@headlessui/react';
import ThemeSwitcher from "./ThemeSwitcher";
import CartIcon from "./Cart";
import { XMarkIcon } from '@heroicons/react/24/outline'


const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [activeFlyoutId, setActiveFlyoutId] = useState('');
  // const containerRef = useRef()

  const handleFlyout = (id: string) => {
    setIsMenuOpen(false);
    setActiveFlyoutId(id);
    setOpen(true)

    // if (activeFlyoutId === id) {
    //   setOpen(true)
    // } else {

    // }
  }

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <header className='padding-x py-1 w-full sticky top-0 z-40 backdrop-filter backdrop-blur'>
      <nav className='max-container'>
        <Navbar
          // isBordered
          isBlurred={false}
          isMenuOpen={isMenuOpen}
          onMenuOpenChange={setIsMenuOpen}
          className="bg-transparent"
          maxWidth="full"
          classNames={{ wrapper: "px-0", content: "" }}
          position="sticky"
        >

          <NavbarContent justify="start" className="">
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              className="md:hidden"
            />
            <NavbarBrand className="">
              <a href='/' className="flex items-center">
                <Image
                  src={ClothifyLogo}
                  alt='logo'
                  // width={50}
                  // height={29}
                  className='m-0 w-[40px] h-[50px] p-0 mr-3'
                />
                <p className="hidden sm:block font-bold text-xl font-montserrat text-coral-red">Clothify</p>
              </a>
            </NavbarBrand>
          </NavbarContent>

          <NavbarContent className="hidden md:flex gap-3 ">
            <Input
              classNames={{
                base: "max-w-full h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
              }}
              placeholder="Type to search..."
              size="sm"
              startContent={<SearchIcon size={18} />}
              type="search"
            />
          </NavbarContent>

          <NavbarContent as="div" className="items-center m-0" justify="end">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name="Jason Hughes"
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">zoey@example.com</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
                <DropdownItem key="logout" color="danger">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <ThemeSwitcher className="hidden md:flex transition-transform" />
            <CartIcon count={6}/>
          </NavbarContent>

          <NavbarMenu className="padding-x">
            <div className="flex-1 flex flex-col py-5 justify-between">
              <div className="space-y-3">
                {navLinks.map((item, index) => (
                  <NavbarMenuItem key={item.id}>
                    <Link
                      className="w-full"
                      // color={
                      //   index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
                      // }
                      href="#"
                      size="lg"
                      // onClick={() => setIsMenuOpen(false)}
                      onClick={() => handleFlyout(item.id)}
                    >
                      {item.label}
                    </Link>
                  </NavbarMenuItem>
                ))}
                <Input
                  classNames={{
                    base: "max-w-full h-10",
                    mainWrapper: "h-full",
                    input: "text-small",
                    inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                  }}
                  placeholder="Type to search..."
                  size="sm"
                  startContent={<SearchIcon size={18} />}
                  type="search"
                />
              </div>

              <div className="flex flex-row justify-end">
                <ThemeSwitcher className="-mr-2" />
              </div>
            </div>

          </NavbarMenu>

        </Navbar>

        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                  <div className="flex px-4 pb-2 pt-5">
                    <button
                      type="button"
                      className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                      onClick={() => setOpen(false)}
                    >
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Links */}
                  <Tab.Group as="div" className="mt-2">
                    <div className="border-b border-gray-200">
                      <Tab.List className="-mb-px flex space-x-8 px-4">
                        {navigation.categories.map((category) => (
                          <Tab
                            key={category.name}
                            className={({ selected }) =>
                              classNames(
                                selected ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-900',
                                'flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium'
                              )
                            }
                          >
                            {category.name}
                          </Tab>
                        ))}
                      </Tab.List>
                    </div>
                    <Tab.Panels as={Fragment}>
                      {navigation.categories.map((category) => (
                        <Tab.Panel key={category.name} className="space-y-10 px-4 pb-8 pt-10">
                          <div className="grid grid-cols-2 gap-x-4">
                            {category.featured.map((item) => (
                              <div key={item.name} className="group relative text-sm">
                                <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                  <img src={item.imageSrc} alt={item.imageAlt} className="object-cover object-center" />
                                </div>
                                <a href={item.href} className="mt-6 block font-medium text-gray-900">
                                  <span className="absolute inset-0 z-10" aria-hidden="true" />
                                  {item.name}
                                </a>
                                <p aria-hidden="true" className="mt-1">
                                  Shop now
                                </p>
                              </div>
                            ))}
                          </div>
                          {category.sections.map((section) => (
                            <div key={section.name}>
                              <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900">
                                {section.name}
                              </p>
                              <ul
                                role="list"
                                aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                                className="mt-6 flex flex-col space-y-6"
                              >
                                {section.items.map((item) => (
                                  <li key={item.name} className="flow-root">
                                    <a href={item.href} className="-m-2 block p-2 text-gray-500">
                                      {item.name}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </Tab.Panel>
                      ))}
                    </Tab.Panels>
                  </Tab.Group>

                  <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                    {navigation.pages.map((page) => (
                      <div key={page.name} className="flow-root">
                        <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                          {page.name}
                        </a>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                    <div className="flow-root">
                      <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                        Sign in
                      </a>
                    </div>
                    <div className="flow-root">
                      <a href="#" className="-m-2 block p-2 font-medium text-gray-900">
                        Create account
                      </a>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6">
                    <a href="#" className="-m-2 flex items-center p-2">
                      <img
                        src="https://tailwindui.com/img/flags/flag-canada.svg"
                        alt=""
                        className="block h-auto w-5 flex-shrink-0"
                      />
                      <span className="ml-3 block text-base font-medium text-gray-900">CAD</span>
                      <span className="sr-only">, change currency</span>
                    </a>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* <div className="py-3">
          <ul className='flex-1 flex justify-between items-center max-md:hidden'>
            {navLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className='font-montserrat leading-normal text-lg text-slate-gray'
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div> */}

        {/* Flyout menus */}

        <Popover.Group className="hidden md:block lg:self-stretch">
          <div className="flex h-full justify-between items-center py-2">
            {navigation.categories.map((category) => (
              <Popover key={category.name} className="flex">
                {({ open }) => (
                  <>
                    <div className="relative flex">
                      <Popover.Button
                        className={classNames(
                          open
                            ? 'border-coral-red text-coral-red'
                            : 'border-transparent text-gray-700 dark:text-white dark:hover:text-coral-red',
                          'relative z-10 -mb-px flex items-center border-b-2 pt-px text-base font-medium transition-colors duration-200 ease-out font-montserrat hover:text-coral-red'
                        )}
                      >
                        {category.name}
                      </Popover.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-100"
                      enterTo="opacity-100"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Popover.Panel className="absolute inset-x-0 top-full text-sm text-gray-500">
                        {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                        <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                        <div className="relative bg-white dark:bg-black">
                          <div className="mx-auto max-w-7xl px-8">
                            <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                              <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                {category.featured.map((item) => (
                                  <div key={item.name} className="group relative text-base sm:text-sm">
                                    <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                      <img
                                        src={item.imageSrc}
                                        alt={item.imageAlt}
                                        className="object-cover object-center"
                                      />
                                    </div>
                                    <a href={item.href} className="mt-6 block font-medium text-gray-900 dark:text-white">
                                      <span className="absolute inset-0 z-10" aria-hidden="true" />
                                      {item.name}
                                    </a>
                                    <p aria-hidden="true" className="mt-1 dark:text-slate-50 dark:hover:text-slate-300">
                                      Shop now
                                    </p>
                                  </div>
                                ))}
                              </div>
                              <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                {category.sections.map((section) => (
                                  <div key={section.name}>
                                    <p id={`${section.name}-heading`} className="font-medium text-gray-900 dark:text-white">
                                      {section.name}
                                    </p>
                                    <ul
                                      role="list"
                                      aria-labelledby={`${section.name}-heading`}
                                      className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                    >
                                      {section.items.map((item) => (
                                        <li key={item.name} className="flex">
                                          <a href={item.href} className="hover:text-gray-800 dark:text-slate-50 dark:hover:text-slate-300">
                                            {item.name}
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            ))}

            {navigation.pages.map((page) => (
              <a
                key={page.name}
                href={page.href}
                className="flex items-center text-base font-medium text-gray-700 hover:text-coral-red font-montserrat dark:text-white dark:hover:text-coral-red"
              >
                {page.name}
              </a>
            ))}
          </div>
        </Popover.Group>
      </nav>
    </header>
  );
};

export default Nav;