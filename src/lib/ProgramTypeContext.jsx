import { createContext, useContext, useState } from "react"

// Traditional/Alternative is a single global toggle - it holds its value as
// you move between the Overview, Standard, and Science of Reading pages
// rather than resetting per page.
const ProgramTypeContext = createContext(null)

export function ProgramTypeProvider({ children }) {
  const [programType, setProgramType] = useState("Traditional")

  return (
    <ProgramTypeContext.Provider value={{ programType, setProgramType }}>
      {children}
    </ProgramTypeContext.Provider>
  )
}

export function useProgramType() {
  const context = useContext(ProgramTypeContext)
  if (!context) {
    throw new Error("useProgramType must be used within a ProgramTypeProvider")
  }
  return context
}
