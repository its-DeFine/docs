/**
 * @component SearchTable
 * @type wrappers
 * @subniche tables
 * @status stable
 * @description Generic filterable table wrapper with search input, category dropdown(s), and optional separators.
 * @accepts className, style, ...rest
 * @aiDiscoverability props-extracted
 * @param {Function} [TableComponent=null] - Table renderer component (e.g. DynamicTable).
 * @param {React.ReactNode} [tableTitle=null] - Table title.
 * @param {Array} [headerList=[]] - Column header names.
 * @param {Array} [itemsList=[]] - Row data objects. Cell values can be strings or JSX.
 * @param {Array} [monospaceColumns=[]] - Column indices to render in monospace.
 * @param {string} margin - Margin passed to TableComponent.
 * @param {string} [searchPlaceholder='Search...'] - Placeholder text for the search input.
 * @param {Array} [searchColumns=[]] - Column names/indices to search against. Defaults to all headers.
 * @param {string} [categoryColumn='Category'] - Field name the first dropdown filters on.
 * @param {string} [nicheColumn=null] - Field name for a second dropdown filter. When set, shows a second dropdown.
 * @param {object} [columnWidths={}] - Column width overrides keyed by header name. Passed to TableComponent.
 * @param {object} [columnVariant={}] - Column display variants keyed by header name. Supported: "bold", "badge".
 * @param {Array} [categoryBadges=[]] - Array of {color, label} for "badge" variant rendering. Matched by label (case-insensitive).
 * @param {boolean} [showSeparators=false] - When true, inserts category separator rows. Labels are uppercased.
 * @param {string} [separatorColumn=null] - Override which column drives separators. Default: categoryColumn.
 * @param {boolean} [boldFirstColumn=true] - Auto-wraps first column in <strong> if value is a plain string. Overridden by columnVariant if set.
 * @param {string} [className=""] - CSS class name.
 * @param {object} [style={}] - Inline style overrides.
 */

const badgeColors = {
  blue: '#3b82f6', purple: '#8b5cf6', green: '#22c55e',
  yellow: '#eab308', red: '#ef4444', orange: '#f97316',
};

