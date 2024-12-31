import styled from "styled-components";

export const GlassEffectDiv = styled.div`
  background: rgba(255, 255, 255, 0.1); /* Color de fondo semitransparente */
  border: 1px solid rgba(255, 255, 255, 0.2); /* Borde ligero para simular los bordes del vidrio */
  backdrop-filter: blur(25px); /* Desenfoque del fondo */
`;
