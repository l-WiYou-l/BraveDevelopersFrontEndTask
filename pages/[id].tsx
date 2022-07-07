import styled from "styled-components";
import PhoneInput from "react-phone-input-2";
import Image from 'next/image'
import React, { useState } from "react";
import { useSpring, animated } from 'react-spring'
import { TOperator } from '../types/TOperator';
import {TGetServerSidePropsArgs} from "../types/TGetServerSidePropsArgs";
import defaultImg from "../public/err.jpg"
import { TMyLoaderArgs } from "../types/TMyLoaderArgs";

type TModalContentProps = {
  height: number;
  width: number;
}

type TOperatorProps = {
  operator: TOperator
}

type TRouterState = {
  phoneValue: string;
  inputValue: number;
}

const ModalContent = styled.div<TModalContentProps>`
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

const Button = styled.button`
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

const Operator = ({ operator }: TOperatorProps) => {
  const [state, setState] = useState<TRouterState>({
    phoneValue: "",
    inputValue: 1,
  });

  const handleSumInputChange = (event:  React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const numberReg = /(?![0]).*^[0-9]*[.,]?[0-9]+$/g;
    const inputValueNumber = Number(value);

    if (numberReg.test(value) && inputValueNumber <= 1000) {
      setState({ ...state, inputValue: inputValueNumber });
    }
  };

  const handleSubmit = () => {
    if (state.phoneValue.length === 11) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() < 0.5) {
            resolve([
              alert("Операция выполнена успешно"),
              window.history.pushState({}, "", `/`),
              window.location.reload(),
            ]);
          } else {
            reject(alert("Операция не выполнена"));
          }
        }, 1000);
      });
    }
  };

  const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } , config: {duration: 2000} })

  const myLoader = ({ src }: TMyLoaderArgs) => src

  return (
    <>
      <animated.div style={props}>
        <div className="operator__container">
          <ModalContent height={350} width={500}>
            <Image
              loader={myLoader}
              src={operator ? operator.imageSrc : defaultImg }
              height='120'
              width='400'
              alt={operator ? operator.name : 'error'}
              className='operator_image'
            />
            <div>
              <div>
                <PhoneInput
                  country={"ru"}
                  value={state.phoneValue}
                  onChange={(phone) => {
                    setState({ ...state, phoneValue: phone });
                  }}
                />
              </div>
              <label className='special-label'>Сумма</label>
              <input
                onChange={handleSumInputChange}
                value={state.inputValue}
              />
            </div>
            <div>
              <Button onClick={handleSubmit}>Оплатить</Button>
            </div>
          </ModalContent>
        </div>
      </animated.div>
    </>
  );
}

export const getServerSideProps = async ({ params }: TGetServerSidePropsArgs) => {
  try {
    const response = await fetch(
      `${process.env.API_HOST}/operators/${params.id}`
    );
    const operator = await response.json();

    return {
      props: { operator },
    };
  } catch (e) {
    return {
      props: { operator: null }
    }
  }
}
export default Operator;
