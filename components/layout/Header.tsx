import React, { useEffect, useState } from "react"
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './Header.module.scss'

const Header = () => {
  const [path, setPath] = useState<string>('/')
  const [nav, setNav] = useState<boolean>(false)

  const router = useRouter()
  console.log(router.pathname)

  const toggleNav = () => {
    setNav(!nav)
  }

  useEffect(() => {
    setPath(router.pathname)
  }, [router.pathname])

  return (<>
    <header>
      <div className={ styles.wrapper_pc_nav }>
        <nav>
          <ul>
            <li className={ path === "/" ? styles.current : "" }>
              <Link href="/">
                <span>Home</span>
              </Link>
            </li>
            <li className={ path === "/profile" ? styles.current : "" }>
              <Link href="/profile">
                <span>Profile</span>
              </Link>
            </li>
            <li className={ path === "/contact" ? styles.current : "" }>
              <Link href="/contact">
                <span>Contact</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className={styles.wrapper_sp_nav}>
        <div className={`${styles.openbtn1} ${nav ? styles.active : ""}`}
          onClick={toggleNav}
        ><span></span><span></span><span></span></div>
          <nav className={`${styles.g_nav} ${nav ? styles.panelactive : ""}`}>
            <div className={styles.g_nav_list}>
              <ul>
                <li onClick={toggleNav}>
                  <Link href="/">
                    <span>Home</span>
                  </Link>
                </li>
                <li onClick={toggleNav}>
                  <Link href="/profile">
                    <span>Profile</span>
                  </Link>
                </li>
                <li onClick={toggleNav}>
                  <Link href="/contact">
                    <span>Contact</span>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        <div className={`${styles.circle_bg} ${nav ? styles.circleactive : ""}`}></div>
      </div>
    </header>
  </>)
}

export default Header