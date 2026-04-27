import { Routes, Route } from "react-router-dom";
import AdminLayout from "./components/admin/layout/AdminLayout";
import UserManagement from "./pages/admin/UserManagement";
import Categories from "./pages/admin/Categories";
import Tags from "./pages/admin/Tags";
import AddNewFile from "./pages/admin/AddNewFile";
import Dashboard from "./pages/admin/Dashboard";
import "./App.css";
import HomePage from "./pages/user/HomePage";
import Auth0ProviderWithNavigate from "./user/auth0/auth0-provider";
import { WallpapersPage } from "./pages/user/WallpapersPage";
import { StickersPage } from "./pages/user/StickersPage";
import { useHideHeroOnNavigate } from "./utils/useHideHero";
import AllMedia from "./pages/admin/AllMedia";
import { AdminRoute } from "./pages/admin/AdminRoute";
import AboutPage from "./pages/user/AboutPage";
import ContactPage from "./pages/user/ContactPage";
import PrivacyPolicyPage from "./pages/user/PrivacyPolicyPage";
import UserLayout from "./user/layouts/UserLayout";
import Blog from "./pages/Blog";
import BestWallpapers2026 from "./pages/BestWallpapers2026";
import InstagramHighlightIcons from "./pages/InstagramHighlightIcons";
import ChooseWallpaperIphone from "./pages/ChooseWallpaperIphone";
import CuteWallpapers from "./pages/CuteWallpapers";
import MinimalInstagramIcons from "./pages/MinimalInstagramIcons";
import CreateAestheticIphoneHomeScreen from "./pages/CreateAestheticIphoneHomeScreen";
import { IconsPage } from "./pages/user/IconsPage";
import AssetDownloadPage from "./pages/user/AssetDownloadPage";

function App() {
  useHideHeroOnNavigate("/");
  return (
    <Auth0ProviderWithNavigate>
      <Routes>
        <Route element={<UserLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/wallpapers"
            element={<WallpapersPage category="wallpapers" />}
          />
          <Route
            path="/stickers"
            element={<StickersPage category="stickers" />}
          />
          <Route path="/icons" element={<IconsPage category="icons" />} />
          <Route path="/download/:id" element={<AssetDownloadPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route
            path="/blog/best-wallpapers-2026"
            element={<BestWallpapers2026 />}
          />
          <Route
            path="/blog/how-to-use-instagram-highlight-icons"
            element={<InstagramHighlightIcons />}
          />
          <Route
            path="/blog/how-to-choose-wallpaper-for-iphone"
            element={<ChooseWallpaperIphone />}
          />
          <Route
            path="/blog/create-aesthetic-iphone-home-screen"
            element={<CreateAestheticIphoneHomeScreen />}
          />
          <Route path="/blog/cute-wallpapers" element={<CuteWallpapers />} />
          <Route
            path="/blog/minimal-instagram-icons"
            element={<MinimalInstagramIcons />}
          />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="all-media" element={<AllMedia />} />
            <Route path="userManagement" element={<UserManagement />} />
            <Route path="categories" element={<Categories />} />
            <Route path="tags" element={<Tags />} />
            <Route path="new-photo" element={<AddNewFile />} />
            <Route path="settings" element={<h2>Settings</h2>} />
          </Route>
        </Route>
      </Routes>
    </Auth0ProviderWithNavigate>
  );
}

export default App;
