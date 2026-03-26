/**
 * @component ContractAddressDisplay
 * @type displays
 * @subniche tables
 * @status stable
 * @description Renders Livepeer contract addresses from contractAddressesData.jsx.
 *              Displays current addresses in searchable tables (Arbitrum One + Ethereum Mainnet)
 *              and historical/deprecated addresses in collapsible sections.
 *              Addresses are copyable and linked to block explorers.
 * @accepts style, className
 * @aiDiscoverability props-extracted
 * @param {object} data - The contractAddresses object from contractAddressesData.jsx
 * @param {boolean} [showHistorical=true] - Whether to show deprecated contract section
 * @param {string} [className=""] - CSS class name
 * @param {object} [style={}] - Inline style overrides
 */

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={handleCopy}
      title="Copy address"
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "2px 4px",
        fontSize: "0.75rem",
        color: copied ? "var(--primary)" : "var(--text-secondary)",
        opacity: copied ? 1 : 0.6,
      }}
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
};

const AddressLink = ({ address, explorer, explorerUrls }) => {
  const baseUrl = explorer === "etherscan"
    ? (explorerUrls?.etherscan || "https://etherscan.io/address/")
    : (explorerUrls?.arbiscan || "https://arbiscan.io/address/");
  const label = explorer === "etherscan" ? "Etherscan" : "Arbiscan";

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
      <code style={{
        padding: "0.15rem 0.35rem",
        borderRadius: "4px",
        fontSize: "0.8rem",
        fontFamily: "monospace",
        backgroundColor: "var(--card-background)",
        border: "1px solid var(--border)",
        wordBreak: "break-all",
      }}>
        {address}
      </code>
      <CopyButton text={address} />
      <a
        href={`${baseUrl}${address}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ fontSize: "0.75rem", color: "var(--primary)", textDecoration: "none" }}
      >
        {label} ↗
      </a>
    </span>
  );
};

const NetworkTable = ({ title, entries, explorer, explorerUrls }) => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [...new Set(entries.map((e) => e.category))].sort();

  const filtered = entries.filter((entry) => {
    const matchesCategory = selectedCategory === "All" || entry.category === selectedCategory;
    const matchesQuery = !query ||
      entry.name.toLowerCase().includes(query.toLowerCase()) ||
      entry.address.toLowerCase().includes(query.toLowerCase()) ||
      (entry.version || "").toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div style={{ marginBottom: "1rem" }}>
      <h3 style={{ marginBottom: "0.5rem" }}>{title}</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem" }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name or address..."
          style={{
            flex: 1,
            minWidth: "200px",
            maxWidth: "400px",
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid var(--border)",
            background: "var(--background)",
            color: "var(--text)",
          }}
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            minWidth: "150px",
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid var(--border)",
            background: "var(--background)",
            color: "var(--text)",
          }}
        >
          <option value="All">All categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid var(--border)" }}>
              <th style={{ textAlign: "left", padding: "0.5rem", whiteSpace: "nowrap" }}>Contract</th>
              <th style={{ textAlign: "left", padding: "0.5rem" }}>Address</th>
              <th style={{ textAlign: "left", padding: "0.5rem" }}>Type</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((entry, i) => (
              <tr key={`${entry.address}-${i}`} style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "0.5rem", whiteSpace: "nowrap", fontWeight: 600 }}>
                  {entry.name}{entry.version ? ` (${entry.version})` : ""}
                </td>
                <td style={{ padding: "0.5rem" }}>
                  <AddressLink address={entry.address} explorer={explorer} explorerUrls={explorerUrls} />
                </td>
                <td style={{ padding: "0.5rem", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                  {entry.type}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
        {filtered.length} of {entries.length} contracts
      </div>
    </div>
  );
};

const HistoricalSection = ({ title, historical, explorer, explorerUrls }) => {
  const groups = Object.entries(historical || {});
  if (groups.length === 0) return null;

  return (
    <div style={{ marginBottom: "1rem" }}>
      <details>
        <summary style={{ cursor: "pointer", fontWeight: 600, padding: "0.5rem 0" }}>
          {title}
        </summary>
        <div style={{ paddingLeft: "0.5rem" }}>
          {groups.map(([group, data]) => (
            <div key={group} style={{ marginBottom: "1rem" }}>
              <h4 style={{ fontSize: "0.9rem", marginBottom: "0.25rem" }}>{group}</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {(data.entries || []).map((entry) => (
                  <li key={entry.address} style={{ padding: "0.25rem 0" }}>
                    <strong style={{ minWidth: "3rem", display: "inline-block" }}>{entry.version}</strong>
                    <AddressLink address={entry.address} explorer={explorer} explorerUrls={explorerUrls} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </details>
    </div>
  );
};

export const ContractAddressDisplay = ({
  data = {},
  showHistorical = true,
  className = "",
  style = {},
}) => {
  if (!data || !data.arbitrumOne) {
    return <div>No contract address data available.</div>;
  }

  const explorerUrls = data.meta?.explorerUrls || {};

  return (
    <div className={className} style={style}>
      <NetworkTable
        title="Arbitrum One"
        entries={data.arbitrumOne.current || []}
        explorer="arbiscan"
        explorerUrls={explorerUrls}
      />

      <NetworkTable
        title="Ethereum Mainnet"
        entries={data.ethereumMainnet.current || []}
        explorer="etherscan"
        explorerUrls={explorerUrls}
      />

      {showHistorical && (
        <>
          <h2>Deprecated Contract Addresses</h2>
          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
            Historical implementations replaced through governance upgrades.
          </p>
          <HistoricalSection
            title="Arbitrum One — Historical"
            historical={data.arbitrumOne.historical}
            explorer="arbiscan"
            explorerUrls={explorerUrls}
          />
          <HistoricalSection
            title="Ethereum Mainnet — Historical"
            historical={data.ethereumMainnet.historical}
            explorer="etherscan"
            explorerUrls={explorerUrls}
          />
        </>
      )}
    </div>
  );
};
