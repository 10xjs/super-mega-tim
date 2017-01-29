import {createElement, PropTypes} from 'react';
import compose from 'recompose/compose';
import setDisplayName from 'recompose/setDisplayName';
import setPropTypes from 'recompose/setPropTypes';

export const render = ({url, content, type = 'text/javascript', id}) => {
  if (url) {
    return <script type={type} src={url}/>;
  }

  if (content) {
    const innerHtml = {__html: content};
    return <script type={type} id={id} dangerouslySetInnerHTML={innerHtml}/>;
  }

  return null;
};

export default compose(
  setDisplayName('Static/Script'),
  setPropTypes({
    type: PropTypes.string,
    id: PropTypes.string,
    url: PropTypes.string,
    content: PropTypes.string,
  }),
)(render);
