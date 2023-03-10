import type { NextPage } from 'next'
import Header from './Header'
import Footer from './Footer'

type Props = {
  children?: React.ReactNode
}

const Layout: NextPage<Props> = ({ children }) => {
  return (
    <div className='all_view'>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout