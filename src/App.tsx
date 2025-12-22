import { Routes, Route } from 'react-router-dom'
import AdminLayout from './components/admin/layout/AdminLayout'
import UserManagement from './pages/admin/UserManagement'
import Categories from './pages/admin/Categories'
import Tags from './pages/admin/Tags'
import AddNewPhoto from './pages/admin/AddNewPhoto'
import Dashboard from './pages/admin/Dashboard'
import './App.css'
import HomePage from './pages/user/HomePage'
import Auth0ProviderWithNavigate from './user/auth0/auth0-provider'
import { WallpapersPage } from './pages/user/WallpapersPage'
import { StickersPage } from './pages/user/StickersPage'
import { useHideHeroOnNavigate } from './utils/useHideHero'
import AllMedia from './pages/admin/AllMedia'
import { useTypedSelector } from './shared/hooks/redux'
import { Sidebar } from './user/components/sidebar/Sidebar'

function App() {
  useHideHeroOnNavigate('/')
  const { isOpen } = useTypedSelector(state => state.sidebar)
  return (
    <Auth0ProviderWithNavigate>
      {isOpen && <Sidebar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wallpapers" element={<WallpapersPage category="wallpapers"/>} />
        <Route path="/stickers" element={<StickersPage category="stickers"/>} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="all-media" element={<AllMedia />} />
          <Route path="userManagement" element={<UserManagement />} />
          <Route path="categories" element={<Categories />} />
          <Route path="tags" element={<Tags />} />
          <Route path="new-photo" element={<AddNewPhoto />} />
          <Route path="settings" element={<h2>Settings</h2>} />
        </Route>
      </Routes>
    </Auth0ProviderWithNavigate>
  )
}

export default App
