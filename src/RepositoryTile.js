import React from "react";
import {Collapse,Button, CardBody, Card} from 'reactstrap';
import "./index.css";

class RepositoryTile extends React.Component{
  constructor(){
    super();
    this.state={
      IsOpen:false,
    }
    this.toggle=this.toggle.bind(this);
  }

  //On click it sends the id of clicked element to reRender Element in parent class;
  ClickHandler(){
    const fx=this.props.details.fun;
    fx(this.props.details.name);
  }
  //Since Only props were beign updated during reRendring of RepositoryTiles states of childs were not being update
  //Hence lifecycle method was called to update on every update of props
  static getDerivedStateFromProps(props,state) {
    if(props.details.IsOpened === state.IsOpen){
      return {IsOpen:false};
    }
    return {IsOpen:props.details.IsOpened}
  }

  //It finally return the tile to be displayed
  //Some of small style are added inline while othres were kept in index.css
  render(){
    return(
      <div className="container-lg">
        <button type="button" className="collapsible" onClick={this.toggle}>
          <img src={this.props.details.avatar} className="icon"/>
          <p style={{color:"grey"}}>{this.props.details.author}</p>
          <h3>{this.props.details.name}</h3>
        </button>

        <Collapse isOpen={this.state.IsOpen}>
          <div className="content">
            <p style={{color:"grey",paddingLeft:"100px"}}>{this.props.details.description}</p>
            <br></br>
            <ul style={{paddingLeft:"100px","list-style-type":"none"}}>
              <li style={{color:this.props.details.languageColor,float:"left",width:"33%"}}>{this.props.details.language}</li>
              <li style={{float:"left",width:"33%"}}>
              <img style={{width:"20px",height:"20px"}}src="https://image.flaticon.com/icons/svg/148/148841.svg"/>{this.props.details.stars}</li>
              <li style={{float:"right",width:"33%"}}><img  style={{width:"20px",height:"20px"}} src="https://maxcdn.icons8.com/Android_L/PNG/48/Programming/git_fork-48.png"/>{this.props.details.forks}</li>
            </ul>
          </div>
        </Collapse>
      </div>
    );
  }
}
export default RepositoryTile;
