import React from 'react';


class Home extends React.Component {
    render() {
        return (
            <>
                <div className="container-padre-home">
                    <div className="info-users-conected">
                      <div className="container-username">
                          <div><p>caro</p>  <p>puntos: 0</p></div>
                          <div><p>kevin</p>  <p>puntos: 0</p></div>
                      </div>
                    </div>
                    <div className="container-tablero">
                           <div className="contenedor-lines">
                               <div className="container-fila-one">
                                   <button>X</button>
                                   <button>X</button>
                                   <button>X</button>
                               </div>
                               <div className="container-fila-two">
                                    <button>X</button>
                                   <button>X</button>
                                   <button>X</button>
                               </div>
                           </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Home;