import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ColorList from './components/ColorList';
import ColorDetail from './components/ColorDetail';

function App() {
    return (
        <Router>
            <Header/>
            <div className="wrapper">
                <Sidebar/>
                <div className="main">
                    <Switch>
                        <Route exact path="/" component={ColorList}/>
                        <Route exact path="/group/:id" component={ColorList}/>
                        <Route path="/color/:id" component={ColorDetail}/>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
