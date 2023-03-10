import React, { useEffect, useState } from "react"
import Link from 'next/link'
import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer>
      <div className={styles.footer}>
        <ul className={styles.menu}>
          <li>
            <Link href="/">
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <Link href="/contact">
              <span>Contact</span>
            </Link>
          </li>
        </ul>
        <p className={styles.copyright}>
          &copy; BarCode Blog
        </p>
      </div>
    </footer>
  )
}

export default Footer