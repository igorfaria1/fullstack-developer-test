import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Product from '../pages/Product';

const Routes: React.FC = () => (
    <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/product/:product_id+" component={Product}></Route>
    </Switch>
)

export default Routes;