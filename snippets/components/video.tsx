export type videoProps = Record<string, any>;
// TODO: Deconstruct to change icon props. Only render icon if passed in.
export const YouTubeVideo = ({ embedUrl, title, hint, caption }) => {
  return (
    <Frame
      {...(hint ? { hint } : {})}
      {...(caption
        ? {
            caption: (
              <span style={{ display: 'flex', alignItems: 'center' }}>
                <Icon icon="microphone" color="grey" />
                <span style={{ marginLeft: 8 }}>{caption}</span>
              </span>
            ),
          }
        : {})}
    >
      <iframe
        className="w-full aspect-video rounded-xl"
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </Frame>
  )
}

//Self-hosted video
// ;<video
//   autoPlay
//   playsInline
//   controls
//   className="w-full aspect-video rounded-xl"
//   src="https://www.youtube.com/watch?v=9yLIPZ4iBLw"
// ></video>

// ;<div className="custom-caption">
//   <Icon icon="microphone" /> {title}
// </div>
// <Frame caption={title} hint="hint"></Frame>

export const CardVideo = ({ embedUrl, title }) => {
  console.log('Props:', { embedUrl, title }) // Add this
  return (
    <Card>
      <iframe
        className="w-full aspect-video rounded-xl"
        style={{ aspectRatio: '16/9' }}
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <span className="flex items-center justify-center">
        <Icon icon="microphone" color="grey" />
        <span className="ml-2" color="gray">
          {title}
        </span>
      </span>
    </Card>
  )
}
