import {createElement} from "react";
import {Match, Miss} from "react-router";

import Landing from "/component/view/landing";
import NotFound from "/component/view/not-found";

export default () => (
  <div>
    <Match
      pattern="/"
      component={Landing}
    />
    <Miss key="notFound" component={NotFound}/>
  </div>
);
