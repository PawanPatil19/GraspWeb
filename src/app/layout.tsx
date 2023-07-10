import './globals.css'
import { Inter, Poppins } from 'next/font/google'
import ClientOnly from './components/ClientOnly'
import Navbar from './components/NavBar/navbar'
import ToasterProvider from './providers/ToasterProvider'
import RegisterModal from './components/modals/RegisterModal'
import LoginModal from './components/modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'


const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({
  subsets: ['latin'],
  weight: '300'
})

export const metadata = {
  title: 'Grasp',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ClientOnly>
          <Navbar currentUser={currentUser}/>
          <ToasterProvider />
          <RegisterModal />
          <LoginModal />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
