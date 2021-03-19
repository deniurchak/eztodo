import React from 'react'
import {Router, Route} from 'react-router'
import { Container } from 'semantic-ui-react'
import NavBar from './navigation/NavBar'
import history from '../history'
import PrivateRoute from './navigation/PrivateRoute'
import Login from './Login'
import { ToastContainer } from 'react-toastify'
import '../App.css'
import AddItemModal from './modals/AddItemModal'
import Meetings from './meetings/Meetings'
import ToDoNavBar from './navigation/ToDoNavBar'
import Deadlines from './deadlines/Deadlines'
import Month from './todoItems/month/Month'
import Today from './todoItems/today/Today'
import Week from './todoItems/week/Week'

export default function App() {
    return(
        <>
        <Router history={history} >
            <ToastContainer position='bottom-right' hideProgressBar />
            <Container>
                <Route path='/' exact component={Login}/>
                <PrivateRoute path='/' component={NavBar}/>
                <PrivateRoute path='/todo' component={ToDoNavBar}/>
                <PrivateRoute path={'/todo/(.+)/add'} component={AddItemModal}/>
                <PrivateRoute path='/todo/month' component={Month}/>
                <PrivateRoute path='/todo/week' component={Week}/>
                <PrivateRoute path='/todo/today/' component={Today}/>
                <PrivateRoute path='/meetings/' component={Meetings}/>
                <PrivateRoute path='/deadlines/' component={Deadlines}/>
            </Container>
        </Router>
        </>
        )     
}
