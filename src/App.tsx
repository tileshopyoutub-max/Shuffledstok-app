import { Routes, Route } from 'react-router-dom'
import AdminLayout from './components/admin/AdminLayout'
import UserManagement from './pages/admin/UserManagement'
import Categories from './pages/admin/Categories'
import Tags from './pages/admin/Tags'
import AddNewPhoto from './pages/admin/AddNewPhoto'
import Dashboard from './pages/admin/Dashboard'
import './App.css'
import HomePage from './pages/user/HomePage'
import Auth0ProviderWithNavigate from './user/auth0/auth0-provider'
import { WallpapersPage } from './pages/user/WallpapersPage'

function App() {
  return (
    <Auth0ProviderWithNavigate>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wallpapers" element={<WallpapersPage />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
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
