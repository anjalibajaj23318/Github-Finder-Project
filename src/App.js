import React, {Component, Fragment,useState} from 'react';
import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import './App.css';
import Navbar from './Components/layout/Navbar';
import UserItem from './Components/layout/users/UserItem';
import User from './Components/layout/users/User';
import Users from './Components/layout/users/Users';
import axios from 'axios';
import Search from './Components/layout/users/Search';
import Alert from './Components/layout/Alert';
import About from './Components/pages/About';
const App=()=> {
    const [users, setUsers] = useState([]);
const [user, setUser] = useState({});
const [repos, setRepos] = useState([]);

const [loading, setLoading] = useState(false);

const [alert, setAlert] = useState(null);





    const searchUsers = async text => {
        setLoading(true);
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${
            process.env.REACT_APP_GITHUB_CLIENT_ID
        }&client_secret=${
            process.env.REACT_APP_GITHUB_CLIENT_SECRET
        }`);

        setUsers(res.data.items);
        setLoading(false)
    }

    const getUser = async (username) => {
        setLoading(true);
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=${
            process.env.REACT_APP_GITHUB_CLIENT_ID
        }&client_secret=${
            process.env.REACT_APP_GITHUB_CLIENT_SECRET
        }`);

        setUser(res.data)
        setLoading(false);
    }
     const getUserRepos = async (username) => {
         setLoading(true);
         const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${
            process.env.REACT_APP_GITHUB_CLIENT_ID
        }&client_secret=${
            process.env.REACT_APP_GITHUB_CLIENT_SECRET
        }`);
         setRepos(res.data);
         setLoading(false);
    }
    const clearUsers = () => {
        setUsers([]);
        setLoading(false);
    }
    const showAlert = (msg, type) => {
        setAlert({ msg, type });

        setTimeout(() => setAlert(null), 2000)
    }

        return (<Router>
            <div className='App'>
                <Navbar/>
                <div className='container'>
                    <Alert alert={
                        alert
                    }></Alert>

                    <Switch>

                        <Route exact path="/"
                            render={props=>
                                (<Fragment>
                                    <Search searchUsers={
                                            searchUsers
                                        }
                                        clearUsers={
                                            clearUsers
                                        }
                                        showClear={
                                            users.length > 0 ? true : false
                                        }
                                        setAlert={
                                            showAlert
                                        }/>
                                    <Users loading={loading}
                                        users={users}/>

                                </Fragment>)
                            }/>
                        <Route exact path='/about'
                            component={About} />
                        <Route exact path='/user/:login' render={props => (<User {...props} getUser={getUser} getUserRepos={getUserRepos} user={user} repos={repos} loading={loading} />)}/>

                    </Switch>


                </div>
            </div>
        </Router>);
    }

export default App;
