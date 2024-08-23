'use client'
import { IconContext } from "react-icons";


function IconProvider({children}) {
  return (
    <IconContext.Provider>
        {children}
    </IconContext.Provider>
  )
}

export default IconProvider