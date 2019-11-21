const SimplePage = ({flags}) => (
<div>
  <h1>Flags</h1>
    {flags['flag-test'] && <div>Flag 1</div>}
    {flags['flag-test-2'] && <div>Flag 2</div>}
    {flags['flag-test-3'] && <div>Flag 3</div>}

</div>
)

SimplePage.getInitialProps = ({  req }) => {
  return { flags: req.flags }
}


export default SimplePage
