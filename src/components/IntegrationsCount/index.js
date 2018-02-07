import React from 'react';

const IntegrationsCount = (props) => {
  const {
    integrations,
    totalCount
  } = props;

  if (!integrations || !totalCount) return null;

  return <p><small>{integrations.length}/{totalCount} exchanges</small></p>;
}

export default IntegrationsCount; 
