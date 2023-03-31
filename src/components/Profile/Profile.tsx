import React, { Fragment, useCallback, useEffect, useState } from 'react'
import './Profile.scss'
import Footer from '../Layout/Footer/Footer'
import Header from '../Layout/Header/Header'
import { fetchWithAuth } from '../../fetchApi/fetchWithAuth'
import Loading from '../UI/Loading/Loading'
import Sidebar from './Sidebar/Sidebar'
import BodyInfo from './Body/BodyInfo/BodyInfo'
import { useLocation } from 'react-router-dom'
import BodyAddress from './Body/BodyAddress/BodyAddress'
import BodyPassword from './Body/BodyPassword/BodyPassword'

export interface ProfileProps {
  address: string
  city: string
  coordinates: {
    lat: number
    lng: number
  }
  postalCode: string
  state: string
  age: number
  bank: {
    cardExpire: string
    cardNumber: string
    cardType: string
    currency: string
    iban: string
  }
  birthDate: string
  bloodGroup: string
  company: {
    address: {
      address: string
      city: string
    }
    city: string
    coordinates: {
      lat: number
      lng: number
    }
    postalCode: string
    state: string
    department: string
    name: string
    title: string
  }
  domain: string
  ein: string
  email: string
  eyeColor: string
  firstName: string
  gender: string
  hair: {
    color: string
    type: string
  }
  height: number
  id: number
  image: string
  ip: string
  lastName: string
  macAddress: string
  maidenName: string
  password: string
  phone: string
  ssn: string
  university: string
  userAgent: string
  username: string
  weight: number
}

const Profile = () => {
  const [userData, setUserData] = useState<ProfileProps>()
  const subMenu_active = useLocation().pathname.split('/')[3]
  const menu_active = useLocation().pathname.split('/')[2]

  useEffect(() => {
    const getDataUserApi = async () => {
      await fetchWithAuth('https://dummyjson.com/users/15', {}).then((data) => setUserData(data))
    }
    getDataUserApi()
  }, [])

  const handleUpdateInfo = useCallback((data: ProfileProps) => {
    setUserData(data)
  }, [])

  return (
    <div>
      <Header />
      {!userData ? (
        <Loading />
      ) : (
        <section className='container container__profile'>
          <Sidebar userData={userData}></Sidebar>
          <div className='profile__body'>
            {menu_active === 'account' && (
              <Fragment>
                {subMenu_active === 'profile' && <BodyInfo userData={userData} handleUpdate={handleUpdateInfo} />}
                {subMenu_active === 'payment' && <>404</>}
                {subMenu_active === 'address' && <BodyAddress userData={userData} />}
                {subMenu_active === 'password' && <BodyPassword />}
              </Fragment>
            )}
            {menu_active === 'purchase' && <Fragment>404</Fragment>}
            {menu_active === 'notifications' && <Fragment>404</Fragment>}
          </div>
        </section>
      )}
      <Footer />
    </div>
  )
}

export default Profile
