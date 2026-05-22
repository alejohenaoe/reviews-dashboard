import { Routes, Route } from 'react-router-dom'
import Shell from './components/layout/Shell.jsx'
import PortfolioOverview from './pages/PortfolioOverview.jsx'
import Properties from './pages/Properties.jsx'
import PropertyDetail from './pages/PropertyDetail.jsx'
import UnansweredQueue from './pages/UnansweredQueue.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Shell />}>
        <Route index element={<PortfolioOverview />} />
        <Route path="properties" element={<Properties />} />
        <Route path="property/:id" element={<PropertyDetail />} />
        <Route path="queue" element={<UnansweredQueue />} />
      </Route>
    </Routes>
  )
}
