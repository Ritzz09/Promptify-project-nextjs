import '@styles/globals.css'
// import Favicon from "@public"
import Nav from "@components/Nav"
import Provider from "@components/Provider"
import Head from 'next/head';

export const metadata = {
    title : "Promptify - A Prompt Sharing Platform",
    description : "Discover and share prompts",
    
}

const RootLayout = ({children}) => {
  return (
    <html lang='en'>
        <Head>
            <link rel="icon" href="/favicon.ico" sizes="any" />
            <link rel="shortcut icon" href="/favicon.ico" sizes="any" />
        </Head>
        <body>
            <Provider>
                <div className="main">
                    <div className='gradient'/>
                </div>

                <main className='app'>
                    <Nav/>
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout