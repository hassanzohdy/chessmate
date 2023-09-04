import styled from "@emotion/styled";

export const Square = styled.div`
  label: ChessSquare;
  width: 12.5%;
  height: 12.5%;
  position: relative;
  display: flex;
`;

export const WhiteSquare = styled(Square)`
  label: WhiteSquare;
  background-color: #f0d9b5;
`;

export const BlackSquare = styled(Square)`
  label: BlackSquare;
  background-color: #b58863;
`;
