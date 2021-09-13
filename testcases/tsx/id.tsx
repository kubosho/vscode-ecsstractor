import React from 'react';

export function IdTestCase() {
  return (
    <div>
      <header id="global-header">
        <h1 id="site-title">Test case</h1>
      </header>

      <main>
        <article className="content">
          <h1 className="article-title">Test title</h1>
          <p>Test content</p>
        </article>
      </main>

      <footer id="global-footer">
        <small className="copyright">&copy; 2017 kubosho_</small>
      </footer>
    </div>
  );
}
