import * as React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Index from './index';

class App extends React.Component {

    public render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Index} />
                </Switch>
            </BrowserRouter>
        )
    }

}

export default App;