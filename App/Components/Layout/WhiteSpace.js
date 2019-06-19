import styled from 'styled-components/native';

const sizesInPixel = {
  sm: '10px',
  md: '15px',
  lg: '30px',
  xl: '60px',
  xxl: '180px',
};

const WhiteSpace = styled.View`
  height: ${p => sizesInPixel[p.size]};
  width: ${p => sizesInPixel[p.size]};
`;

export default WhiteSpace;