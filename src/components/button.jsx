import { useContext } from "react"
import { useTheme } from "../hooks/useContext"

export default function Button({ titleRef, mutate, children }) {
  const { theme } = useTheme();
  return (
    <button
      style={{ color: "green", background: theme }}
      // disabled={isLoading}
      onClick={
        () => {
          mutate(titleRef)
        }
      }
    >
      {children} </button>
  )
}
