import Header from '@/components/landing-page/header'
import React from 'react'

type HomePageLayoutProps = React.PropsWithChildren

const HomePageLayout = ({ children }: HomePageLayoutProps) => {
  return (
    <main>
      <Header /> {children}
    </main>
  )
}

export default HomePageLayout
