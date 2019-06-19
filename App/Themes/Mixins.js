import { css } from 'styled-components/native';

export const marginMixin = css`
  margin-top: ${p => (p.mt ? `${p.mt}px` : 0)};
  margin-bottom: ${p => (p.mb ? `${p.mb}px` : 0)};
  margin-left: ${p => (p.ml ? `${p.ml}px` : 0)};
  margin-right: ${p => (p.mr ? `${p.mr}px` : 0)};
`;

export const paddingMixin = css`
  padding-top: ${p => (p.pt ? `${p.pt}px` : 0)};
  padding-bottom: ${p => (p.pb ? `${p.pb}px` : 0)};
  padding-left: ${p => (p.pl ? `${p.pl}px` : 0)};
  padding-right: ${p => (p.pr ? `${p.pr}px` : 0)};
  ${p => (p.p ? `padding: ${p.p}px;` : null)};
`;