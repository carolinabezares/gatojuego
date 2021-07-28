import React from 'react';

import io from 'socket.io-client';
class ListUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            id: 0,
            n1: "",
            n2: "",
            n3: "",
            n4: "",
            n5: "",
            n6: "",
            n7: "",
            n8: "",
            n9: "",
            bandera: 1,
            bandera2: false,
            arregloposicionesgato: [0,0,0,0,0,0,0,0,0],
            valuecheck: false,
            verificaruser: false,
            selecionchech: "",
            idUsernameAmigo: 0,
            idUserAnfitrion: 0,
            usernameAmigo: "",
            socket: null
        }
    }

    componentDidMount() {
        this.socketinit();
    }

    aceptar() {
        this.setState({
            verificaruser:true
        })
        const user = {
            username: window.localStorage.getItem('carousername'),
            id: this.state.idUserAnfitrion
        }
        this.state.socket.emit("invitacion-acceptada", user);
        let aux = document.getElementsByClassName("container-list");
        aux[0].style.display = "none"
        let checkwindow = document.getElementsByClassName("mensaje-invitacion");
        checkwindow[0].style.display = "none"
    }

    selecionchech(e){
        const name = e.target.name;
        let id = 0;
        this.setState({
            bandera2:true
        })
        if(name === "X"){
            alert(name)
            this.setState({
                selecionchech: name
            });
            if(!this.state.verificaruser){
              
                id = this.state.idUsernameAmigo;
                alert("no soy invitadoi" + id);
                
            }else{
             
                id = this.state.idUserAnfitrion;
                alert("si soy invitado"+ id)
            }
            const user ={
                id: id,
                selected: "X"
            }
            this.state.socket.emit("send-selectede",user)
          
        }else{
            alert(name)
            this.setState({
                selecionchech: name
            });
            if(!this.state.verificaruser){
                id = this.state.idUsernameAmigo;
            }else{
                id = this.state.idUserAnfitrion
            }
            const user ={
                id: id,
                selected: "Y"
            }
            this.state.socket.emit("send-selectede",user)
        }

        
    }
    enviarmsjgano(){
        this.resetear();
        alert("gano mi pana");
        let id =0;
        if(!this.state.verificaruser){
            id = this.state.idUsernameAmigo;
        }else{
            id = this.state.idUserAnfitrion;
        }
        let user = {
            id: id,
            username: window.localStorage.getItem('carousername')
        }
        this.state.socket.emit("msj-notif-ganador", user)
    }
    adivinarQuienGano(posicion){
        let arregloaux = this.state.arregloposicionesgato;
        arregloaux[posicion] = 1;
        this.setState({
            arregloposicionesgato:arregloaux
        })
       
        if(this.state.bandera >=3){
            if (this.state.arregloposicionesgato[0] === 1 && this.state.arregloposicionesgato[1] === 1 && this.state.arregloposicionesgato[2] === 1) {
               this.enviarmsjgano();
            }else if(this.state.arregloposicionesgato[3] === 1 && this.state.arregloposicionesgato[4] === 1 && this.state.arregloposicionesgato[5] === 1){
                this.enviarmsjgano();
            }else if(this.state.arregloposicionesgato[6] === 1 && this.state.arregloposicionesgato[7] === 1 && this.state.arregloposicionesgato[8] === 1){
                this.enviarmsjgano();
            }else if(this.state.arregloposicionesgato[0] === 1 && this.state.arregloposicionesgato[3] === 1 && this.state.arregloposicionesgato[6] === 1){
                this.enviarmsjgano();
            }else if(this.state.arregloposicionesgato[1] === 1 && this.state.arregloposicionesgato[4] === 1 && this.state.arregloposicionesgato[7] === 1){
                this.enviarmsjgano();
            }else if(this.state.arregloposicionesgato[2] === 1 && this.state.arregloposicionesgato[5] === 1 && this.state.arregloposicionesgato[8] === 1){
                this.enviarmsjgano();
            }else if(this.state.arregloposicionesgato[0] === 1 && this.state.arregloposicionesgato[4] === 1 && this.state.arregloposicionesgato[8] === 1){
                this.enviarmsjgano();
            }else if(this.state.arregloposicionesgato[2] === 1 && this.state.arregloposicionesgato[4] === 1 && this.state.arregloposicionesgato[6] === 1){
                this.enviarmsjgano();
            }
        }
    }

    enviarselectedButton(index,value){
    let id = 0;
      if(!this.state.verificaruser){
        id = this.state.idUsernameAmigo;
      }else{
        id = this.state.idUserAnfitrion;
      }
      let user = {
          id: id,
          index: index,
          value: value
      }
      this.state.socket.emit("send-select-button",user)
    }
    botonselecionusersocket(index,value){
        switch (index) {
            case "1":{
                this.setState({
                    n1: value
                });
            }break;
            case "2":{
                this.setState({
                    n2: value
                });
            }break;
            case "3":{
                this.setState({
                    n3: value
                });
            }break;
            case "4":{
                this.setState({
                    n4: value
                });
            }break;
            case "5":{
                this.setState({
                    n5: value
                });
            }break;
            case "6":{
                this.setState({
                    n6: value
                });
            }break;
            case "7":{
                this.setState({
                    n7: value
                });
            }break;
            case "8":{
                this.setState({
                    n8: value
                });
            }break;
            case "9":{
                this.setState({
                    n9: value
                });
            }break;
            default:
                break;
        }
    }
    botonSelecion(response) {
    if(this.state.bandera2){
        this.setState({
            bandera: this.state.bandera+1
         })
            switch (response) {
                case "1": {
                   if(this.state.selecionchech === "X"){
                        this.enviarselectedButton("1","X");
                       this.setState({
                        n1: "X",
                    });
                       
                   }else{
                    this.setState({
                        n1: "Y"
                    });
                    this.enviarselectedButton("1","Y");
                   }
                   this.adivinarQuienGano(0);
                }
                break;
                case "2": {
                    if(this.state.selecionchech === "X"){
                        this.setState({
                            n2: "X"
                        });
                        this.enviarselectedButton("2","X");
                   }else{
                    this.setState({
                        n2: "Y"
                    });
                    this.enviarselectedButton("2","Y");
                   }
                   this.adivinarQuienGano(1);
                } break;
                case "3": {
                    if(this.state.selecionchech === "X"){
                        this.setState({
                            n3: "X"
                        });
                        this.enviarselectedButton("3","X");
                   }else{
                    this.setState({
                        n3: "Y"
                    });
                    this.enviarselectedButton("3","Y");
                   }
                   this.adivinarQuienGano(2);
                } break;
                case "4": {
                    if(this.state.selecionchech === "X"){
                        this.setState({
                            n4: "X"
                        });
                        this.enviarselectedButton("4","X");
                   }else{
                    this.setState({
                        n4: "Y"
                    });
                    this.enviarselectedButton("4","Y");
                   }
                   this.adivinarQuienGano(3);
                } break;
                case "5": {
                    if(this.state.selecionchech === "X"){
                        this.setState({
                            n5: "X"
                        });
                        this.enviarselectedButton("5","X");
                   }else{
                    this.setState({
                        n5: "Y"
                    });
                    this.enviarselectedButton("5","Y");
                   }
                   this.adivinarQuienGano(4);
                } break;
                case "6": {
                    if(this.state.selecionchech === "X"){
                        this.setState({
                            n6: "X"
                        });
                        this.enviarselectedButton("6","X");
                   }else{
                    this.setState({
                        n6: "Y"
                    });
                    this.enviarselectedButton("6","Y");
                   }
                   this.adivinarQuienGano(5);
                } break;
                case "7": {
                    if(this.state.selecionchech === "X"){
                        this.setState({
                            n7: "X"
                        });
                        this.enviarselectedButton("7","X");
                   }else{
                    this.setState({
                        n7: "Y"
                    });
                    this.enviarselectedButton("7","Y");
                   }
                   this.adivinarQuienGano(6);
                } break;
                case "8": {
                    if(this.state.selecionchech === "X"){
                        this.setState({
                            n8: "X"
                        });
                        this.enviarselectedButton("8","X");
                   }else{
                    this.setState({
                        n8: "Y"
                    });
                    this.enviarselectedButton("8","Y");
                   }
                   this.adivinarQuienGano(7);
                } break;
                case "9": {
                    if(this.state.selecionchech === "X"){
                        this.setState({
                            n9: "X"
                        });
                        this.enviarselectedButton("9","X");
                   }else{
                    this.setState({
                        n9: "Y"
                    });
                    this.enviarselectedButton("9","Y");
                   }
                   this.adivinarQuienGano(8);
                } break;
                default:
                    break;
            }
    }
    }
    invitar(response) {
        alert("invitacion enviada");

        this.setState({
            idUsernameAmigo: response.id,
        })
        const user = {
            username: window.localStorage.getItem('carousername'),
            idAmigo: response.id,
            id: this.state.id
        }
        this.state.socket.emit("notificacion-user", user);
    }
    socketinit() {

        const socket = io('http://localhost:3000');
        socket.on("received-idsocket", data => {
            this.setState({
                id: data
            });
            const user = {
                id: data,
                username: window.localStorage.getItem('carousername')
            }
            socket.emit("send-info", user);
        });
        this.setState({
            socket: socket
        });
        socket.on("send-user-list", data => {
            this.setState({
                list: data
            })
        });
        socket.on("send-invitacion-user", data => {
            this.setState({
                usernameAmigo: data.username,
                idUserAnfitrion: data.id
            })
            let checkwindow = document.getElementsByClassName("mensaje-invitacion");
            checkwindow[0].style.display = "flex"
        });
        socket.on("invited-accep", data => {
            alert("invitacion aceptada" + data.username);
            this.setState({
                usernameAmigo: data.username
            })
            let aux = document.getElementsByClassName("container-list");
            aux[0].style.display = "none"
        });
        socket.on("goliad", data => {
            if(data.selected === "X"){
            let ocult = document.getElementsByClassName("X");
            ocult[0].style.display = "none";
            }else{
                let ocult = document.getElementsByClassName("Y");
            ocult[0].style.display = "none";
            }
            alert("llego")
        });
        socket.on("catch-select-button", data => {
                this.botonselecionusersocket(data.index,data.value);
        });
        socket.on("catch-ganador", data => {
            alert("El" +" Usuario "+ data.username + " Gano");
            this.resetear();
        })


    }

    resetear(){
       this.setState({
        n1: "",
        n2: "",
        n3: "",
        n4: "",
        n5: "",
        n6: "",
        n7: "",
        n8: "",
        n9: "",
        selecionchech: "",
        valuecheck: false,
       }) 
    }
    render() {
        return (
            <>
                <div className="container-padre-home">
                    <div className="info-users-conected">
                        <div className="container-username">
                            <div><p>{window.localStorage.getItem('carousername')}</p></div>
                            <div><p>{this.state.usernameAmigo}</p>  </div>
                            <div>
                                <input type="checkbox" name="X" id="" className="X" onChange={this.selecionchech.bind(this)}/>
                                <label htmlFor="x">selecione X</label>
                                <br />
                                <input type="checkbox" name="y" id="" className="Y" onChange={this.selecionchech.bind(this)}/>
                                <label htmlFor="x">selecione Y</label>
                            </div>
                        </div>
                    </div>
                    <div className="container-tablero">
                        <div className="contenedor-lines">
                            <div className="container-fila-one">
                                <button onClick={() => this.botonSelecion("1")}>{this.state.n1}</button>
                                <button onClick={() => this.botonSelecion("2")}>{this.state.n2}</button>
                                <button onClick={() => this.botonSelecion("3")}>{this.state.n3}</button>
                            </div>
                            <div className="container-fila-two">
                                <button onClick={() => this.botonSelecion("4")}>{this.state.n4}</button>
                                <button onClick={() => this.botonSelecion("5")}>{this.state.n5}</button>
                                <button onClick={() => this.botonSelecion("6")}>{this.state.n6}</button>
                            </div>
                            <div className="container-fila-three">
                                <button onClick={() => this.botonSelecion("7")}>{this.state.n7}</button>
                                <button onClick={() => this.botonSelecion("8")}>{this.state.n8}</button>
                                <button onClick={() => this.botonSelecion("9")}>{this.state.n9}</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-list">
                    <div className="mensaje-invitacion">
                        <p>{this.state.usernameAmigo}</p>
                        <button onClick={this.aceptar.bind(this)}>acceptar</button>
                    </div>
                    <h2>{window.localStorage.getItem('carousername')} - lista usuarios</h2>
                    <div className="container-list-sub">
                        <ul className="list">
                            {
                                this.state.list.map(item => {
                                    return (
                                        <li><div className="container-user"><h2>{item.username}</h2> <button onClick={() => this.invitar(item)}>Jugar</button></div></li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </>
        );
    }
}

export default ListUser;