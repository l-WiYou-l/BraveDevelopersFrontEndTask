import React, { useState } from "react";
import { useSpring, animated } from 'react-spring'
import { TGetServerSidePropsArgs } from "../types/api";
import { TOperator } from "../types";
import Snack from "../components/Snack";
import OperatorForm from "../components/OperatorForm";
import OperatorImage from "../components/OperatorImage";
import { SCButton } from "../components/SCButton";
import { SCModalContent } from "../components/SCModalContent";
import { AlertColor } from "@mui/material";

type TOperatorProps = {
  operator: TOperator
};

type TRouterState = {
  phoneValue: string;
  inputValue: number;
  phoneInputDirty: boolean;
  snackOpen: boolean;
  snackSeverity: AlertColor;
  snackAlertText: string;
};

const Operator = ({ operator }: TOperatorProps) => {
  const [state, setState] = useState<TRouterState>({
    phoneValue: "",
    inputValue: 1,
    phoneInputDirty: false,
    snackOpen: false,
    snackSeverity: 'error',
    snackAlertText: '',
  });

  const handleSubmit = () => {
    if (state.phoneValue.length === 11) {
      return new Promise((resolve, reject) => {
        setState(state=> ({
          ...state,
          snackOpen: true,
          snackSeverity: 'success',
          snackAlertText: 'Платеж выполнен успешно'}));
        setTimeout(() => {
          if (Math.random() < 0.5) {
            resolve([
              window.history.pushState({}, "", `/`),
              window.location.reload(),
            ]);
          } else {
            reject();
            setState(state => ({
              ...state,
              snackOpen: true,
              snackSeverity: 'error',
              snackAlertText: 'произошла ошибка во время оплаты пожалуйста попробуйте еще раз'
            }))
          }
        });
      });
    } else {
      setState(state => ({...state, phoneInputDirty:true}))
    }
  };

  const blurHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name == 'phone') {
      setState(state => ({ ...state, phoneInputDirty: true }))
    };
  };

  const handleSumInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const numberReg = /(?![0]).*^[0-9]*[.,]?[0-9]+$/g;
    const inputValueNumber = Number(value);

    if (numberReg.test(value) && inputValueNumber <= 1000) {
      setState(state => ({ ...state, inputValue: inputValueNumber }));
    }
  };

  const props = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: { duration: 2000 }
  });

  return (
    <animated.div style={props}>
      <div className="operator__container">
        <SCModalContent height={400} width={500}>
          <OperatorImage operator={ operator }/>
          <OperatorForm
            phoneValue={state.phoneValue}
            inputValue={state.inputValue}
            phoneInputDirty={state.phoneInputDirty}
            onChange={(phone:string) => {setState(state => ({...state, phoneValue: phone}))}}
            onSumInputChange={handleSumInputChange}
            onBlurHandler={blurHandler}
          />
          <SCButton onClick={handleSubmit}>Оплатить</SCButton>
        </SCModalContent>
      </div>
      <Snack
        isOpen={state.snackOpen}
        onClose={() => {setState(state => ({...state, snackOpen: false}))}}
        severity={state.snackSeverity}
      >
        {state.snackAlertText}
      </Snack>
    </animated.div>
  )
};

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
  };
};

export default Operator;
