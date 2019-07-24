import React from "react";
import PropTypes from "prop-types";

const Icon = props => {
  const styles = {
    svg: {
      display: "inline-block",
      verticalAlign: "middle"
    },
    path: {
      fill: props.color || "currentColor"
    }
  };

  return (
    <svg
      style={styles.svg}
      width={`${props.size}px`}
      height={`${props.size}px`}
      viewBox={`0 0 1024 1024`}
      className={props.className}
    >
      <path style={styles.path} d={props.icon} />
    </svg>
  );
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string
};

Icon.defaultProps = {
  size: 24
};

export default Icon;
