import { Link } from "@/i18n"
import React from "react"

const AuthFooter = () => {
  return (
    <footer>
      <ul className="flex gap-3 list-none">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </footer>
  )
}

export default AuthFooter
