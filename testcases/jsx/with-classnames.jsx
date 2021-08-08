import React from 'react';
import classNames from 'classnames';

export function ComponentWithClassNames() {
  return (
    <div
      id="container"
      className={classNames('container', {
        'container--modifier': true,
      })}
    />
  );
}
