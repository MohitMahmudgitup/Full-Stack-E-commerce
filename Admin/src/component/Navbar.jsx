import { Link, NavLink ,useNavigate } from 'react-router-dom'

function Navbar({ setToken }) {
  const navigate = useNavigate()


  const handleLogout = () => {
    // Clear the token from state and localStorage
    setToken("")
    localStorage.removeItem('token')
    // Redirect to the login page
    navigate('/login')
  }

  return (
    <nav className='flex justify-between items-center py-4 sticky top-0 bg-white z-50 border-b '>
        <p className="text-2xl">LOGO</p>
      <Link
        onClick={handleLogout}
        className='px-5 py-2 bg-gray-950 hover:bg-gray-900 text-white rounded-md font-medium'
        // disabled={false} // Ensure logout is always enabled
      >
        Logout
      </Link>
    </nav>
  )
}

export default Navbar
