import { createBrowserRouter } from 'react-router'
import { AppLayout } from './components/AppLayout.tsx'
import { MenuPage } from './pages/MenuPage.tsx'
import { InitDatabasePage } from './pages/InitDatabasePage.tsx'
import { TransactionPage } from './pages/TransactionPage.tsx'
import { ReportPage } from './pages/ReportPage.tsx'
import { ExitPage } from './pages/ExitPage.tsx'
import { NotFoundPage } from './pages/NotFoundPage.tsx'

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { index: true, element: <MenuPage /> },
      { path: 'init', element: <InitDatabasePage /> },
      { path: 'transaction', element: <TransactionPage /> },
      { path: 'report', element: <ReportPage /> },
      { path: 'exit', element: <ExitPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
