export const DiscordAnnouncements = () => {
  const announcements = [
    {
      id: "1463397885272920138",
      content: "📣 <strong>__The CloudSPE proposal is live.__</strong> 🗳️ 📣 <br /><br />The proposal funds Cloud SPE to build a focused MVP for standardized, publicly observable network performance, reliability, and demand metrics, making the network measurable and comparable while laying the groundwork for future SLA-aware routing and scaling.<br /><br />Vote Yes ✅ or No ❌ [here](https://explorer.livepeer.org/treasury/47675980806842999962173227987422002121354040219792725319563843023665050472833)",
      author: "AlisonWonderland",
      timestamp: "2026-01-19T18:27:40.785000+00:00",
      url: "https://discord.com/channels/423160867534929930/428351836609576972/1462876182298103963"
    },
    {
      id: "1463397844890288351",
      content: "📣 <strong>__Vote now on the Protocol R&amp;D SPE__</strong> 🗳️ 📣 <br /><br />All network value depends on protocol security. The proposal argues for a dedicated, continuously staffed function for protocol security, upgrades, and core improvements, replacing the current ad hoc model with a single accountable structure.<br /><br />Vote Yes ✅ or No ❌ [here](https://explorer.livepeer.org/treasury/67253869199932483234551664403036205881217777786063955710174984983936506090761)",
      author: "AlisonWonderland",
      timestamp: "2026-01-15T16:42:42.059000+00:00",
      url: "https://discord.com/channels/423160867534929930/428351836609576972/1461400212063916114"
    }
  ];

  return (
    <div className="discord-announcements">
      <div className="announcements-header">
        <h3>Latest Livepeer Announcements</h3>
        <p className="text-sm text-gray-600">From Discord</p>
      </div>
      <div className="announcements-list space-y-4 mt-4">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="announcement-card border rounded-lg p-4">
            <div className="announcement-meta flex items-center gap-2 text-sm text-gray-600 mb-2">
              <span className="font-semibold">{announcement.author}</span>
              <span>•</span>
              <time dateTime={announcement.timestamp}>
                {new Date(announcement.timestamp).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </time>
            </div>
            <div 
              className="announcement-content" 
              dangerouslySetInnerHTML={{ __html: announcement.content }}
            />
            <a 
              href={announcement.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-800 mt-2 inline-block"
            >
              View in Discord →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
