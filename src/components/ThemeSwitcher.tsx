"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Switch, useSwitch, VisuallyHidden, SwitchProps } from "@nextui-org/react";
import { MoonIcon, SunIcon } from "@/assets/icons";
import { RiMoonClearFill, RiSunFill } from 'react-icons/ri'

const ThemeSwitcher = (props: SwitchProps) => {
  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps
  } = useSwitch(props);

  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null


  return (
    // <Component {...getBaseProps()}>
    //   <VisuallyHidden>
    //     <input {...getInputProps()} />
    //   </VisuallyHidden>
    //   The current theme is: {theme} &nbsp;
    //   <div
    //     {...getWrapperProps()}
    //     className={slots.wrapper({
    //       class: [
    //         "w-10 h-10",
    //         "flex items-center justify-center",
    //         "rounded-lg hover:bg-default-200",
    //       ],
    //     })}
    //   >
    //     {/* {isSelected ? <SunIcon/> : <MoonIcon/>} */}

    //     {theme === 'dark' ? <RiSunFill onClick={() => setTheme('light')} /> : <RiMoonClearFill onClick={() => setTheme('dark')} />}
    //   </div>
    // </Component>

    <button className="flex items-center p-2 cursor-pointer rounded-full ease-linear outline-none hover:rotate-90 duration-300 hover:fill-stone-700">
      {theme === 'dark' ? <RiSunFill size={20} onClick={() => setTheme('light')} /> : <RiMoonClearFill size={20} onClick={() => setTheme('dark')} />}
    </button>
  )
}

export default ThemeSwitcher
