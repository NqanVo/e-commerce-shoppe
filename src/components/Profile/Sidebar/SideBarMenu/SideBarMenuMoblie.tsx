import React, { memo } from 'react'
import { AiOutlineClose, AiOutlineUser } from 'react-icons/ai'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { MdLogout } from 'react-icons/md'
import { RiBillLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const menu = [
  {
    Icon: <AiOutlineUser />,
    menu: 'account',
    url: '/user/account/profile',
    title: 'Tài khoản',
    subMenu: [
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
    ]
  },
  {
    Icon: <RiBillLine />,
    menu: 'purchase',
    url: '/user/purchase',
    title: 'Đơn mua'
  },
  {
    Icon: <IoMdNotificationsOutline />,
    menu: 'notifications',
    url: '/user/notifications/order',
    title: 'Thông báo',
    subMenu: [
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
    ]
  }
]

const SideBarMenuMoblie = memo(({ openMenu, menu_active, subMenu_active, handleOpenMenu, handleLogout }: any) => {
  return (
    <div className={`profile__navMobile ${openMenu && 'profile__navMobile__open'}`} onClick={handleOpenMenu}>
      {menu.map((item, index) => (
        <div key={index} className='profile__navMobile__menuMobile' onClick={(e) => e.stopPropagation()}>
          <Link to={item.url}>
            <h3 className={`${menu_active === menu ? 'active' : ''}`}>
              {item.Icon} {item.title}
            </h3>
          </Link>
          <div className='profile__navMobile__menuMobile__subMobile'>
            {item.subMenu &&
              item.subMenu.map((sub, index) => (
                <Link key={index} to={sub.url}>
                  <p className={`${subMenu_active === sub.subMenu ? 'active' : ''}`}>{sub.title}</p>
                </Link>
              ))}
          </div>
        </div>
      ))}
      <div className='profile__navMobile__menuMobile'>
        <h3 onClick={handleLogout}>
          <MdLogout size={20} /> Đăng xuất
        </h3>
      </div>
      <AiOutlineClose size={26} className='profile__navMobile__btn' onClick={handleOpenMenu} />
    </div>
  )
})

export default SideBarMenuMoblie
