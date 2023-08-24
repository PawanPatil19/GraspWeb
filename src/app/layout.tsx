import './globals.css'
import { Inter, Poppins } from 'next/font/google'
import ClientOnly from './components/ClientOnly'
import Navbar from './components/NavBar/navbar'
import ToasterProvider from './providers/ToasterProvider'
import RegisterModal from './components/modals/RegisterModal'
import LoginModal from './components/modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'
import UploadModal from './components/modals/UploadModal'
import Providers from "./providers";
import NotificationsPanelModal from './components/modals/NotificationsPanelModal'
import getCreatorNotifications from './actions/getCreatorNotifications'


export const dynamic = "force-dynamic";


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
  const notifications = await getCreatorNotifications(currentUser?.id);
  return (
    <html lang="en">
      <body className={poppins.className}>
      <Providers>
        <ClientOnly>
          <Navbar currentUser={currentUser} notifications={notifications.length}/>
          <ToasterProvider />
          <RegisterModal />
          <LoginModal />
          <NotificationsPanelModal notifications={notifications} />
        </ClientOnly>
        </Providers>
        {children}
        
      </body>
    </html>
  )
}