export const SearchTable = ({
  TableComponent = null,
  tableTitle = null,
  headerList = [],
  itemsList = [],
  monospaceColumns = [],
  margin,
  searchPlaceholder = 'Search...',
  searchColumns = [],
  categoryColumn = 'Category',
  nicheColumn = null,
  columnWidths = {},
  columnVariant = {},
  categoryBadges = [],
  showSeparators = false,
  separatorColumn = null,
  boldFirstColumn = true,
  className = "",
  style = {},
  ...rest
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedNiche, setSelectedNiche] = useState('All');

  const safeHeaderList = Array.isArray(headerList) ? headerList : [];
  const safeItemsList = Array.isArray(itemsList) ? itemsList : [];
  const safeMonospaceColumns = Array.isArray(monospaceColumns) ? monospaceColumns : [];
  const safeSearchColumns = Array.isArray(searchColumns) ? searchColumns : [];
  const activeColumns = safeSearchColumns.length ? safeSearchColumns : safeHeaderList;
  const normalizedQuery = query.trim().toLowerCase();

  // --- Badge colour map ---
  const badgeColorMap = {};
  categoryBadges.forEach((b) => { badgeColorMap[b.label.toLowerCase()] = b.color; });

  // --- Dropdown options ---
  const categories = [...new Set(safeItemsList.map((item) => String(item?.[categoryColumn] || '')).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));

  const nicheSource = selectedCategory === 'All'
    ? safeItemsList
    : safeItemsList.filter((item) => String(item?.[categoryColumn] || '') === selectedCategory);

  const niches = nicheColumn
    ? [...new Set(nicheSource.map((item) => String(item?.[nicheColumn] || '')).filter(Boolean))]
        .sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }))
    : [];

  // --- Filtering ---
  const categoryFilteredItems = safeItemsList.filter((item) => {
    const catMatch = selectedCategory === 'All' || String(item?.[categoryColumn] || '') === selectedCategory;
    const nicheMatch = !nicheColumn || selectedNiche === 'All' || String(item?.[nicheColumn] || '') === selectedNiche;
    return catMatch && nicheMatch;
  });

  const searchedItems = !normalizedQuery
    ? categoryFilteredItems
    : categoryFilteredItems.filter((item) =>
        activeColumns.some((column) => {
          const value = item?.[column] ?? item?.[String(column).toLowerCase()] ?? '';
          return String(value).toLowerCase().includes(normalizedQuery);
        })
      );

  // --- Sort by category then niche ---
  const sortedItems = [...searchedItems].sort((a, b) => {
    const catCmp = String(a[categoryColumn] || '').localeCompare(String(b[categoryColumn] || ''), 'en', { sensitivity: 'base' });
    if (catCmp !== 0 || !nicheColumn) return catCmp;
    return String(a[nicheColumn] || '').localeCompare(String(b[nicheColumn] || ''), 'en', { sensitivity: 'base' });
  });

  // --- Apply column variants ---
  const firstColumnName = safeHeaderList[0];

  const renderVariant = (value, variant) => {
    if (variant === 'bold' && typeof value === 'string') {
      return <strong>{value}</strong>;
    }
    if (variant === 'badge' && typeof value === 'string') {
      const colorName = badgeColorMap[value.toLowerCase()];
      const bg = badgeColors[colorName];
      if (bg) {
        return (
          <span style={{
            display: 'inline-block', padding: '2px 8px', borderRadius: '4px',
            fontSize: '0.75rem', fontWeight: 600, color: '#fff', backgroundColor: bg,
            whiteSpace: 'nowrap',
          }}>{value}</span>
        );
      }
    }
    return value;
  };

  const displayItems = sortedItems.map((item) => {
    const out = { ...item, _sepKey: String(item[separatorColumn || categoryColumn] || '') };
    for (const header of safeHeaderList) {
      if (columnVariant[header] && out[header] !== undefined) {
        out[header] = renderVariant(out[header], columnVariant[header]);
      }
    }
    // Bold first column by default if no explicit variant set
    if (boldFirstColumn && firstColumnName && !columnVariant[firstColumnName] && typeof out[firstColumnName] === 'string') {
      out[firstColumnName] = <strong>{out[firstColumnName]}</strong>;
    }
    return out;
  });

  // --- Separators ---
  const withSeparators = [];
  let lastSep = '';
  displayItems.forEach((item) => {
    const sepKey = item._sepKey || '';
    if (showSeparators && sepKey && sepKey !== lastSep) {
      withSeparators.push({ __separator: true, [safeHeaderList[0]]: sepKey.toUpperCase() });
      lastSep = sepKey;
    }
    withSeparators.push(item);
  });

  const selectStyle = {
    minWidth: '150px',
    padding: '8px 12px',
    borderRadius: '8px',
    border: '1px solid var(--border)',
    background: 'var(--background)',
    color: 'var(--text)',
  };

  return (
    <div className={className} style={style}>
      <div style={{ marginBottom: '0.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
        <input
          type="text"
          value={query}
          placeholder={searchPlaceholder}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Filter table rows"
          style={{ width: '100%', maxWidth: '420px', padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--text)' }}
        />
        <select
          value={selectedCategory}
          onChange={(e) => { setSelectedCategory(e.target.value); setSelectedNiche('All'); }}
          aria-label="Filter by category"
          style={selectStyle}
        >
          <option value="All">All categories</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        {nicheColumn && niches.length > 0 && (
          <select
            value={selectedNiche}
            onChange={(e) => setSelectedNiche(e.target.value)}
            aria-label="Filter by niche"
            style={selectStyle}
          >
            <option value="All">All {selectedCategory === 'All' ? 'niches' : selectedCategory}</option>
            {niches.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        )}
      </div>

      {typeof TableComponent === 'function' ? (
        <TableComponent
          tableTitle={tableTitle}
          headerList={safeHeaderList}
          itemsList={withSeparators}
          monospaceColumns={safeMonospaceColumns}
          columnWidths={columnWidths}
          showSeparators={showSeparators}
          margin={margin}
          {...rest}
        />
      ) : (
        <Warning>SearchTable requires a `TableComponent` prop.</Warning>
      )}
    </div>
  );
};
