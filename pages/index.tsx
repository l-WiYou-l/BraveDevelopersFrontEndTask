import React from "react";
import type { NextPage } from 'next';
import { useSpring, animated } from 'react-spring'
import { TOperator } from "../types";
import Operators from "../components/Operators";

type THomeProps = {
  operators: TOperator[];
}

const Home: NextPage<THomeProps> = ({operators}) => {
  const props = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 } ,
    config: {duration: 2000}
  });

  return (
    <animated.div style={props}>
      <Operators operators={operators}/>
    </animated.div>
  )
};

export default Home

export const getStaticProps = async () => {
  try {
    const response = await fetch(`${process.env.API_HOST}/operators/`);
    const operators = await response.json();
    if (!operators) {
      return {
        notFound: true,
      }
    }
    return {
      props: { operators },
    }
  } catch (e) {
    return {
      props: { operators: [] }
    }
  }
}