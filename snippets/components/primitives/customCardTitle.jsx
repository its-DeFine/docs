export const CustomCardTitle = ({ icon, title, style }) => {
  const titleStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.75rem',
    color: 'var(--hero-text)',
    fontSize: '1rem',
    fontWeight: 600,
    ...style,
  }
  return (
    <div style={titleStyle}>
      <Icon icon={icon} size={20} color="var(--accent)" />
      {title}
    </div>
  )
}
