import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import {connect} from 'react-redux'
import { ConnectedRouter } from "connected-react-router"
import { history } from "./redux/store";
import Layout from "./components/layout/Layout";
import GalleryApp from "./views/gallery/GalleryApp";
console.log(process.env.REACT_APP_BACKEND_URL);
class App extends Component {
    render() {
        return (
            <ConnectedRouter history={history}>
                <Layout>
                    <Switch>
                        <Route path={"/"} component={GalleryApp}/>
                    </Switch>
                </Layout>
            </ConnectedRouter>
        );
    }
}


export default connect(
    null,
    null
)(App);
