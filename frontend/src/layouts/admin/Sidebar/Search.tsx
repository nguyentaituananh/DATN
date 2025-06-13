"use client"
import { useState } from "react"
import { FiCommand, FiSearch } from "react-icons/fi"
import CommandMenu from "./CommandMenu"

export const Search = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="relative flex items-center px-3 py-2 text-sm bg-stone-100 dark:bg-stone-800 rounded-md shadow-sm mb-4">
        <FiSearch className="mr-2 text-stone-500" />

        <input
          onFocus={(e) => {
            e.target.blur()
            setOpen(true)
          }}
          type="text"
          placeholder="Search"
          className="w-full bg-transparent text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none"
        />

        <span className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 text-xs text-stone-500 bg-stone-200 dark:bg-stone-700 rounded">
          <FiCommand className="text-sm" />
          K
        </span>
      </div>

      <CommandMenu open={open} setOpen={setOpen} />
    </>
  )
}
