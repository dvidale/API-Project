import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';
import * as sessionActions from './store/session';
import HomePage from '../components/HomePage/HomePage';
import TestPage from '../components/TestPage/TestPage';
import SpotDetails from '../components/SpotDetailsPage';
import { csrfFetch } from './store/csrf';
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
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
     
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
        path:'/test',
        element:<TestPage/>
      },
      {
        path: '/spots/:id',
        element:<SpotDetails/>,
        loader: async ({params}) => {
          return csrfFetch(`/api/spots/${params.id}`)
        }
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
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;