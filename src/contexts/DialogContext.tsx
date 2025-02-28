"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"
import ConsultationDialog from "@/components/ConsultationDialog"

interface DialogContextType {
  openDialog: () => void
  closeDialog: () => void
}

const DialogContext = createContext<DialogContextType | undefined>(undefined)

export function DialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  const openDialog = () => setOpen(true)
  const closeDialog = () => setOpen(false)

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
