import React, {Component} from 'react';
import Navigation from './Components/Navigation/Navigation'
import SignIn from './Components/SignIn/SignIn'
import Register from './Components/Register/Register'
import './App.css';
import Logo from './Components/Logo/Logo'
import ImageLinkForm from './Components/ImageLink/ImageLinkForm'
import Rank from './Components/Rank/Rank'
import Particles from 'react-particles-js';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition'










const particlesOptions = {
  particles: {
    number:{
      value:30 ,
      density:{
        enable:true,
        value_area: 300
      }
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    password: "",
    entries: "0",
    joined: ''

  }

}



class App extends Component {

  constructor(){
    super();
    this.state = initialState;
    
  }



  calculateFaceLocation = (data) =>{
    const clariface = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage') ;
    const width = Number(image.width);
    const height = Number(image.height);
    return {
        leftCol : clariface.left_col * width,
        topRow: clariface.top_row * height,
        rightCol: width - (clariface.right_col * width),
        bottomRow: height - (clariface.bottom_row * height)
    }

  }

  displayBox = (box) =>{
    console.log(box)
    this.setState({box: box})

  }



  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }



    onButtonSubmit = () =>{
      
      this.setState({imageUrl: this.state.input})
      fetch('   https://intense-reef-19227.herokuapp.com/imageurl', {
        method: 'post',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({

          input: this.state.input


        })
      })
      .then(response => response.json())

      .then(response => {
        if(response){
          fetch('   https://intense-reef-19227.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({

              id: this.state.user.id

          
          })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries:count}))
            })
            .catch(console.log)
          
        }
        this.displayBox(this.calculateFaceLocation(response))
    })
        .catch(err => console.log(err))
   

    }

    onRouteChange = (route) =>{
      if(route === 'signout'){
        this.setState({isSignedIn: false})
      }else if(route === 'home') {
        this.setState({ isSignedIn: true})      
      }
      this.setState({route: route})
    }


    loadUser = (data) =>{
      this.setState({user:{
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        entries: data.entries,
        joined: data.joined 
      }})
    }



  render(){
   
   const {isSignedIn,imageUrl, route, box} = this.state;

  return (
    <div className="App">
      
      
      <Particles className= 'particles'
        params={particlesOptions } />
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
      { route === 'home' 
      ?  <div className="">
      <Logo/>
      <Rank name={this.state.user.name} entries={this.state.user.entries} />
       <ImageLinkForm 
       onInputChange={this.onInputChange} 
       onButtonSubmit={this.onButtonSubmit}
       />
        <FaceRecognition box={box} imageUrl={imageUrl}/>
        </div>
        
        :(
          this.state.route === 'signin'
            ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          :<Register loadUser = {this.loadUser} onRouteChange={this.onRouteChange} />
          
        )
      }

    </div>
  );
}
}
 

export default App;
