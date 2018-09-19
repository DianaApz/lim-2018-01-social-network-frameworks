import React, { Component } from 'react';
import firebase from 'firebase';

class Upload extends Component {
    constructor(){
        super();
        this.state = {
            upValue: 0,
            picture: null
        }
     this.uploadFile = this.uploadFile.bind(this);
    }

    uploadFile(event){
        const file =event.target.files[0];
        const storageRef = firebase.storage().ref(`/photos/${file.name}`);
        const task = storageRef.put(file)

        task.on('state_changed', snapshot =>{
            let porcentage =(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        this.setState({
            upValue: porcentage
        })

        }, error=>{
            console.log(error.message)
        }, () =>{
            this.setState({
                upValue:100,
                picture: task.snapshot.downloadURL
            });
        });
    }

    render (){
        return(
            <div>
                <input type="file" onChange={this.uploadFile}/>
                <br/>
                <img width="520" src={this.state.picture}/>
                <progress value={this.state.upValue} max="100">
                {this.state.upValue} %
                </progress>
            </div>
        )
    }
}

export default Upload;