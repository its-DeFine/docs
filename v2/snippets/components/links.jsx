export const GotoLink = ({
  label,
  relativePath,
  text = '',
  icon = 'arrow-turn-down-right',
}) => {
  return (
    <span>
      <p style={{ marginRight: 8 }}>{text}</p>
      <Icon icon={icon} />
      <a href={relativePath} style={{ marginLeft: 6 }}>
        {label}
      </a>
    </span>
  )
}

export const GotoCard = ({ label, relativePath, icon, text, cta = '' }) => {
  icon = icon ? icon : 'arrow-turn-down-right'
  return (
    <Card title={label} icon={icon} href={relativePath} arrow cta={cta}>
      {text}
    </Card>
  )
}

export const DownloadLink = ({
  label = 'Download Transcript',
  icon = 'download',
  downloadLink,
  rightIcon = false,
}) => {
  console.log('dllink', downloadLink)
  downloadLink = downloadLink ? downloadLink : 'https://Livepeer.org'
  console.log('dllink2', downloadLink)
  return (
    <span>
      {!rightIcon && <Icon icon={icon} />}
      <a
        href={downloadLink}
        style={{
          marginRight: rightIcon ? 8 : 0,
          marginLeft: rightIcon ? 0 : 8,
        }}
      >
        {label}
      </a>
      {rightIcon && <Icon icon={icon} style={{ marginLeft: 8 }} />}
    </span>
  )
}
