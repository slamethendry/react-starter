import React from 'react'
import { useNavigate, useLocation, Navigate, Link } from 'react-router-dom'
import { useTranslation } from "react-i18next"

export const AuthContext = React.createContext()

// The login authentication does not connect to a real system - it is just a
// mock / fake login to be replaced with the authentication system on your
// project.  This fakeAuth is copied from React Router Auth example.
export const fakeAuth = {
    isAuthenticated: false,
    login(callback) {
        fakeAuth.isAuthenticated = true
        setTimeout(callback, 100)
    },
    logout(callback) {
        fakeAuth.isAuthenticated = false
        setTimeout(callback, 100)
    }
}

export function AuthProvider({ children }) {
    let [user, setUser] = React.useState(null)

    let login = (newUser, callback) => {
        return fakeAuth.login(() => {
            setUser(newUser)
            callback()
        })
    }

    let logout = () => { return fakeAuth.logout(() => { setUser(null) }) }

    let value = { user, login, logout }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function AuthStatus() {
    let auth = React.useContext(AuthContext)
    let navigate = useNavigate()

    const { t } = useTranslation()

    if (!auth.user) {
        return <div><Link to="/login">{t('Login')}</Link></div>
    }

    return (
        <div>
            <em>{auth.user}</em> &nbsp;
            <button className='logout' onClick={() => {
                auth.logout()
                navigate("/bye", { replace: true })
            }}>
                {t('Logout')}
            </button>
        </div>
    )
}

export function Auth({ children }) {
    let auth = React.useContext(AuthContext)
    let location = useLocation()

    if (!auth.user) {
        return <Navigate to="/login" state={{ from: location }} />
    }

    return children
}

export function Login() {
    let navigate = useNavigate()
    let location = useLocation()
    let auth = React.useContext(AuthContext)
    let { from } = location.state || { from: { pathname: "/" } }

    const { t } = useTranslation()

    function handleSubmit(e) {
        e.preventDefault()
        let formData = new FormData(e.currentTarget)
        let email = formData.get("email")
        auth.login(email, () => {
            navigate(from, { replace: true })
        })
    }

    return (<div>
        <h1>{t('Login')}</h1>
        <form onSubmit={handleSubmit}>
            <label>
                {t('Email')}: <input name="email" type="email" placeholder='hello@example.com' />
            </label>&nbsp;
            <button type="submit">{t('Login')}</button>
        </form>
    </div>)
}