export default [{
  /**
   * Ensure content spans at least the size of the browser window.
   * See: http://codepen.io/absolutholz/post/html-and-body-element-height-100
   * ========================================================================
   */
  html: {
    height: '100%',
  },
  body: {
    minHeight: '100%',
  },
}, {
  /**
   * Consistent `box-sizing`.
   * See: http://www.paulirish.com/2012/box-sizing-border-box-ftw/
   * ========================================================================
   */
  html: {
    boxSizing: 'border-box',
  },
  '*, *:before, *:after': {
    boxSizing: 'inherit',
  },
}];
