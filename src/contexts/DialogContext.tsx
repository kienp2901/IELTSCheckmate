"use client"

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react"
import ConsultationDialog from "@/components/ConsultationDialog"

interface DialogContextType {
  openDialog: () => void
  closeDialog: () => void
}

const DialogContext = createContext<DialogContextType | undefined>(undefined)

function isContactHashLink(anchor: HTMLAnchorElement) {
  const href = anchor.getAttribute("href")
  if (!href) return false
  return href === "#contact" || href.endsWith("#contact")
}

export function DialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  const openDialog = () => setOpen(true)
  const closeDialog = () => setOpen(false)

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      const link = target?.closest("a")
      if (!(link instanceof HTMLAnchorElement) || !isContactHashLink(link)) return

      event.preventDefault()
      event.stopPropagation()
      setOpen(true)
    }

    document.addEventListener("click", handleClick, true)
    return () => document.removeEventListener("click", handleClick, true)
  }, [])

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog }}>
      {children}
      <ConsultationDialog open={open} onClose={closeDialog} />
    </DialogContext.Provider>
  )
}

export function useDialog() {
  const context = useContext(DialogContext)
  if (!context) {
    throw new Error("useDialog must be used within a DialogProvider")
  }
  return context
}
