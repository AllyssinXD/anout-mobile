import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
const UserSVG = ({ color, ...props }: any) => (
  <Svg
    fill={color}
    width="800px"
    height="800px"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <G>
      <Path d="M10.31,9.12H5.5A4.52,4.52,0,0,0,1,13.62,2.34,2.34,0,0,0,1,14H14.78a2.34,2.34,0,0,0,0-.38A4.51,4.51,0,0,0,10.31,9.12ZM8,7.88A3.94,3.94,0,1,0,4.06,3.94,3.94,3.94,0,0,0,8,7.88Z" />
    </G>
  </Svg>
);
export default UserSVG;
