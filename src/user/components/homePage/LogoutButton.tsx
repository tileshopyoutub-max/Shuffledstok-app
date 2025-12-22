import { useAuth0 } from '@auth0/auth0-react'

export const LogoutButton = () => {
  const { logout } = useAuth0()

  return (
    <button
      onClick={() =>
        logout({
          logoutParams: {
            returnTo: window.location.origin, // куда вернётся после выхода
          },
        })
      }
      style={{
        padding: '8px 16px',
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
      Logout
    </button>
  )
}
