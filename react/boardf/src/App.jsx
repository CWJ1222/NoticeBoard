// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
// <!-- App.js -->
import { useState } from 'react';
import './App.css';
import './util.css';
import './main.css';

const App = () => {
  const [users, setUsers] = useState({});
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = () => {
    if (username && password) {
      if (users[username]) {
        setMessage('Username already exists. Please choose another.');
      } else {
        setUsers({ ...users, [username]: password });
        setMessage(`User ${username} registered successfully!`);
        setUsername('');
        setPassword('');
      }
    } else {
      setMessage('Please enter both username and password.');
    }
  };

  const handleLogin = () => {
    if (users[username] && users[username] === password) {
      setMessage(`Welcome, ${username}!`);
    } else {
      setMessage('Invalid username or password.');
    }
  };

return (
  <div className="limiter">
  <div className="container-login100">
    <div className="wrap-login100">
      <form className="login100-form validate-form p-l-55 p-r-55 p-t-178">
        <span className="login100-form-title">Sign In</span>

        <div className="wrap-input100 validate-input m-b-16" data-validate="Please enter username">
          <input
            className="input100"
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <span className="focus-input100"></span>
        </div>

        <div className="wrap-input100 validate-input m-b-16" data-validate="Please enter password">
          <input
            className="input100"
            type="password"
            id="password"
            name="pass"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="focus-input100"></span>
        </div>

        <div className="container-register100-form-btn m-b-16" onClick={handleRegister}>
          <button className="Register100-form-btn" type="button">
            회원가입
          </button>
        </div>

        <div className="container-login100-form-btn" onClick={handleLogin}>
          <button className="login100-form-btn" type="button">
            로그인
          </button>
        </div>

        <div id="message">{message}</div>
        <hr />
        <div id="nameList">
          <h3>Registered Users:</h3>
          {Object.keys(users).map((user) => (
            <p key={user}>{user}</p>
          ))}
        </div>

        <div className="flex-col-c p-t-170 p-b-40">
          <span className="txt1 p-b-9">Don’t have an account?</span>
          <a href="#" className="txt3">Sign up now</a>
        </div>
      </form>
    </div>
    </div>
    </div>
);
};
export default App;