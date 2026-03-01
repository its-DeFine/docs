import { DynamicTable } from '/snippets/components/layout/table.jsx';

export const SearchTable = ({
  tableTitle = null,
  headerList = [],
  itemsList = [],
  monospaceColumns = [],
  margin,
  searchPlaceholder = 'Search...',
  searchColumns = []
}) => {
  const [query, setQuery] = useState('');
  const activeColumns = searchColumns.length ? searchColumns : headerList;
  const normalizedQuery = query.trim().toLowerCase();

  const filteredItems = !normalizedQuery
    ? itemsList
    : itemsList.filter((item) =>
        activeColumns.some((column) => {
          const value = item[column] ?? item[String(column).toLowerCase()] ?? '';
          return String(value).toLowerCase().includes(normalizedQuery);
        })
      );

  return (
    <div>
      <div style={{ marginBottom: '0.5rem' }}>
        <input
          type="text"
          value={query}
          placeholder={searchPlaceholder}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Filter table rows"
          style={{
            width: '100%',
            maxWidth: '420px',
            padding: '8px 12px',
            borderRadius: '8px',
            border: '1px solid var(--border)',
            background: 'var(--background)',
            color: 'var(--text)'
          }}
        />
      </div>

      <DynamicTable
        tableTitle={tableTitle}
        headerList={headerList}
        itemsList={filteredItems}
        monospaceColumns={monospaceColumns}
        margin={margin}
      />
    </div>
  );
};
