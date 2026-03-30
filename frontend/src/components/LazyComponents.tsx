import React, { Suspense } from 'react'
import { PageLoadingSkeleton } from './LoadingSkeleton'

// Lazy load route components
export const LazyTokenDashboard = React.lazy(() => import('./TokenDashboard'))
export const LazyTokenDetail = React.lazy(() => import('./TokenDetail'))
export const LazyCreateToken = React.lazy(() => import('./CreateToken'))
export const LazyMintForm = React.lazy(() => import('./MintForm'))
export const LazyBurnForm = React.lazy(() => import('./BurnForm'))
export const LazyAdminPanel = React.lazy(() => import('./AdminPanel'))
export const LazyTokenExplorer = React.lazy(() => import('./TokenExplorer'))
export const LazyFAQ = React.lazy(() => import('./FAQ'))

// Wrapper component with Suspense
interface LazyRouteWrapperProps {
  children: React.ReactNode
}

export const LazyRouteWrapper: React.FC<LazyRouteWrapperProps> = ({ children }) => {
  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      {children}
    </Suspense>
  )
}