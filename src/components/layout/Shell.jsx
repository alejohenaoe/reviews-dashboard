import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import TopBar from './TopBar.jsx'

export default function Shell() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <div className="flex flex-1 flex-col min-w-0">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
