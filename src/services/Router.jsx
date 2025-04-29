import GuestLayout from '@/layout/GuestLayout'
import MainLayout from '@/layout/MainLayout'
import BillingPage from '@/pages/BillingPage'
// import Dashboard from '@/pages/dashboard/Dashoard'
import Dashboard from '@/pages/Dashboard'
import LoginPage from '@/pages/LoginPage'
import ReportPage from '@/pages/ReportPage'
import StudentsPage from '@/pages/StudentsPage'
import ArchivePage from '@/pages/ArchivePage'
import PaymentCollectionPage from '@/pages/PaymentCollectionPage'
import {createBrowserRouter, Navigate} from 'react-router-dom'
import SettingsPage from '@/pages/SettingsPage'


export const router = createBrowserRouter ([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/login" />,
            },
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/students',
                element: <StudentsPage />
            },
            {
                path: '/billing',
                element: <BillingPage />
            },
            {
                path: '/collection',
                element: <PaymentCollectionPage />
            },
            {
                path: '/reports',
                element: <ReportPage />
            },
            {
                path: '/archive',
                element: <ArchivePage/>
            }, 
            {
                path: '/settings',
                element: <SettingsPage/>
            },
        ]
    },
    {
        path: '/login',
        element: <GuestLayout />,
        children:[
            {
                path: '/login',
                element: <LoginPage />
            }
        ]
    },

    //for signup page
])
