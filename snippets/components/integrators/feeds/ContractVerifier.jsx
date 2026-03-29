/**
 * @component        ContractVerifier
 * @category         integrators
 * @subcategory      feeds
 * @status           experimental
 * @description      Interactive widget to verify Livepeer contract addresses on-chain via Controller lookup and Blockscout address inspection. Two modes: look up by name, verify by address. Consumes pipeline data from contractAddressesData.jsx.
 * @dataSource       prop (contractAddressesData.jsx) + Arbitrum One RPC (eth_call) + Blockscout API v2 (/api/v2/addresses/)
 * @aiDiscoverability none
 *
 * // ContractAddresses: see snippets/data/contract-addresses/contractAddressesData.jsx
 * @param {ContractAddresses} data - Pipeline contract addresses data object.
 * @param {string} [className=''] - Optional CSS class override.
 * @param {object} [style={}]     - Optional inline style override.
 */
export const ContractVerifier = ({ data, className = "", style = {}, ...rest }) => {

  // ── CHAIN CONFIG ───────────────────────────────────────────────────────
  const CHAINS = {
    arbitrumOne: {
      label: 'Arbitrum One',
      chainId: 42161,
      rpcUrls: [
        'https://arb1.arbitrum.io/rpc',
        'https://arbitrum-one-rpc.publicnode.com',
        'https://arbitrum.drpc.org',
      ],
      blockscout: 'https://arbitrum.blockscout.com',
      etherscan: 'https://arbiscan.io',
      hasController: true,
    },
    ethereumMainnet: {
      label: 'Ethereum Mainnet',
      chainId: 1,
      rpcUrls: [
        'https://eth.llamarpc.com',
        'https://ethereum-rpc.publicnode.com',
        'https://eth.drpc.org',
      ],
      blockscout: 'https://eth.blockscout.com',
      etherscan: 'https://etherscan.io',
      hasController: false,
    },
  }
  const ZERO_ADDR  = '0x0000000000000000000000000000000000000000'
  const SELECTOR   = '0xe16c7d98' // keccak256("getContract(bytes32)")[:4]

  // ── KECCAK256 HASHES (mathematical constants, stable forever) ─────────
  // Used as bytes32 argument to Controller.getContract()
  const KECCAK256 = {
    AIServiceRegistry: '0x708d071449926f2d3af17f15cb9f54ed8b3886a1ef57c3059438aa0ca4d710d0',
    BondingManager:    '0x2517d59a36a86548e38734e8ab416f42afff4bca78706a66ad65750dae7f9e37',
    BondingVotes:      '0x2a1b465fbcae519904f0fb11f93e73dfbeb47ec54530ec444279610af8cf06b2',
    Controller:        '0x7c20e2bbcd91c5aaa7898ba022ab8867ac32d84e959c236484db066900aa363a',
    DelegatorPool:     '0x7a9ff95f60f5743cfd4d2b01f213bbd2032518d7d7b630413bff404321d96022',
    Governor:          '0xd0990c50b6714f222e6fd1faaf5345bf1aa2867d2861fc2cc43b364e7d948647',
    L2LPTDataCache:    '0x8ecfba413a4e4715a264d70a55d3a35bf60b2954c56759310202f39281623200',
    L2LPTGateway:      '0x07148fd8bd26d2f980f876cc40cea159d0cca6e6456a379f06f34fb338d35be5',
    L2Migrator:        '0x74b6d21e0d4650f622c903126d418c1a52bcc99ea7acb0db0809fc0eeae6c7c3',
    LivepeerGovernor:  '0xaea11c65571dd8b6188d3a5cf5e5d3d4695845e6f217cad0b453b4e276c6cdcd',
    LivepeerToken:     '0x3443e257065fe41dd0e4d1f5a1b73a22a62e300962b57f30cddf41d0f8273ba7',
    MerkleSnapshot:    '0xb6138afe6f306a47bdf645c5aebcb9781efe787d221a1880e62d1f76dae58b84',
    Minter:            '0x6e58ad548d72b425ea94c15f453bf26caddb061d82b2551db7fdd3cefe0e9940',
    PollCreator:       '0x0343f01276c9038f8c7154dcdf7873ad6edd872ce0e719ebd989c051b4b1039b',
    RoundsManager:     '0xe8438ea868df48e3fc21f2f087b993c9b1837dc0f6135064161ce7d7a1701fe8',
    ServiceRegistry:   '0x79c5d2a4a07754f4bacb0ffba18ac516030ee589ebc89db8627680c4d4cdb230',
    SortedDoublyLL:    '0xf32422ac790bd816e1e02dc866df27d6d55047c1dc08def99809859734b7ab2c',
    TicketBroker:      '0xbd1aa3e8d2464256d7fd3dcf645c16418d5d8c51d971f1ad7d57e7b1b5eee239',
    Treasury:          '0x6efca2866b731ee4984990bacad4cde10f1ef764fb54a5206bdfd291695b1a9b',
  }

  // ── DERIVE CONTRACT LISTS FROM PIPELINE DATA ──────────────────────────
  const buildChainData = (chainKey) => {
    const chainData = data && data[chainKey]
    const entries = (chainData && chainData.current) || []
    // Active only: skip historical entries, prefer proxy over standalone over target
    const canonical = {}
    entries.forEach(c => {
      if (c.isHistorical) return
      if (!canonical[c.name]) {
        canonical[c.name] = c
      } else if (c.type === 'proxy') {
        canonical[c.name] = c
      }
    })
    return { entries, canonical }
  }

  // ── STATE ─────────────────────────────────────────────────────────────
  const [chain, setChain] = useState('arbitrumOne')
  const [tab, setTab] = useState('lookup')
  const [selectedName, setSelectedName] = useState('BondingManager')
  const [address, setAddress] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // ── CHAIN-DERIVED DATA ────────────────────────────────────────────────
  const chainConfig = CHAINS[chain]
  const { entries: contracts, canonical: canonicalMap } = buildChainData(chain)
  const controllerEntry = contracts.find(c => c.name === 'Controller')
  const CONTROLLER = controllerEntry
    ? controllerEntry.address
    : '0xD8E8328501E9645d16Cf49539efC04f734606ee4'

  // Lookup mode: derived entirely from pipeline data
  // If meta.registeredInController is populated, use it as the filter
  // If not yet populated (pipeline in flight), show all contracts that have a keccak hash
  // On-chain zero result is handled gracefully in the result card, not by exclusion
  const lookupEntries = chainConfig.hasController
    ? Object.values(canonicalMap)
        .filter(c => {
          if (c.meta && typeof c.meta.registeredInController === 'boolean') {
            return c.meta.registeredInController
          }
          // Pipeline field not yet populated: include if we have a keccak hash
          return KECCAK256[c.name] !== undefined
        })
        .sort((a, b) => a.name.localeCompare(b.name))
    : []
  const lookupNames = lookupEntries.map(c => c.name)

  // ── HANDLERS ──────────────────────────────────────────────────────────

  const rpcCall = async (calldata) => {
    const urls = chainConfig.rpcUrls
    for (const url of urls) {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'eth_call',
            params: [{ to: CONTROLLER, data: calldata }, 'latest'],
            id: 1,
          }),
        })
        const json = await res.json()
        if (json.error) throw new Error(json.error.message)
        return json.result
      } catch (e) {
        if (url === urls[urls.length - 1]) throw e
      }
    }
  }

  const lookupByName = async () => {
    const hash = KECCAK256[selectedName]
    if (!hash) {
      setError(`No keccak256 hash available for "${selectedName}".`)
      return
    }
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const calldata = SELECTOR + hash.slice(2)
      const rpcResult = await rpcCall(calldata)
      const resolved = '0x' + rpcResult.slice(-40)
      const isZero = resolved.toLowerCase() === ZERO_ADDR
      const expected = canonicalMap[selectedName]
        ? canonicalMap[selectedName].address
        : null
      const matches = !isZero && expected
        && resolved.toLowerCase() === expected.toLowerCase()
      setResult({
        mode: 'lookup',
        resolved,
        isZero,
        matches,
        name: selectedName,
        expectedAddress: expected,
      })
    } catch (e) {
      setError(e.message || 'All RPC endpoints failed')
    } finally {
      setLoading(false)
    }
  }

  const verifyAddress = async () => {
    const trimmed = address.trim()
    if (!/^0x[0-9a-fA-F]{40}$/.test(trimmed)) {
      setError('Invalid address format. Expected 0x followed by 40 hex characters.')
      return
    }
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const res = await fetch(`${chainConfig.blockscout}/api/v2/addresses/${trimmed}`)
      if (!res.ok) throw new Error(`Blockscout returned ${res.status}`)
      const bsData = await res.json()
      const nameStr = (bsData.name || '').toLowerCase()
      const isLivepeerNamed = nameStr.includes('livepeer') || nameStr.includes('proxy')
      // Check if this address is in our pipeline data
      const pipelineMatch = contracts.find(
        c => c.address.toLowerCase() === trimmed.toLowerCase()
      )
      setResult({
        mode: 'verify',
        is_contract: bsData.is_contract,
        is_verified: bsData.is_verified,
        name: bsData.name || null,
        isLivepeerNamed,
        has_logs: bsData.has_logs || false,
        queriedAddress: trimmed,
        pipelineMatch: pipelineMatch || null,
      })
    } catch (e) {
      setError(e.message || 'Blockscout query failed')
    } finally {
      setLoading(false)
    }
  }

  const castFallback = (name) =>
    `cast call ${CONTROLLER} \\\n  "getContract(bytes32)(address)" \\\n  $(cast keccak "${name}") \\\n  --rpc-url ${chainConfig.rpcUrls[0]}`

  // ── STYLES ────────────────────────────────────────────────────────────

  const styles = {
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      color: 'var(--foreground)',
      ...style,
    },
    tabRow: {
      display: 'flex',
      gap: '0.5rem',
    },
    tabBase: {
      padding: '0.5rem 1rem',
      border: '1px solid var(--border)',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      fontWeight: 600,
      transition: 'background 0.15s, color 0.15s',
    },
    tabActive: {
      background: 'var(--accent)',
      color: 'var(--lp-color-on-accent)',
      borderColor: 'var(--accent)',
    },
    tabInactive: {
      background: 'transparent',
      color: 'var(--foreground)',
    },
    formRow: {
      display: 'flex',
      gap: '0.5rem',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    select: {
      padding: '0.5rem 0.75rem',
      border: '1px solid var(--border)',
      borderRadius: '4px',
      background: 'var(--background)',
      color: 'var(--foreground)',
      fontSize: '0.9rem',
      minWidth: '200px',
    },
    input: {
      padding: '0.5rem 0.75rem',
      border: '1px solid var(--border)',
      borderRadius: '4px',
      background: 'var(--background)',
      color: 'var(--foreground)',
      fontSize: '0.9rem',
      fontFamily: 'monospace',
      flex: '1 1 280px',
      minWidth: '280px',
    },
    button: {
      padding: '0.5rem 1.25rem',
      border: 'none',
      borderRadius: '4px',
      background: 'var(--accent)',
      color: 'var(--lp-color-on-accent)',
      fontSize: '0.9rem',
      fontWeight: 600,
      cursor: 'pointer',
      whiteSpace: 'nowrap',
    },
    buttonDisabled: {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
    card: {
      border: '1px solid var(--border)',
      borderRadius: '4px',
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
    },
    addressText: {
      fontFamily: 'monospace',
      fontSize: '0.9rem',
      wordBreak: 'break-all',
    },
    badgeMatch: {
      display: 'inline-block',
      padding: '0.15rem 0.5rem',
      borderRadius: '4px',
      fontSize: '0.8rem',
      fontWeight: 700,
      background: 'var(--lp-color-status-good)',
      color: 'var(--lp-color-on-accent)',
    },
    badgeMismatch: {
      display: 'inline-block',
      padding: '0.15rem 0.5rem',
      borderRadius: '4px',
      fontSize: '0.8rem',
      fontWeight: 700,
      background: 'var(--lp-color-status-bad)',
      color: 'var(--lp-color-on-accent)',
    },
    badgeWarn: {
      display: 'inline-block',
      padding: '0.15rem 0.5rem',
      borderRadius: '4px',
      fontSize: '0.8rem',
      fontWeight: 700,
      background: 'var(--lp-color-status-warn)',
      color: 'var(--foreground)',
    },
    badgeGood: {
      display: 'inline-block',
      padding: '0.15rem 0.5rem',
      borderRadius: '4px',
      fontSize: '0.8rem',
      fontWeight: 700,
      background: 'var(--lp-color-status-good)',
      color: 'var(--lp-color-on-accent)',
    },
    links: {
      display: 'flex',
      gap: '1rem',
      flexWrap: 'wrap',
      fontSize: '0.85rem',
      marginTop: '0.25rem',
    },
    link: {
      color: 'var(--accent)',
      textDecoration: 'none',
    },
    pre: {
      background: 'var(--background)',
      color: 'var(--foreground)',
      border: '1px solid var(--border)',
      borderRadius: '4px',
      padding: '0.75rem 1rem',
      fontSize: '0.85rem',
      fontFamily: 'monospace',
      overflowX: 'auto',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-all',
    },
    errorText: {
      color: 'var(--lp-color-status-bad)',
      fontSize: '0.9rem',
    },
    signalRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.9rem',
    },
    mismatchNote: {
      fontSize: '0.85rem',
      color: 'var(--lp-color-status-warn)',
      marginTop: '0.25rem',
    },
  }

  // ── RENDER HELPERS ────────────────────────────────────────────────────

  const renderLookupResult = () => {
    if (!result || result.mode !== 'lookup') return null
    if (result.isZero) {
      return (
        <div style={styles.card}>
          <span style={styles.badgeWarn}>NOT IN CONTROLLER</span>
          <span style={{ fontSize: '0.9rem', fontStyle: 'italic' }}>
            The Controller returned the zero address for "{result.name}".
            This contract exists on Arbitrum One but is not registered in the Controller.
            It may be standalone, detached, or part of a separate registry.
            Use the "Verify address" tab to inspect it directly.
          </span>
        </div>
      )
    }
    return (
      <div style={styles.card}>
        <div style={styles.signalRow}>
          <span style={result.matches ? styles.badgeMatch : styles.badgeMismatch}>
            {result.matches ? 'MATCH' : 'MISMATCH'}
          </span>
          <span style={{ fontWeight: 600 }}>{result.name}</span>
        </div>
        <div style={styles.addressText}>{result.resolved}</div>
        {!result.matches && (
          <div style={styles.mismatchNote}>
            MISMATCH may indicate a governance upgrade. Cross-check{' '}
            <a
              href="https://github.com/livepeer/governor-scripts/blob/master/updates/addresses.js"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >governor-scripts</a>.
          </div>
        )}
        <div style={styles.links}>
          <a
            href={`${chainConfig.etherscan}/address/${result.resolved}`}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.link}
          >View on Arbiscan</a>
          <a
            href={`${chainConfig.blockscout}/address/${result.resolved}`}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.link}
          >View on Blockscout</a>
        </div>
      </div>
    )
  }

  const renderVerifyResult = () => {
    if (!result || result.mode !== 'verify') return null
    if (!result.is_contract) {
      return (
        <div style={styles.card}>
          <span style={styles.badgeMismatch}>NOT A CONTRACT</span>
          <span style={{ fontSize: '0.9rem' }}>
            This address is not a contract on Arbitrum One. It may be an
            externally owned account (EOA) or does not exist on this chain.
          </span>
        </div>
      )
    }
    return (
      <div style={styles.card}>
        {result.pipelineMatch && (
          <div style={styles.signalRow}>
            <span style={styles.badgeGood}>Known Livepeer contract</span>
            <span style={{ fontWeight: 600 }}>{result.pipelineMatch.name}</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--muted-text)' }}>
              ({result.pipelineMatch.type}, {result.pipelineMatch.category})
            </span>
          </div>
        )}
        {result.name && (
          <div style={styles.signalRow}>
            <span style={{ fontWeight: 600 }}>Explorer name:</span>
            <span>{result.name}</span>
            {result.isLivepeerNamed && !result.pipelineMatch && (
              <span style={styles.badgeGood}>Livepeer identified</span>
            )}
          </div>
        )}
        <div style={styles.signalRow}>
          <span style={{ fontWeight: 600 }}>Contract:</span>
          <span style={styles.badgeGood}>Yes</span>
        </div>
        <div style={styles.signalRow}>
          <span style={{ fontWeight: 600 }}>Source verified:</span>
          {result.is_verified
            ? <span style={styles.badgeGood}>Verified</span>
            : <span style={styles.badgeWarn}>Not verified</span>
          }
        </div>
        <div style={styles.signalRow}>
          <span style={{ fontWeight: 600 }}>Transaction logs:</span>
          {result.has_logs
            ? <span style={styles.badgeGood}>Present</span>
            : <span style={styles.badgeWarn}>None found</span>
          }
        </div>
        {!result.pipelineMatch && (
          <div style={styles.signalRow}>
            <span style={styles.badgeWarn}>Not in Livepeer contract registry</span>
          </div>
        )}
        <div style={styles.links}>
          <a
            href={`${chainConfig.etherscan}/address/${result.queriedAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.link}
          >View on Arbiscan</a>
          <a
            href={`${BLOCKSCOUT}/address/${result.queriedAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.link}
          >View on Blockscout</a>
        </div>
      </div>
    )
  }

  // ── RETURN ────────────────────────────────────────────────────────────

  return (
    <div style={styles.wrapper} className={className} {...rest}>
      {/* Description */}
      {tab === 'lookup' && (
        <div style={{ fontSize: '0.9rem', color: 'var(--muted-text)' }}>
          Select a contract name and query the on-chain Controller to see its registered address.
        </div>
      )}
      {tab === 'verify' && (
        <div style={{ fontSize: '0.9rem', color: 'var(--muted-text)' }}>
          Paste any address to check whether it is a verified contract on {chainConfig.label}.
        </div>
      )}

      {/* Tab buttons */}
      <div style={styles.tabRow}>
        <button
          style={{ ...styles.tabBase, ...(tab === 'lookup' ? styles.tabActive : styles.tabInactive) }}
          onClick={() => { setTab('lookup'); setResult(null); setError(null) }}
          aria-pressed={tab === 'lookup'}
        >
          Look up contract
        </button>
        <button
          style={{ ...styles.tabBase, ...(tab === 'verify' ? styles.tabActive : styles.tabInactive) }}
          onClick={() => { setTab('verify'); setResult(null); setError(null) }}
          aria-pressed={tab === 'verify'}
        >
          Verify address
        </button>
      </div>

      {/* Look up form */}
      {tab === 'lookup' && (
        <div style={styles.formRow}>
          <select
            value={selectedName}
            onChange={(e) => setSelectedName(e.target.value)}
            style={styles.select}
            aria-label="Contract name"
          >
            {lookupNames.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
          <button
            onClick={lookupByName}
            disabled={loading}
            style={{ ...styles.button, ...(loading ? styles.buttonDisabled : {}) }}
          >
            {loading ? 'Querying on-chain...' : 'Look up'}
          </button>
        </div>
      )}

      {/* Verify tab */}
      {tab === 'verify' && (
        <div style={styles.formRow}>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="0x..."
            style={styles.input}
            aria-label="Contract address"
            spellCheck={false}
            autoComplete="off"
          />
          <button
            onClick={verifyAddress}
            disabled={loading}
            style={{ ...styles.button, ...(loading ? styles.buttonDisabled : {}) }}
          >
            {loading ? 'Querying Blockscout...' : 'Verify'}
          </button>
        </div>
      )}

      {/* Results */}
      <div role="status" aria-live="polite">
        {renderLookupResult()}
        {renderVerifyResult()}

        {/* Error with fallback */}
        {error && (
          <div>
            <div style={styles.errorText}>{error}</div>
            {tab === 'lookup' && (
              <div style={{ marginTop: '0.75rem' }}>
                <div style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                  Verify manually with the Foundry CLI:
                </div>
                <pre style={styles.pre}>{castFallback(selectedName)}</pre>
              </div>
            )}
            {tab === 'verify' && (
              <div style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
                Try inspecting this address directly on{' '}
                <a
                  href={chainConfig.etherscan}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.link}
                >Arbiscan</a>.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
