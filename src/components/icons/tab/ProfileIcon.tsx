import Svg, { Path } from "react-native-svg";

type TabIconProps = {
  color: string;
  size?: number;
};

export function ProfileIcon({ color, size = 16 }: TabIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <Path
        d="M12 13.3335C12 12.2726 11.5786 11.2552 10.8284 10.5051C10.0783 9.75492 9.06087 9.3335 8 9.3335C6.93913 9.3335 5.92172 9.75492 5.17157 10.5051C4.42143 11.2552 4 12.2726 4 13.3335"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.00004 9.33333C9.4728 9.33333 10.6667 8.13943 10.6667 6.66667C10.6667 5.19391 9.4728 4 8.00004 4C6.52728 4 5.33337 5.19391 5.33337 6.66667C5.33337 8.13943 6.52728 9.33333 8.00004 9.33333Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.00004 14.6668C11.6819 14.6668 14.6667 11.6821 14.6667 8.00016C14.6667 4.31826 11.6819 1.3335 8.00004 1.3335C4.31814 1.3335 1.33337 4.31826 1.33337 8.00016C1.33337 11.6821 4.31814 14.6668 8.00004 14.6668Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
