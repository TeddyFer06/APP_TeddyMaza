import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url = 'https://localhost:8080/golden';

class App extends Component {
   state = {
      data: [],
      modalInsertar: false,
      modalEliminar: false,
      form: {
         id: '',
         email: '',
         password: '',
         cel: '',
         country: '',
         tag: '',
         fecha: '',
         active: '',
      },
   };

   peticionGet = () => {
      axios
         .get(url)
         .then((response) => {
            this.setState({ data: response.data });
         })
         .catch((error) => {
            console.log(error.message);
         });
   };

   peticionPost = async () => {
      delete this.state.form.id;
      await axios
         .post(url, this.state.form)
         .then((response) => {
            this.modalInsertar();
            this.peticionGet();
         })
         .catch((error) => {
            console.log(error.message);
         });
   };

   peticionPut = () => {
      axios.put(url + this.state.form.id, this.state.form).then((response) => {
         this.modalInsertar();
         this.peticionGet();
      });
   };

   peticionDelete = () => {
      axios.delete(url + this.state.form.id).then((response) => {
         this.setState({ modalEliminar: false });
         this.peticionGet();
      });
   };

   modalInsertar = () => {
      this.setState({ modalInsertar: !this.state.modalInsertar });
   };

   seleccionarRegistro = (registro) => {
      this.setState({
         tipoModal: 'actualizar',
         form: {
            id: registro.id,
            email: registro.email,
            password: registro.password,
            cel: registro.cel,
            country: registro.country,
            tag: registro.tag,
            fecha: registro.fecha,
            avtive: registro.active,
         },
      });
   };

   handleChange = async (e) => {
      e.persist();
      await this.setState({
         form: {
            ...this.state.form,
            [e.target.name]: e.target.value,
         },
      });
      console.log(this.state.form);
   };

   componentDidMount() {
      this.peticionGet();
   }

   render() {
      const { form } = this.state;
      return (
         <div className='App'>
            <br />
            <br />
            <br />
            <button
               className='btn btn-info'
               onClick={() => {
                  this.setState({ form: null, tipoModal: 'insertar' });
                  this.modalInsertar();
               }}
            >
               Agregar Nuevo Registro
            </button>
            <br />
            <br />
            <table className='table '>
               <thead>
                  <tr>
                     <th>Email</th>
                     <th>Password</th>
                     <th>Celular</th>
                     <th>Country</th>
                     <th>Tag</th>
                     <th>Fecha</th>
                     <th>Active</th>
                  </tr>
               </thead>
               <tbody>
                  {this.state.data.map((registro) => {
                     return (
                        <tr>
                           <td>{registro.id}</td>
                           <td>{registro.email}</td>
                           <td>{registro.password}</td>
                           <td>{registro.cel}</td>
                           <td>{registro.country}</td>
                           <td>{registro.tag}</td>
                           <td>{registro.fecha}</td>
                           <td>{registro.active}</td>
                           <td>
                              <button
                                 className='btn btn-primary'
                                 onClick={() => {
                                    this.seleccionarEmpresa(registro);
                                    this.modalInsertar();
                                 }}
                              >
                                 <FontAwesomeIcon icon={faEdit} />
                              </button>
                              {'   '}
                              <button
                                 className='btn btn-danger'
                                 onClick={() => {
                                    this.seleccionarEmpresa(registro);
                                    this.setState({ modalEliminar: true });
                                 }}
                              >
                                 <FontAwesomeIcon icon={faTrashAlt} />
                              </button>
                           </td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>

            <Modal isOpen={this.state.modalInsertar}>
               <ModalHeader style={{ display: 'block' }}>
                  <span
                     style={{ float: 'right' }}
                     onClick={() => this.modalInsertar()}
                  >
                     x
                  </span>
               </ModalHeader>
               <ModalBody>
                  <div className='form-group'>
                     <label htmlFor='email'>Email</label>
                     <input
                        className='form-control'
                        type='email'
                        name='email'
                        id='email'
                        onChange={this.handleChange}
                        value={form ? form.email : ''}
                     />
                     <br />
                     <label htmlFor='password'>Password</label>
                     <input
                        className='form-control'
                        type='password'
                        name='password'
                        id='password'
                        onChange={this.handleChange}
                        value={form ? form.password : ''}
                     />
                     <br />
                     <label htmlFor='country'>Country</label>
                     <input
                        className='form-control'
                        type='text'
                        name='country'
                        id='country'
                        onChange={this.handleChange}
                        value={form ? form.country : ''}
                     />
                     <label htmlFor='country'>Country</label>
                     <input
                        className='form-control'
                        type='text'
                        name='country'
                        id='country'
                        onChange={this.handleChange}
                        value={form ? form.country : ''}
                     />
                     <br />
                     <label htmlFor='country'>Tag</label>
                     <input
                        className='form-control'
                        type='text'
                        name='tag'
                        id='tag'
                        onChange={this.handleChange}
                        value={form ? form.tag : ''}
                     />
                     <br />
                     <label htmlFor='fecha'>Tag</label>
                     <input
                        className='form-control'
                        type='date'
                        name='fecha'
                        id='fecha'
                        onChange={this.handleChange}
                        value={form ? form.fecha : ''}
                     />
                     <br />
                     <label htmlFor='active'>Active</label>
                     <input
                        className='form-control'
                        type='checkbox'
                        name='active'
                        id='avtive'
                        onChange={this.handleChange}
                        value={form ? form.active : ''}
                     />
                  </div>
               </ModalBody>

               <ModalFooter>
                  {this.state.tipoModal == 'insertar' ? (
                     <button
                        className='btn btn-success'
                        onClick={() => this.peticionPost()}
                     >
                        Insertar
                     </button>
                  ) : (
                     <button
                        className='btn btn-primary'
                        onClick={() => this.peticionPut()}
                     >
                        Actualizar
                     </button>
                  )}
                  <button
                     className='btn btn-danger'
                     onClick={() => this.modalInsertar()}
                  >
                     Cancelar
                  </button>
               </ModalFooter>
            </Modal>

            <Modal isOpen={this.state.modalEliminar}>
               <ModalBody>
                  Estás seguro que deseas eliminar el registro{' '}
                  {form && form.email}
               </ModalBody>
               <ModalFooter>
                  <button
                     className='btn btn-danger'
                     onClick={() => this.peticionDelete()}
                  >
                     Sí
                  </button>
                  <button
                     className='btn btn-secundary'
                     onClick={() => this.setState({ modalEliminar: false })}
                  >
                     No
                  </button>
               </ModalFooter>
            </Modal>
         </div>
      );
   }
}
export default App;
