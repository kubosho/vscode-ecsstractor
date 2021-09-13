import React, { useState } from 'react';

export function ComponentWithHooks() {
  const [count, setCount] = useState(0);

  return (
    <div id="container" className="container">
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
