import React from 'react'
import Head from 'next/head'
import { useTransactionalState } from '../../services/transactional-state'

const TransactionalIndex = () => {
  const transactionalState = useTransactionalState()

  return (
    <div>
      <Head>
        <title>Estado transacional</title>
      </Head>

      <div>
        <header>
          <h1>Estado transacional</h1>
        </header>
        <main>
          <pre>
            {JSON.stringify(transactionalState.data, null, 2)}
          </pre>
        </main>
        <footer></footer>
      </div>

    </div>
  )
}

export default TransactionalIndex;


