import create from '/../lib/create-middleware';
import {createServerRenderContext} from 'react-router';

import createStore from '/store';

const initializeContext = (req) => {
  const context = {
    router: createServerRenderContext(),
  };

  req.context = createStore(context);
};

export default create({
  request: initializeContext,
});
