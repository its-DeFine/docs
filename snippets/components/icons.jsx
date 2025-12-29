export const LivepeerSVG = ({ size = 24, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="none"
      {...props}
    >
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M.017.377v71.028h71.027V.377H.017Zm130.355 82.72v71.028H201.4V83.097h-71.028Zm130.6 153.28v-71.028H332v71.028h-71.028Zm-130.6 12.185v71.028H201.4v-71.028h-71.028ZM.017 402.31v-71.027h71.027v71.027H.017Zm0-236.492v71.028h71.027v-71.028H.017Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export const LivepeerIcon = ({ ...props }) => {
  return (
    <Icon icon="/snippets/assets/Livepeer-Logo-Symbol-Light.svg" {...props} />
  );
};

export const LivepeerIconFlipped = ({ ...props }) => {
  return (
    <span style={{ display: "inline-block", transform: "scaleX(-1)" }}>
      <Icon icon="/snippets/assets/Livepeer-Logo-Symbol-Light.svg" {...props} />
    </span>
  );
};
