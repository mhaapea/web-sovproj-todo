import { Link, useNavigate } from "react-router-dom"
import { useUser } from "../context/useUser.js"

export const AuthenticationMode = Object.freeze({
    SignIn: 'Login',
    SignUp: 'SignUp'
})

export default function Authentication ({ authenticationMode }) {
    const { user, setUser, signUp, signIn } = useUser()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        const signFunction = authenticationMode === AuthenticationMode.signUp ?
        signUp : signIn

        signFunction().then(response => {
            navigate(authenticationMode === AuthenticationMode.signUp ? '/signin' : '/')
        })
        .catch(error => {
            alert(error)
        })
    }

    return (
        <div>
            <h3>{authenticationMode === AuthenticationMode.SignIn ? 'Sign In' : 'Sign Up'}</h3>
             <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input
                placeholder="email"
                value={user.email}
                onChange={e => setUser({...user,email: e.target.value})}/>
                <label>Password:</label>
                <input
                placeholder="password"
                type ='password' value = {user.password}
                onChange={e => setUser({...user,password: e.target.value})}/>
                <button type="submit">{authenticationMode === AuthenticationMode.SignIn ?
                'Login' : 'Submit'}</button>
                <Link to={authenticationMode === AuthenticationMode.SignIn ? '/signup' :
            'signin'} onClick={() => setUser({email: '', password: ''})}>
                {authenticationMode === AuthenticationMode.SignIn ?
                'No account? Sign up' : 'Already signed up? Sign in'}
                </Link>
             </form>
        </div>
    )
}