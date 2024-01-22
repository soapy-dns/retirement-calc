"use client"

import { useContext } from "react"

import { ScenarioContext } from "../context/ScenarioContext"
import { AppNavBarDesktop } from "./AppNavBarDesktop"
import { AppNavBarMobile } from "./AppNavBarMobile"

export const AppNavBar = () => {
  return (
    <>
      <div className="hidden md:inline">
        <AppNavBarDesktop />
      </div>
      <div className="md:hidden inline">
        <AppNavBarMobile />
      </div>
    </>
  )
}
