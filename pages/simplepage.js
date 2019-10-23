import fetch from 'isomorphic-unfetch'

const SimplePage = ({flags}) => (
<div>
  <h1>Flags</h1>
    {flags['flag-test'] && <div>The test is on</div>}
    {flags['flag-test-2'] && <div>The second test is on</div>}
</div>
)

SimplePage.getInitialProps = async ({ req }) => {
  const res = await fetch('http://localhost:3000/launchDarkley')
  const flags = await res.json()
    return { flags }
  }


export default SimplePage
