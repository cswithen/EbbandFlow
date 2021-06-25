import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import {logout} from '../store'

const Navbar = () => (
  <div>
    <h1>HomePage</h1>
    <nav>
        <div>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>

    </nav>
    <hr />
  </div>
)

// const mapState = state => {
//   return {
//     isLoggedIn: !!state.auth.id
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     handleClick() {
//       dispatch(logout())
//     }
//   }
// }

export default  (Navbar)
