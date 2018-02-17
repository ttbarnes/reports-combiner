import React from 'react';

const Loading = ({theme}) =>
  <div className={`promise-loading-cover ${theme}`}>

    <div className={`sk-wave ${theme}`}>
      <div className="sk-rect sk-rect1" />
      <div className="sk-rect sk-rect2" />
      <div className="sk-rect sk-rect3" />
      <div className="sk-rect sk-rect4" />
      <div className="sk-rect sk-rect5" />
    </div>

    <div className="loader" />
  </div>
;

export default Loading;
