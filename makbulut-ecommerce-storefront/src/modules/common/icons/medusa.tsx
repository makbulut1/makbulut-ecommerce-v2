import React from "react"

import { IconProps } from "types/icon"

const Makbulut: React.FC<IconProps> = ({
  size = "20",
  color = "#9CA3AF",
  ...attributes
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      {...attributes}
    >
      <path
        d="M3 3H7L9 6L11 3H15V15H13V7L9 12L5 7V15H3V3Z"
        fill={color}
      />
    </svg>
  )
}

export default Makbulut
