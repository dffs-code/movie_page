import React from 'react';

import { BrowserRouter, Switch, Route} from 'react-router-dom';

import Main from './pages/main/index';
import Movie from './pages/movie/index'

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/movie_page' component={Main} />
            <Route path='/movie_page/movie/:id' component={Movie} />
        </Switch>
    </BrowserRouter>
);

export default Routes;