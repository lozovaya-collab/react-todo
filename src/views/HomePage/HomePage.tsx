import { Link } from 'react-router-dom';

import './HomePage.scss';

const HomePage = () => {
  return (
    <>
      <Link to="/simple-app">
        <button>TODO APP</button>
      </Link>
      <Link to="/redux-app">
        <button>TODO APP with ReduxToolkit</button>
      </Link>
    </>
  )
}

export { HomePage };
