import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { CiLight } from 'react-icons/ci'
import { MdDarkMode } from 'react-icons/md'
import styles from './ThemeSwitch.module.scss'
const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()


  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className={styles.root} >{theme === 'dark' ? <CiLight  onClick={()=> setTheme('light')} />: <MdDarkMode  onClick={()=> setTheme('dark')} /> }</div>
  )
}

export default ThemeSwitch