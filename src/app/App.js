import React, { Component } from 'react';



class App extends Component {

    constructor(){
        super();
        this.state = {
            clave: '',
            nombre: '',
            puesto: '',
            sueldo: '',
            tasks: [],
            puestos: [],
            _id: '',
            boton: ''
        };
        this.add = this.add.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    add(e){
        if(this.state._id){
            
            const consulta = fetch('/api/task/'+this.state._id, {
                
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    
                }
            })
            .then(res => {
                M.toast({html: 'ACTUALIZADO'});
                this.setState({clave: '',nombre: '', puesto: '',sueldo: '',_id: '', boton: 'GUARDAR'});
                this.get();
            });
        }else{
            fetch('/api/task', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    M.toast({html: 'GUARDADO'});
                    this.setState({clave: '',nombre: '', puesto: '',sueldo: ''});
                    this.get();
                })
                .catch(err => console.error(err));
        }
        
        console.log(this.state);
        e.preventDefault();
    }

    componentDidMount(){
        this.setState({boton: 'GUARDAR'}); 
        this.get();
    }

    get(){
        fetch('/api/task')
            .then(res => res.json())
            .then(data => {
                this.setState({tasks: data});                
            });

            fetch('/api/task2')
            .then(res => res.json())
            .then(data => {
                this.setState({puestos: data});                
            });
    }

    edit(id){
        fetch('/api/task/'+id)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            //M.toast({html: 'GUARDADO'});
            this.setState({
                clave: data.clave,
                nombre: data.nombre,
                puesto: data.puesto,
                sueldo: data.sueldo,
                _id: data._id,
                boton: 'ACTUALIZAR'
            })
            //this.get();
        });
    }

    delete(id){
        fetch('/api/task/' + id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data =>{
            M.toast({html: 'ELIMINADO'});
            this.get();
        });
    }

    handleChange(e){
        const { name, value} = e.target;
        this.setState({
            [name]: value
        });
    }

    render(){
        return(
            <div>
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">Registro y modificacion de empleados</a>
                    </div>
                </nav>

            <div className="container">
                <div className = "row">
                    <div className="col s5">
                        <div className="card">
                            <div className="card-content">
                                <form onSubmit={this.add}>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <input name="clave" onChange={this.handleChange} type="text" placeholder="Clave"
                                            value={this.state.clave}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <textarea name="nombre" onChange={this.handleChange} placeholder="Nombre"
                                            className="materialize-textarea" value={this.state.nombre}></textarea>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <textarea name="puesto" onChange={this.handleChange} placeholder="Puesto:  Empleado, Gerente, Director"
                                            className="materialize-textarea" value={this.state.puesto}></textarea>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <textarea name="sueldo" onChange={this.handleChange} placeholder="Sueldo"
                                            className="materialize-textarea" value={this.state.sueldo}></textarea>
                                        </div>
                                    </div>
                                    
                                    <button type="submit" className="btn light-blue darken-4" value={this.state.boton}>
                                        {this.state.boton}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col s7">
                        <table>
                            <thead>
                                <tr>
                                    <th>Clave</th>
                                    <th>Nombre</th>
                                    <th>Puesto</th>
                                    <th>Sueldo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.tasks.map(task => {
                                        return (
                                            <tr key={task._id}>
                                                <td>{task.clave}</td>
                                                <td>{task.nombre}</td>
                                                <td>{task.puesto}</td>
                                                <td>{task.sueldo}</td>
                                                <td>
                                                    <button className="btn light-blue
                                                    darken-4" onClick={() => this.delete(task._id)}>
                                                        <i className="material-icons">delete</i>
                                                    </button>
                                                    <button onClick={() => this.edit(task._id)
                                                    } className="btn light-blue
                                                    darken-4" style={{margin: "4px"}}>
                                                        <i className="material-icons">edit</i>
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>

                    </div>

                    <div className="col s2">
                        <table>
                            <thead>
                                <tr>
                                    <th>Puesto</th>
                                    <th>Sueldo</th>                                    
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.puestos.map(puesto => {
                                        return (
                                            <tr key={puesto._id}>
                                                <td>{puesto.puesto}</td>
                                                <td>{puesto.sueldo}</td>
                                                
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>

                    </div>

                    

                </div>
            </div>
            </div>
        )
    }
}

export default App;