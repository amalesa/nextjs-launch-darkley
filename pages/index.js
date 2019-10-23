import React from 'react'
import Link from 'next/link'

const App = () => (
  <ul>
    <li>
      <Link href='/simplepage'>
        <a>Simple Page</a>
      </Link>
    </li>
    <li>
      <Link href={{ pathname: '/posts', query: { id: '2' } }} as='/posts/2'>
        <a>post #2</a>
      </Link>
    </li>
  </ul>
)

export default App