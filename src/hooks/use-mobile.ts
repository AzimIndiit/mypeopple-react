import * as React from "react"

const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  laptop: 1366,
}

export function useViewport() {
  const [viewport, setViewport] = React.useState<"mobile" | "tablet" | "laptop" | "desktop">("desktop")

  React.useEffect(() => {
    const updateViewport = () => {
      const width = window.innerWidth
      if (width < BREAKPOINTS.mobile) {
        setViewport("mobile")
      } else if (width < BREAKPOINTS.tablet) {
        setViewport("tablet")
      } else if (width < BREAKPOINTS.laptop) {
        setViewport("laptop")
      } else {
        setViewport("desktop")
      }
    }

    window.addEventListener("resize", updateViewport)
    updateViewport()

    return () => window.removeEventListener("resize", updateViewport)
  }, [])

  return viewport
}
