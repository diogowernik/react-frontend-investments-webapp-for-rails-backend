import React, { Component } from 'react'
import Routes from './config/Routes'
// import SignUp from './login/SignUp';
// import SignIn from './login/SignIn';


class App extends Component {

  // state = {
  //   user: {}, 
  //   error: "",
  // }

  // componentDidMount(){
  //   let token = localStorage.getItem('token')
  //   if(token){
  //     fetch('http://localhost:3000/api/profile', {
  //       method: "GET",
  //       headers: {
  //         "Authorization": `Bearer ${token}`
  //       }
  //     })
  //     .then(response => response.json())
  //     .then(result => {
  //       if(result.id){
  //         this.setState({
  //           user: result
  //         })
  //       }
  //     })
  //   }
  // }

  // signUp = user => {
  //   fetch('http://localhost:3000/api/users', {
  //     method: "POST",
  //     headers: {
  //         "Accept": "application/json",
  //         "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       user:{
  //         username: user.username,
  //         password: user.password,
  //         first_name: user.firstName,
  //         last_name: user.lastName
  //       }
  //     })
  //   })
  //   .then(response => response.json())
  //   .then(user => this.setState({ user: user }) )
  // }

  // signIn = (user) => {
  //   fetch("http://localhost:3000/api/login", {
  //       method: "POST",
  //       headers: {
  //           "Accept": "application/json",
  //           "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //           user: {
  //               username: user.username,
  //               password: user.password
  //           }
  //       })
  //   })
  //   .then(response => response.json())
  //   .then(result => {
  //       if (result.token){
  //       localStorage.setItem('token', result.token)
  //       this.setState({
  //           user: result.user
  //           })
  //       }
  //       else {
  //           this.setState({
  //               error: result.error
  //           })
  //       }
  //   })
  // }

  // render() {
  //   return (
  //     <div className="App">
  //       {this.state.user.username ? 
  //       <>
  //       <h2>Welcome {this.state.user.first_name}</h2>       
  //       <Routes />
  //       </>
        
  //       : (
  //         <>
  //         <SignIn signIn={this.signIn} error={this.state.error} />
  //         <SignUp signUp={this.signUp} />
  //         </>)
  //       }
  //     </div>
  //   );
  // } 

  
  





  render() {
    return (
      <>
      <Routes />
      </>
    )
  }
}

export default App
