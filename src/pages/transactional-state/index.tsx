import React from 'react'
import Head from 'next/head'

import { useTransactionalState } from '~/services/transactional-state'

const TransactionalIndex = () => {
  const { data, isLoading, updateFilters } = useTransactionalState()

  if (isLoading) {
    return <h1>Loading....</h1>
  }

  return (
    <div>
      <Head>
        <title>Estado transacional</title>
      </Head>

      <div>

        <button onClick={() => updateFilters('status', 'dead')}>status</button>

        <button onClick={() => updateFilters('name', 'rick')}>name</button>

        <header>
          <h1>Estado transacional</h1>
        </header>
        <main>
          <pre>
            {JSON.stringify(data, null, 2)}
          </pre>
        </main>
        <footer></footer>
      </div>

    </div >
  )
}

export default TransactionalIndex;
