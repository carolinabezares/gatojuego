import React from 'react';
import { withRouter } from "react-router-dom";

class Login extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            username: ""
        }
    }

    changeinput(e){
        let value = e.target.value;
        console.log(value);
        this.setState({
            username: value
        });
    }

    iniciarjuego(){
       if(this.state.username.length> 0){
        window.localStorage.setItem('carousername',this.state.username);
        this.props.history.push("/listUser");
       }else{
           console.log("error");
       }
    }
    
    render() {
        return (
             <>
             <div className="container-login">
                <div className="container-login-sub">
                    <h2>Juego del Gato</h2>
                <input type="text" placeholder="ingrese su nombre" onChange={this.changeinput.bind(this)}/>
                 <button onClick={this.iniciarjuego.bind(this)}>Iniciar</button>
                </div>
             </div>
             </>
        );
    }
}
export default withRouter(Login);;