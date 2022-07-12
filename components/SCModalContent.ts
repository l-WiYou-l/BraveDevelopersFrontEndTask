import styled from "styled-components";
import { TModalContentProps } from "../types/styles";

export const SCModalContent = styled.div<TModalContentProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(67, 65, 65);
  border: 2px solid rgb(0, 0, 0);
  box-shadow: rgb(0 0 0 / 20%) 0px 11px 15px -7px,
    rgb(0 0 0 / 14%) 0px 24px 38px 3px, rgb(0 0 0 / 12%) 0px 9px 46px 8px;
  padding: 32px;
  display: flex;
  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  border-radius: 20px;
  max-width: 100%;
`;