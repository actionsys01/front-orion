import { Grid, Text } from "@geist-ui/react";
import styled from "styled-components";

export const Container = styled.div`
  padding: 10px;
`;
export const Titulo = styled(Text).attrs((props) => ({
  h6: true,
}))`
  margin: 0;
`;
