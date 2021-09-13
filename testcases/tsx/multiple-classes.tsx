import React, { FC } from 'react';

type Props = {};

export const MultipleClassNamesTestCase: FC<Props> = ({}): JSX.Element => {
  return (
    <div className="container container-fluid article">
      <article className="article content">
        <h1 className="article title">Test title</h1>
        <p>Test content</p>
      </article>
    </div>
  );
};
