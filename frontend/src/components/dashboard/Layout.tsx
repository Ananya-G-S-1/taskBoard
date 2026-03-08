import Header from "./Header"
import Sidebar from "./Sidebar"

export default function Layout({ children }: any) {

  return (
    <div className="dashboard">

      <Sidebar />

      <div className="main">

        <Header />

        <div className="content">
          {children}
        </div>

      </div>

    </div>
  )
}