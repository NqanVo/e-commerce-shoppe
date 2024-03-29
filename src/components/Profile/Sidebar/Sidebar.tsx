import React, { memo, useCallback, useState } from 'react'
import { AiOutlineUser, AiOutlineMenu } from 'react-icons/ai'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { MdLogout } from 'react-icons/md'
import { RiBillLine } from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../../../redux/slices/authSlice'
import { ProfileProps } from '../Profile'
import './Sidebar.scss'
import SideBarMenu from './SideBarMenu/SideBarMenu'
import SideBarMenuMoblie from './SideBarMenu/SideBarMenuMoblie'
const Sidebar = memo((props: { userData: ProfileProps }) => {
  const menu_active = useLocation().pathname.split('/')[2]
  const subMenu_active = useLocation().pathname.split('/')[3]
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const handleOpenMenu = useCallback(() => {
    setOpenMenu(!openMenu)
  }, [openMenu])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }
  return (
    <>
      <nav className='profile__nav'>
        <div className='profile__nav__menu'>
          <div className='profile__nav__menu__avatar'>
            <img src={props.userData.image} alt={props.userData.image} />
            <h3>
              {props.userData.firstName} {props.userData.lastName}
            </h3>
          </div>
        </div>
        <SideBarMenu
          Icon={AiOutlineUser}
          menu='account'
          url='/user/account/profile'
          menu_active={menu_active}
          title='Tài khoản'
          subMenu_active={subMenu_active}
          subMenu={[
            {
              url: '/user/account/profile',
              subMenu: 'profile',
              title: 'Hồ sơ'
            },
            {
              url: '/user/account/payment',
              subMenu: 'payment',
              title: 'Ngân Hàng'
            },
            {
              url: '/user/account/address',
              subMenu: 'address',
              title: 'Địa chỉ'
            },
            {
              url: '/user/account/password',
              subMenu: 'password',
              title: 'Đổi mật khẩu'
            }
          ]}
        />
        <SideBarMenu Icon={RiBillLine} menu='purchase' url='/user/purchase' menu_active={menu_active} title='Đơn mua' />
        <SideBarMenu
          Icon={IoMdNotificationsOutline}
          menu='notifications'
          menu_active={menu_active}
          url='/user/notifications/order'
          title='Thông báo'
          subMenu_active={subMenu_active}
          subMenu={[
            {
              url: '/user/notifications/order',
              subMenu: 'order',
              title: 'Đơn Hàng'
            },
            {
              url: '/user/notifications/promotion',
              subMenu: 'promotion',
              title: 'Khuyến Mãi'
            },
            {
              url: '/user/notifications/wallet',
              subMenu: 'wallet',
              title: 'Cập Nhật Ví'
            },
            {
              url: '/user/notifications/activity',
              subMenu: 'activity',
              title: 'Hoạt Động'
            }
          ]}
        />
        <div className='profile__nav__menu'>
          <h3 onClick={handleLogout}>
            <MdLogout size={20} /> Đăng xuất
          </h3>
        </div>
        {!openMenu && <AiOutlineMenu size={26} onClick={handleOpenMenu} className='profile__navMobile__open' />}
      </nav>
      <SideBarMenuMoblie
        openMenu={openMenu}
        menu_active={menu_active}
        subMenu_active={subMenu_active}
        handleOpenMenu={handleOpenMenu}
        handleLogout={handleLogout}
      ></SideBarMenuMoblie>
    </>
  )
})

export default Sidebar
