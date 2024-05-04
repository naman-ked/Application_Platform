import React from "react";

export default function TextWithEllipsis(props) {
  const { fontSize, fontWeight, color, children, style } = props;
  return (
    <div style={{ display: "flex" }}>
      <div style={{ minWidth: 0, flex: 1 }}>
        <p
          style={{
            fontWeight: fontWeight ? fontWeight : 400,
            fontSize: fontSize ? fontSize : 18,
            color: color ? color : "#000",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            margin: "1px",
            ...style,
          }}
        >
          {children}
        </p>
      </div>
    </div>
  );
}
