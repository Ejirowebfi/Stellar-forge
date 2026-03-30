import React, { Suspense } from 'react'
import { PageLoadingSkeleton } from './LoadingSkeleton'

// Lazy load route components with named export adapter
export const LazyTokenDashboard = React.lazy(() =>
  import('./TokenDashboard').then(m => ({ default: m.TokenDashboard }))
)
export const LazyTokenDetail = React.lazy(() =>
  import('./TokenDetail').then(m => ({ default: m.TokenDetail }))
)
export const LazyCreateToken = React.lazy(() =>
  import('./CreateToken').then(m => ({ default: m.CreateToken }))
)
export const LazyMintForm = React.lazy(() =>
  import('./MintForm').then(m => ({ default: m.MintForm }))
)
export const LazyBurnForm = React.lazy(() =>
  import('./BurnForm').then(m => ({ default: m.BurnForm }))
)
export const LazyAdminPanel = React.lazy(() =>
  import('./AdminPanel').then(m => ({ default: m.AdminPanel }))
)
export const LazyTokenExplorer = React.lazy(() =>
  import('./TokenExplorer').then(m => ({ default: m.TokenExplorer }))
)
export const LazyFAQ = React.lazy(() =>
  import('./FAQ').then(m => ({ default: m.FAQ }))
)

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