import styled from "styled-components";

export const SCButton = styled.button`
  background-color: black;
  border: none;
  color: white;
  padding: 15px 32px;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  height: 50px;
  width: 200px;
  margin-top: 15px;
  &:active {
    transition: all 0.9s ease 0s;
    background-color: #191919;
  }
`;