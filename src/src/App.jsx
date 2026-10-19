import { useApp } from './context/AppContext.jsx'
import Navbar from './components/Navbar.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Home from './pages/Home.jsx'
import Wardrobe from './pages/Wardrobe.jsx'
import Destination from './pages/Destination.jsx'
import Confirm from './pages/Confirm.jsx'
import Missions from './pages/Missions.jsx'
import Result from './pages/Result.jsx'
import Profile from './pages/Profile.jsx'
import Leaderboard from './pages/Leaderboard.jsx'

const SCREENS = {
  login: Login, register: Register,
  home: Home, wardrobe: Wardrobe, destination: Destination, confirm: Confirm,
  missions: Missions, result: Result,
  profile: Profile, leaderboard: Leaderboard,
}
// 這些畫面不顯示底部導覽列
const NO_NAV = ['login', 'register', 'result']

export default function App() {
  const { screen } = useApp()
  const Screen = SCREENS[screen]
  return (
    <div className="min-h-full flex justify-center">
      <div className="w-full max-w-md min-h-screen bg-paper flex flex-col sm:border-x-[3px] border-ink">
        <main key={screen} className="flex-1 flex flex-col">
          <Screen />
        </main>
        {!NO_NAV.includes(screen) && <Navbar />}
      </div>
    </div>
  )
}
