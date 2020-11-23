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
    this.reRender=this.reRender.bind(this);
  }

  //Below code will re render all the tiles as closed when some element in children is clicked
  //This function is passed to every child in it's props.
  reRender(id){
    console.log("Clicked with id: ",id);
    //This basically changes the OpenedId i.e. the id that must remain open among all the tiles
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
    fetch("https://private-anon-21de9d8636-githubtrendingapi.apiary-mock.com/repositories").then(response=>{
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

    //This will be rendered if error is encounterd while fetching data.
    if(!this.state.DataLoadingSuccessfull){
      return  (<h1>Failed to fetch data try Again</h1>)
    }
    //This code will be rendered while the fetching is in going on.
    if(this.state.IsLoading){
      return (<h1>Loading...</h1>);
    }
    //If data is fetching is successfull below code will be rendered
    //RepositoryTiles is calculated everytime rendring is done with a new OpenedId
    //It is then passed to render.
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
