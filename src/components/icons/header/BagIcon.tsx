import Svg, { Path } from "react-native-svg";

type IconProps = {
  color: string;
  size?: number;
};

export function BagIcon({ color, size = 20 }: IconProps) {
  // Source viewBox is 13 x 15 — keep that aspect ratio while scaling by `size`.
  const width = (13 / 15) * size;
  return (
    <Svg width={width} height={size} viewBox="0 0 13 15" fill="none">
      <Path
        d="M0.766667 2.81133C0.593571 3.04213 0.5 3.32284 0.5 3.61133V12.5C0.5 12.8536 0.640476 13.1928 0.890524 13.4428C1.14057 13.6929 1.47971 13.8333 1.83333 13.8333H11.1667C11.5203 13.8333 11.8594 13.6929 12.1095 13.4428C12.3595 13.1928 12.5 12.8536 12.5 12.5V3.61133C12.5 3.32284 12.4064 3.04213 12.2333 2.81133L10.9 1.03333C10.7758 0.867739 10.6148 0.733334 10.4296 0.640764C10.2445 0.548193 10.0403 0.5 9.83333 0.5H3.16667C2.95967 0.5 2.75552 0.548193 2.57038 0.640764C2.38524 0.733334 2.2242 0.867739 2.1 1.03333L0.766667 2.81133Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
