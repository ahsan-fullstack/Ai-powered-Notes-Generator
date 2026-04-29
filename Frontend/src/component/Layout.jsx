import { Outlet, Routes } from "react-router-dom"
import { Navbar } from "./Navbar"
import { SideBar } from "./SideBar"

export const LayOut = () => {
  return (
    <>
      <Navbar />
      <div className="flex w-full">
        <SideBar />
        <div className="w-full flex items-center justify-center">
          <Outlet />
        </div>
      </div>
    </>
  )
}