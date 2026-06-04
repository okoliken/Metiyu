import Svg, { Path } from "react-native-svg";

type IconProps = {
  color: string;
  size?: number;
};

export function PaperclipIcon({ color, size = 12 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21.44 11.05L12.25 20.24C11.12 21.37 9.59 22 8 22C6.4 22 4.87 21.37 3.75 20.24C2.62 19.12 1.99 17.59 1.99 16C1.99 14.4 2.62 12.87 3.75 11.75L12.33 3.17C13.08 2.42 14.1 2 15.16 2C16.22 2 17.24 2.42 17.99 3.17C18.74 3.92 19.16 4.94 19.16 6C19.16 7.06 18.74 8.08 17.99 8.83L9.41 17.41C9.03 17.79 8.52 18 7.99 18C7.46 18 6.95 17.79 6.58 17.41C6.2 17.03 5.99 16.52 5.99 15.99C5.99 15.46 6.2 14.95 6.58 14.58L15.07 6.1"
        stroke={color}
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
