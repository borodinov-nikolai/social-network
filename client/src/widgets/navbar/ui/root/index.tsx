import React from 'react'
import styles from './Navbar.module.scss'
import { MobileNavbar } from '../componets/mobileNavbar'
import { DesktopNavbar } from '../componets/desktopNavbar'


export const Navbar = () => {
  return (
    <div className={styles.root} >
        <div className={styles.mobileNavbar} > <MobileNavbar/> </div>
        <div className={styles.desktopNavbar} > <DesktopNavbar/> </div>
    </div>
  )
}
