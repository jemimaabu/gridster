import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Home } from './components/Home';
declare let module: any

class App extends React.Component<{},{}> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <div>
        <Home />
      </div>
    );
  }
};

ReactDOM.render(<App />,
document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}