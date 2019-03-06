import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

class EditClients extends Component {
  constructor(props){
      super(props);

      this.firstNameIpt = React.createRef();
      this.lastNameIpt = React.createRef();
      this.emailIpt = React.createRef();
      this.phoneIpt = React.createRef();
      this.balanceIpt = React.createRef();
  }  

  onSubmit = (e) => {
    e.preventDefault();
    const { client, firestore, history } = this.props;

    //updated Client
    const updatedClient = {
        firstName: this.firstNameIpt.current.value,
        lastName: this.lastNameIpt.current.value,
        email: this.emailIpt.current.value,
        phone: this.phoneIpt.current.value,
        balance: this.balanceIpt.current.value === '' ? 0 : this.balanceIpt.current.value
    }

    //updated client in firestore
    firestore.update({collection: 'clients', doc: client.id}, updatedClient)
      .then(history.push('/'));
  };
  render() {
    const {client} = this.props;

    if(client) {
        return (
            <div>
            <div className="row">
               <div className="col-md-6">
                 <Link to="/" className="btn btn-link">
                   <i className="fas fa-arrow-circle-left" /> Back to Dashboard
                 </Link>
               </div>
            </div>
    
            <div className="card">
              <div className="card-header">Add Client</div>
              <div className="card-body">

                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <input 
                        type="text"
                        className="form-control"
                        name="firstName"
                        minLength="2"
                        required 
                        ref={this.firstNameIpt}                 
                        defaultValue={client.firstName}
                      />
                    </div>
    
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <input 
                        type="text"
                        className="form-control"
                        name="lastName"
                        minLength="2"
                        required
                        ref={this.lastNameIpt}                 
                        defaultValue={client.lastName}
                      />
                    </div>
    
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input 
                        type="email"
                        className="form-control"
                        name="email"
                        ref={this.emailIpt}
                        defaultValue={client.email}
                      />
                    </div>
    
                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input 
                        type="text"
                        className="form-control"
                        name="phone"
                        minLength="10"
                        required 
                        ref={this.phoneIpt}                    
                        defaultValue={client.phone}
                      />
                    </div>
    
                    <div className="form-group">
                      <label htmlFor="balance">Balance</label>
                      <input 
                        type="text"
                        className="form-control"
                        name="balance"
                        minLength="1"
                        ref={this.balanceIpt}
                        defaultValue={client.balance}
                      />
                    </div>
    
                    <input type="submit" value="Submit" className="btn btn-primary btn-block" />
                </form>
              </div>
            </div>
          </div>
        );
    }
    else{
        return <Spinner />
    }
  }
}
EditClients.propTypes = {
    firestore: PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(props =>[
        {collection: 'clients', storeAs: 'client', doc: props.match.params.id}
    ]),
    connect(({firestore: {ordered}}, props) => ({
      client: ordered.client && ordered.client[0]
    }))
  )(EditClients);