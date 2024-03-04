export const Arrows = (props: { fill: string }) => {
  return (
    <div className="flex flex-row">
      <svg
        width="11"
        height="6"
        viewBox="0 0 9 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.0907 3L6.72712 6L-2.86102e-05 3L6.72712 0L10.0907 3Z"
          fill={props.fill}
        />
      </svg>
      <svg
        width="100%"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="-mx-[0.5px] flex-1"
        preserveAspectRatio="xMinYMin"
      >
        <rect x="0" y="2.5" width="1000" height="1" fill={props.fill} />
      </svg>
      <svg
        width="11"
        height="6"
        viewBox="0 0 11 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 3L3.36358 0L10.0907 3L3.36358 6L0 3Z" fill={props.fill} />
      </svg>
    </div>
  );
};
