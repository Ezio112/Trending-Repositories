import React from "react";
import RepositoryTile from "./RepositoryTile.js";
import OfflineData from "./OfflineData";
import "../node_modules/bootstrap/dist/css/bootstrap.css";

class App extends React.Component{
  constructor(){
    super();
    this.state={
      DataFromApi:OfflineData,
      IsLoading:true,
      DataLoadingSuccessfull:true
    };
    //RepositoryTiles is an array of tiles that will be displayed on the screen.
    this.RepositoryTiles=this.state.DataFromApi.map(item=><RepositoryTile details={item}/>);
  }

  componentDidMount(){
    //Sending request to API
    fetch("https://api.wheretheiss.at/v1/satellites/25544").then(response=>{
      if(!response.ok){
        this.setState(prevState=>{return{DataFromApi:prevState.DataFromApi,IsLoading:prevState.IsLoading,DataLoadingSuccessfull:false}});
      }
      else
        return response.json()
    })//Closing of promise we checked if response was okay are if had some error
    .then(data=>{
      this.setState(prevState=>{
        //As soon as the data is loaded it is stored in state.DataFromApi
        return {DataFromApi:data,IsLoading:false,DataLoadingSuccessfull:true};
      });//Closing of setState function
    })//closing of promise
    .catch(error =>{
      this.setState(prevState=>{return{DataFromApi:prevState.DataFromApi,IsLoading:prevState.IsLoading,DataLoadingSuccessfull:false}});
    });//Closing of catch statement
  }


  render(){
    //This code will be rendered while the fetching is in going on.
    if(this.state.IsLoading){
      return (<h1>Loading...</h1>);
    }
    //If data is fetching is successfull below code will be rendered
    return (
      <div className="container">
        {this.RepositoryTiles}
      </div>
    );
  }
}
export default App;
