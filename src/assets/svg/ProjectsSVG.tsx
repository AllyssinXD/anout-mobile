import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
const ProjectsSVG = ({ color, ...props }: any) => (
  <Svg
    fill={color}
    width="800px"
    height="800px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <G>
      <Path d="M2,9H9V2H2Zm9-7V9h7V2ZM2,18H9V11H2Zm9,0h7V11H11Z" />
    </G>
  </Svg>
);
export default ProjectsSVG;
