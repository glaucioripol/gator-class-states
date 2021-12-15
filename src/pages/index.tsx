import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className='title is-3'>links</h1>

        <ul>
          <li><Link href='/transactional-state'>Transactional State</Link></li>
          <li><Link href='/persistent-state'>Persistent State</Link></li>
          <li><Link href='/client-state'>Client State</Link></li>
        </ul>
      </main>
    </div>
  )
}

export default Home
