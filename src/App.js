import React from "react";

class App extends React.Component{
  constructor(){
    super();
    this.state={
      DataFromApi:{},
      IsLoading:true
    };
  }
  componentDidMount(){
    fetch("https://api.wheretheiss.at/v1/satellites/25544").then(response=>response.json())
    .then(data=>{
      this.setState(prevState=>{
        return {DataFromApi:data,IsLoading:false};
      });//Closing of setState function
    });//closing of promise
  }
  render(){
    if(this.state.IsLoading){
      return (<h1>Loading...</h1>);
    }
    //If data is fetching is successfull below code will be rendered
    return (<h1>Hi</h1>);
  }
}
export default App;
