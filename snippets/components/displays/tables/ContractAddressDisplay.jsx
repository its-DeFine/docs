/**
 * @component ContractAddressDisplay
 * @category displays
 * @subcategory tables
 * @status deprecated
 * @description Renders Livepeer contract addresses from contractAddressesData.jsx.
 *              Displays current addresses in searchable tables (Arbitrum One + Ethereum Mainnet)
 *              and historical/deprecated addresses in collapsible sections.
 *              Addresses are copyable and linked to block explorers.
 * @aiDiscoverability props-extracted
 * @param {object} data - The contractAddresses object from contractAddressesData.jsx
 * @param {boolean} [showHistorical=true] - Whether to show deprecated contract section
 * @param {string} [className=""] - CSS class name
 * @param {object} [style={}] - Inline style overrides
 */

export const ContractAddressDisplay = ({
  data = {},
  showHistorical = true,
  className = '',
  style = {},
}) => {
  // All state at top level — Mintlify requires hooks only in the exported component function
  const [arbQuery, setArbQuery] = useState('')
  const [arbCategory, setArbCategory] = useState('All')
  const [ethQuery, setEthQuery] = useState('')
  const [ethCategory, setEthCategory] = useState('All')
  const [copiedAddress, setCopiedAddress] = useState(null)

  if (!data || !data.arbitrumOne) {
    return <div>No contract address data available.</div>
  }

  const explorerUrls = data.meta?.explorerUrls || {}
  const arbscanBase = explorerUrls?.arbiscan || 'https://arbiscan.io/address/'
  const ethscanBase = explorerUrls?.etherscan || 'https://etherscan.io/address/'

  const handleCopy = (address) => {
    navigator.clipboard.writeText(address)
    setCopiedAddress(address)
    setTimeout(() => setCopiedAddress(null), 1500)
  }

  const addressCell = (address, explorerBase, explorerLabel) => (
    <span
      style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
    >
      <code
        style={{
          padding: '0.15rem 0.35rem',
          borderRadius: '4px',
          fontSize: '0.8rem',
          fontFamily: 'monospace',
          backgroundColor: 'var(--card-background)',
          border: '1px solid var(--border)',
          wordBreak: 'break-all',
        }}
      >
        {address}
      </code>
      <button
        onClick={() => handleCopy(address)}
        title="Copy address"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '2px 4px',
          fontSize: '0.75rem',
          color:
            copiedAddress === address
              ? 'var(--primary)'
              : 'var(--text-secondary)',
          opacity: copiedAddress === address ? 1 : 0.6,
        }}
      >
        {copiedAddress === address ? 'Copied' : 'Copy'}
      </button>
      <a
        href={`${explorerBase}${address}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontSize: '0.75rem',
          color: 'var(--primary)',
          textDecoration: 'none',
        }}
      >
        {explorerLabel} ↗
      </a>
    </span>
  )

  const arbEntries = data.arbitrumOne.current || []
  const ethEntries = data.ethereumMainnet.current || []

  const arbCategories = [...new Set(arbEntries.map((e) => e.category))].sort()
  const ethCategories = [...new Set(ethEntries.map((e) => e.category))].sort()

  const filteredArb = arbEntries.filter((e) => {
    const cat = arbCategory === 'All' || e.category === arbCategory
    const q =
      !arbQuery ||
      e.name.toLowerCase().includes(arbQuery.toLowerCase()) ||
      e.address.toLowerCase().includes(arbQuery.toLowerCase())
    return cat && q
  })

  const filteredEth = ethEntries.filter((e) => {
    const cat = ethCategory === 'All' || e.category === ethCategory
    const q =
      !ethQuery ||
      e.name.toLowerCase().includes(ethQuery.toLowerCase()) ||
      e.address.toLowerCase().includes(ethQuery.toLowerCase())
    return cat && q
  })

  const tableStyles = {
    wrapper: { marginBottom: '1.5rem' },
    controls: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem',
      marginBottom: '0.75rem',
    },
    input: {
      flex: 1,
      minWidth: '200px',
      maxWidth: '400px',
      padding: '8px 12px',
      borderRadius: '8px',
      border: '1px solid var(--border)',
      background: 'var(--background)',
      color: 'var(--text)',
    },
    select: {
      minWidth: '150px',
      padding: '8px 12px',
      borderRadius: '8px',
      border: '1px solid var(--border)',
      background: 'var(--background)',
      color: 'var(--text)',
    },
    table: { width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' },
    th: {
      textAlign: 'left',
      padding: '0.5rem',
      borderBottom: '2px solid var(--border)',
    },
    tr: { borderBottom: '1px solid var(--border)' },
    td: { padding: '0.5rem' },
    count: {
      fontSize: '0.75rem',
      color: 'var(--text-secondary)',
      marginTop: '0.25rem',
    },
  }

  return (
    <div className={className} style={style}>
      {/* ── Arbitrum One ─────────────────────────── */}
      <h3 style={{ marginBottom: '0.5rem' }}>Arbitrum One</h3>
      <div style={tableStyles.controls}>
        <input
          type="text"
          value={arbQuery}
          onChange={(e) => setArbQuery(e.target.value)}
          placeholder="Search by name or address..."
          style={tableStyles.input}
        />
        <select
          value={arbCategory}
          onChange={(e) => setArbCategory(e.target.value)}
          style={tableStyles.select}
        >
          <option value="All">All categories</option>
          {arbCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div style={{ overflowX: 'auto', marginBottom: '0.25rem' }}>
        <table style={tableStyles.table}>
          <thead>
            <tr>
              <th style={tableStyles.th}>Contract</th>
              <th style={tableStyles.th}>Address</th>
              <th style={tableStyles.th}>Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredArb.map((entry, i) => (
              <tr key={`arb-${entry.address}-${i}`} style={tableStyles.tr}>
                <td
                  style={{
                    ...tableStyles.td,
                    whiteSpace: 'nowrap',
                    fontWeight: 600,
                  }}
                >
                  {entry.name}
                  {entry.version ? ` (${entry.version})` : ''}
                </td>
                <td style={tableStyles.td}>
                  {addressCell(entry.address, arbscanBase, 'Arbiscan')}
                </td>
                <td
                  style={{
                    ...tableStyles.td,
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {entry.type}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={tableStyles.count}>
        {filteredArb.length} of {arbEntries.length} contracts
      </div>

      {/* ── Ethereum Mainnet ─────────────────────── */}
      <h3 style={{ marginBottom: '0.5rem', marginTop: '1.5rem' }}>
        Ethereum Mainnet
      </h3>
      <div style={tableStyles.controls}>
        <input
          type="text"
          value={ethQuery}
          onChange={(e) => setEthQuery(e.target.value)}
          placeholder="Search by name or address..."
          style={tableStyles.input}
        />
        <select
          value={ethCategory}
          onChange={(e) => setEthCategory(e.target.value)}
          style={tableStyles.select}
        >
          <option value="All">All categories</option>
          {ethCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div style={{ overflowX: 'auto', marginBottom: '0.25rem' }}>
        <table style={tableStyles.table}>
          <thead>
            <tr>
              <th style={tableStyles.th}>Contract</th>
              <th style={tableStyles.th}>Address</th>
              <th style={tableStyles.th}>Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredEth.map((entry, i) => (
              <tr key={`eth-${entry.address}-${i}`} style={tableStyles.tr}>
                <td
                  style={{
                    ...tableStyles.td,
                    whiteSpace: 'nowrap',
                    fontWeight: 600,
                  }}
                >
                  {entry.name}
                  {entry.version ? ` (${entry.version})` : ''}
                </td>
                <td style={tableStyles.td}>
                  {addressCell(entry.address, ethscanBase, 'Etherscan')}
                </td>
                <td
                  style={{
                    ...tableStyles.td,
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {entry.type}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={tableStyles.count}>
        {filteredEth.length} of {ethEntries.length} contracts
      </div>

      {/* ── Historical / Deprecated ──────────────── */}
      {showHistorical && (
        <div style={{ marginTop: '1.5rem' }}>
          <h2>Deprecated Contract Addresses</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Historical implementations replaced through governance upgrades.
          </p>
          {[
            {
              title: 'Arbitrum One — Historical',
              historical: data.arbitrumOne.historical,
              explorerBase: arbscanBase,
              explorerLabel: 'Arbiscan',
            },
            {
              title: 'Ethereum Mainnet — Historical',
              historical: data.ethereumMainnet.historical,
              explorerBase: ethscanBase,
              explorerLabel: 'Etherscan',
            },
          ].map(({ title, historical, explorerBase, explorerLabel }) => {
            const groups = Object.entries(historical || {})
            if (groups.length === 0) return null
            return (
              <div key={title} style={{ marginBottom: '1rem' }}>
                <details>
                  <summary
                    style={{
                      cursor: 'pointer',
                      fontWeight: 600,
                      padding: '0.5rem 0',
                    }}
                  >
                    {title}
                  </summary>
                  <div style={{ paddingLeft: '0.5rem' }}>
                    {groups.map(([group, groupData]) => (
                      <div key={group} style={{ marginBottom: '1rem' }}>
                        <h4
                          style={{
                            fontSize: '0.9rem',
                            marginBottom: '0.25rem',
                          }}
                        >
                          {group}
                        </h4>
                        <ul
                          style={{ listStyle: 'none', padding: 0, margin: 0 }}
                        >
                          {(groupData.entries || []).map((entry) => (
                            <li
                              key={entry.address}
                              style={{ padding: '0.25rem 0' }}
                            >
                              <strong
                                style={{
                                  minWidth: '3rem',
                                  display: 'inline-block',
                                }}
                              >
                                {entry.version}
                              </strong>
                              {addressCell(
                                entry.address,
                                explorerBase,
                                explorerLabel
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </details>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
