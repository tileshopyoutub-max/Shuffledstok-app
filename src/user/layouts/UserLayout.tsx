import { Header } from "../components/homePage/HeaderHome";
import { FooterHomePage } from "../components/homePage/FooterHome";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/sidebar/Sidebar";
import { useTypedSelector } from "../../shared/hooks/redux";

// export default function UserLayout() {
//   return (
//     <div className="min-h-screen bg-black text-white">
//       <Header />

//       <main className="min-h-[calc(100vh-64px)]">
//         <Outlet />
//       </main>

//       <FooterHomePage />

//       <Sidebar />
//     </div>
//   );
// }

export default function UserLayout() {
  const { isOpen } = useTypedSelector((state) => state.sidebar);
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <div className="md:flex min-h-[calc(100vh-64px)]">
        <Sidebar />
        <div className="md:flex-1">
          <main
            className={`
            min-h-[calc(100vh-64px)]
            transition-[margin] duration-300 ease-in-out
            ${isOpen ? "md:ml-[430px]" : "md:ml-0"}
          `}
          >
            <Outlet />
          </main>
          <FooterHomePage />
        </div>
      </div>
    </div>
  );
}
