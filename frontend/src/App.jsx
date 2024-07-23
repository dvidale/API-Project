import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';
import * as sessionActions from './store/session';
import HomePage from '../components/HomePage/HomePage';

import SpotDetails from '../components/SpotDetailsPage';
import CreateASpot from '../components/CreateASpot';
import ManageSpotsPage from '../components/ManageSpotsPage/ManageSpotsPage';
import UpdateSpotPage from '../components/UpdateSpotPage/UpdateSpotPage';



function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
   <div id="site-wide-grid-container">
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
      </div>
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage/>
        
      },
      {
        path: '/spots/:id',
        element:<SpotDetails/>
      },
      {
        path: '/spots/new',
        element:<CreateASpot/>
      },
      {
        path: '/spots/current',
        element: <ManageSpotsPage/>
      },
      {
        path: '/spots/:id/edit',
        element:<UpdateSpotPage/>
      },
      {
        path:'*',
        element:<h1>Page Not Found</h1>
      },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;