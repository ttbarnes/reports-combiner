import React from 'react';
import { Link } from 'react-router-dom';

const IntegrationsCount = (props) => {
  const {
    integrations,
    totalCount
  } = props;

  if (!integrations || !totalCount) return null;

  return (
    <div>
      <p>
        <small>{integrations.length}/{totalCount} exchanges integrated</small>
        {props.showCta && <span>{' '}-{' '}<Link to="/integrations">add exchange</Link></span>}
      </p>
    </div>
  )
}

export default IntegrationsCount; 
