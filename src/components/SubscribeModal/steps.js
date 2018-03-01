import React from 'react';

export const Step1 = ({ onButtonClick }) => (
  <div className="align-center">
    <h1>Premium subscription required</h1>
    <p>Register for premium to get:</p>
    <ul>
      <li>Unlimated exchanges</li>
      <li>Unlimated CSV/PDF rows</li>
      <li>Add notes</li>
      <li>Statistics</li>
      <li>Etc</li>
    </ul>
    <button onClick={onButtonClick}>Subscribe today</button>
  </div>  
);

export const Step2 = ({ onButtonClick }) => (
  <div className="align-center">
    <h1>Premium subscription</h1>
    <p>£1.23 p/month</p>

    <button onClick={onButtonClick}>Mock send payment</button>
  </div>
);

export const Step3 = () => (
  <div className="align-center">
    <h1>Thank you</h1>
    <p>We hope you enjoy! :)</p>
  </div>
);
