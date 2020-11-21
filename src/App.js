import React from "react";
import RepositoryTile from "./RepositoryTile.js";
import OfflineData from "./OfflineData";

class App extends React.Component{
  constructor(){
    super();
    this.state={
      DataFromApi:OfflineData,
      IsLoading:true
    };
    this.RepositoryTiles=this.state.DataFromApi.map(item=><RepositoryTile details={item}/>);
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
    return (
      <div>
        {this.RepositoryTiles}
      </div>
    );
  }
}
export default App;
