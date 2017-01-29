import {createElement, PropTypes} from 'react';
import compose from 'recompose/compose';
import setDisplayName from 'recompose/setDisplayName';
import setPropTypes from 'recompose/setPropTypes';

export const render = ({url, content}) => {
  if (url) {
    return <link rel='stylesheet' href={url}/>;
  }

  if (content) {
    const innerHtml = {__html: content};
    return <style type='text/css' dangerouslySetInnerHTML={innerHtml}/>;
  }

  return null;
};

export default compose(
  setDisplayName('Static/Style'),
  setPropTypes({
    url: PropTypes.string,
    content: PropTypes.string,
  }),
)(render);
