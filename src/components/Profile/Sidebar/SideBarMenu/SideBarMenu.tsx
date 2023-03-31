import React, { memo } from 'react'
import { IconType } from 'react-icons'
import { Link } from 'react-router-dom'

interface SideBarMenuProps {
  menu_active: string
  menu: string
  url: string
  subMenu_active?: string
  subMenu?: {
    url: string
    title: string
    subMenu: string
  }[]
  Icon: IconType
  title: string
}

const SideBarMenu = memo((props: SideBarMenuProps) => {
  const { menu_active, menu, subMenu = [], url, subMenu_active = '', Icon, title } = props
  return (
    <>
      {/* tablet vs desktop  */}
      <div className='profile__nav__menu'>
        <Link to={url}>
          <h3 className={`${menu_active === menu ? 'active' : ''}`}>
            <Icon size={20} /> {title}
          </h3>
        </Link>
        <div className='profile__nav__menu__sub'>
          {subMenu &&
            subMenu.map((sub, index) => (
              <Link key={index} to={sub.url}>
                <p className={`${subMenu_active === sub.subMenu ? 'active' : ''}`}>{sub.title}</p>
              </Link>
            ))}
        </div>
      </div>
    </>
  )
})

export default SideBarMenu
