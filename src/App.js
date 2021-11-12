import React from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Home from './routes/Home'
import Profile from './routes/Profile'
import { Login, Auth, AuthStatus, AuthContext, AuthProvider } from './routes/Login'
import { Language } from './i18n';

function Nav() {
  const { t } = useTranslation()

  let auth = React.useContext(AuthContext)

  if (!auth.user) { // not logged in
    return (
      <nav>
        <ul>
          <li><Link to="/">{t('Home')}</Link></li>
          <li><Link to="/docs">{t('Docs')}</Link></li>
        </ul>
      </nav>
    )
  }

  return ( // logged in
    <nav>
      <ul>
        <li><Link to="/">{t('Home')}</Link></li>
        <li><Link to="/docs">{t('Docs')}</Link></li>
        <li><Link to="/profile">{t('Profile')}</Link></li>
      </ul>
    </nav>
  )
}

function Layout() {
  return (
    <div>
      <Language />
      <AuthStatus />
      <Nav />
      <Outlet />
    </div>
  )
}

export default function App() {
  const { t } = useTranslation()
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<div><h1>{t('Docs')}</h1></div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Auth ><Profile /></Auth>} />
          <Route path='/bye' element={<div><h1>{t('Thank you')}</h1></div>} />
          <Route path='*' element={<div><h1>404</h1></div>} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}