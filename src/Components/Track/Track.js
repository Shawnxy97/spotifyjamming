import React from "react";
import './Track.css';

export class Track extends React.Component {

    renderAction(){
        let isRemoval = false;
        if(isRemoval){
            return "-";
        }else{
            return "+";
        }
    }
    render(){
        return (
            <div className="Track">
                <div className="Info">
                    <h3 className="trackName">Tiny Dancer</h3>
                    <p className="artists">Elton John | Madman</p>
                </div>
                <button className="Track-action">{this.renderAction()}</button>
            </div>
        );
    }
}