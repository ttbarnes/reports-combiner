import React from 'react';

const Loading = (theme) => 
  <div className={`promise-loading-cover ${theme}`}>
    <p style={{ opacity: '.8' }}><small>...Loading...</small></p>
    <div className="loader" />
  </div>
;

export default Loading;
