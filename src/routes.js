import React from 'react';

import { BrowserRouter, Switch, Route} from 'react-router-dom';

import Main from './pages/main/index';
import Movie from './pages/movie/index'
import Search from './pages/search/index';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/movie_page' component={Main} />
            <Route path='/movie/:id' component={Movie} />
            <Route path='/search_page' component={Search} />
        </Switch>
    </BrowserRouter>
);

export default Routes;