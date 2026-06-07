import Svg, { Path, Rect } from "react-native-svg";

type IconProps = {
  color: string;
  size?: number;
};

export function CopyIcon({ color, size = 18 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x="9"
        y="9"
        width="11"
        height="11"
        rx="2.5"
        stroke={color}
        strokeWidth={1.6}
      />
      <Path
        d="M14.5 9V6.5C14.5 5.4 13.6 4.5 12.5 4.5H6.5C5.4 4.5 4.5 5.4 4.5 6.5V12.5C4.5 13.6 5.4 14.5 6.5 14.5H9"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
