import { Col, Grid, Loading, Row } from "@geist-ui/react";

export default function PaginaCarregamento() {
  return (
    <Col
      style={{
        height: "100vh",
      }}
    >
      <Loading>Carregando</Loading>
    </Col>
  );
}
