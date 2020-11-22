import React from "react";
import RepositoryTile from "./RepositoryTile.js";
import OfflineData from "./OfflineData";
import "../node_modules/bootstrap/dist/css/bootstrap.css";

class App extends React.Component{
  constructor(){
    super();
    this.state={
      DataFromApi:OfflineData,
      IsLoading:false,
      DataLoadingSuccessfull:true,
      OpenedId:""
    };
    //RepositoryTiles is an array of tiles that will be displayed on the screen.

    this.reRender=this.reRender.bind(this);
  }
  reRender(id){
    console.log("Clicked with id: ",id);
    this.setState((prevState)=>{
      return{
        DataFromApi:prevState.DataFromApi,
        IsLoading:prevState.IsLoading,
        DataLoadingSuccessfull:prevState.DataLoadingSuccessfull,
        OpenedId:id
      };
    });
  }
  componentDidMount(){
    //Sending request to API
    /*fetch("/OfflineData.js").then(response=>{
      if(!response.ok){
        this.setState(prevState=>{return{DataFromApi:prevState.DataFromApi,IsLoading:prevState.IsLoading,DataLoadingSuccessfull:false,OpenedId:prevState.OpenedId}});
      }
      else
        return response.json()
    })//Closing of promise we checked if response was okay are if had some error
    .then(data=>{
      this.setState(prevState=>{
        //As soon as the data is loaded it is stored in state.DataFromApi
        //console.log(data);
        return {DataFromApi:data,IsLoading:false,DataLoadingSuccessfull:true};
      });//Closing of setState function
    })//closing of promise
    .catch(error =>{
      this.setState(prevState=>{return{DataFromApi:prevState.DataFromApi,IsLoading:prevState.IsLoading,DataLoadingSuccessfull:false,OpenedId:prevState.OpenedId}});
    });//Closing of catch statement*/
  }


  render(){
    //This code will be rendered while the fetching is in going on.
    if(this.state.IsLoading){
      return (<h1>Loading...</h1>);
    }
    //If data is fetching is successfull below code will be rendered
    var RepositoryTiles=this.state.DataFromApi.map(item=>{
      item.fun=this.reRender;
      item.IsOpened=(item.name === this.state.OpenedId)?true:false;
      return <RepositoryTile details={item}/>});

    return (
      <div className="container">
        {RepositoryTiles}
      </div>
    );
  }
}
export default App;
