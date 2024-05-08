"use client"
import React, { useRef, Fragment, useState } from "react";
import { UserIcon, SearchIcon, OrderIcon, SavedIcon, HelpIcon, VouchersIcon, LogoutIcon, MessageIcon } from "@/assets/icons";
import { ClothifyLogo } from "@/assets/images";
import { navLinks, navigation } from "../constants";
import Image from "next/image";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Input, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button } from "@nextui-org/react";
import { Dialog, Popover, Tab, Transition } from '@headlessui/react';
import ThemeSwitcher from "./ThemeSwitcher";
import Cart from "./Cart";
import { avatarLetters } from "@/utils";
import { type User } from '@supabase/supabase-js';
import { createClient } from "@/utils/supabase/client";
import { useRouter } from 'next/navigation';


const Nav = ({ user }: { user: User | null }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  // const containerRef = useRef()
  const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  const router = useRouter()

  const supabase = createClient()

  const handleSignOut = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      await supabase.auth.signOut()
    }

    router.refresh()
  }

  return (
    <header className='padding-x py-2 w-full sticky top-0 z-40 backdrop-filter backdrop-blur'>
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

            {user === null ?
              <>
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <div className="flex align-center cursor-pointer space-x-2 hover:text-coral-red">
                      <UserIcon />
                      <p className="font-montserrat font-semibold">Account</p>
                    </div>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="sign_in" href="/login">
                      <Button className="w-full bg-coral-red font-montserrat font-semibold">Sign In</Button>
                    </DropdownItem>
                    <DropdownItem key="sign_up" href="/login">Sign Up</DropdownItem>
                    <DropdownItem
                      key="my_account"
                      href="/account"
                      startContent={<UserIcon className={iconClasses} />}
                    >My Account
                    </DropdownItem>
                    <DropdownItem
                      key="orders"
                      startContent={<OrderIcon className={iconClasses} />}>
                      Orders
                    </DropdownItem>
                    <DropdownItem
                      key="inbox"
                      startContent={<MessageIcon className={iconClasses} />}
                    >Inbox
                    </DropdownItem>
                    <DropdownItem
                      key="saved_items"
                      startContent={<SavedIcon className={iconClasses} />}
                    >Saved Items
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>

              </> :
              <>
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <Avatar
                      as="button"
                      className="transition-transform text-coral-red font-montserrat font-bold text-lg leading-none"
                      name={avatarLetters('Ajayi Olalekan')}
                      size="md"
                    // src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                    />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2">
                      <p className="font-semibold">Signed in as</p>
                      <p className="font-semibold">{user?.email}</p>
                    </DropdownItem>
                    <DropdownItem
                      key="my_account"
                      startContent={<UserIcon className={iconClasses} />}
                      href="/account"
                    >
                      My Account
                    </DropdownItem>
                    <DropdownItem
                      key="orders"
                      startContent={<OrderIcon className={iconClasses} />}
                    >
                      Orders
                    </DropdownItem>
                    <DropdownItem
                      key="inbox"
                      startContent={<MessageIcon className={iconClasses} />}
                    >
                      Inbox
                    </DropdownItem>
                    <DropdownItem
                      key="saved_items"
                      startContent={<SavedIcon className={iconClasses} />}
                    >
                      Saved Items
                    </DropdownItem>
                    <DropdownItem
                      key="vouchers"
                      startContent={<VouchersIcon className={iconClasses} />}
                    >
                      Vouchers
                    </DropdownItem>
                    <DropdownItem
                      key="help_and_feedback"
                      startContent={<HelpIcon className={iconClasses} />}
                    >
                      Help & Feedback
                    </DropdownItem>
                    <DropdownItem
                      key="logout"
                      color="danger"
                      // href="/auth/signout"
                      onClick={() => handleSignOut()}
                      startContent={<LogoutIcon className={iconClasses} />}
                    >
                      Log Out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </>
            }

            <ThemeSwitcher className="hidden md:flex transition-transform" />
            <Cart count={9} />
          </NavbarContent>

          <NavbarMenu className="padding-x scrollbar-thumb-coral-red scrollbar-track-red-100 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
            <div className="flex-1 flex flex-col py-5 justify-between">
              <div className="space-y-3">

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

                <Tab.Group as="div" className="mt-2">
                  <div className="border-b border-gray-200">
                    <Tab.List className="-mb-px flex space-x-8 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected ? 'border-coral-red text-coral-red' : 'border-transparent',
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
                                <Image
                                  src={item.imageSrc}
                                  alt={item.imageAlt}
                                  className="object-cover object-center"
                                  width={500}
                                  height={500}
                                />
                              </div>
                              <a href={item.href} className="mt-6 block font-medium text-gray-900 dark:text-white">
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
                            <p id={`${category.id}-${section.id}-heading-mobile`} className="font-medium text-gray-900 dark:text-white">
                              {section.name}
                            </p>
                            <ul
                              role="list"
                              aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                              className="mt-6 flex flex-col space-y-6"
                            >
                              {section.items.map((item) => (
                                <li key={item.name} className="flow-root">
                                  <a href={item.href} className="-m-2 block p-2 text-gray-500 dark:text-slate-300 dark:hover:text-slate-50">
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
                      <a href={page.href} className="-m-2 block p-2 font-medium hover:text-coral-red">
                        {page.name}
                      </a>
                    </div>
                  ))}
                </div>

              </div>

              <div className="flex flex-row justify-end">
                {/* <ThemeSwitcher className="-mr-2" /> */}
              </div>
            </div>

          </NavbarMenu>

        </Navbar>

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
                                      <Image
                                        src={item.imageSrc}
                                        alt={item.imageAlt}
                                        className="object-cover object-center"
                                        width={500}
                                        height={500}
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