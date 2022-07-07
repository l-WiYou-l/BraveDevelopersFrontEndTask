import React from "react";
import type { NextPage } from 'next';
import styled from 'styled-components';
import Link from 'next/link';
import Image from "next/image";
import { useSpring, animated } from 'react-spring'
import { TOperator } from '../types/TOperator';
import defaultImg from "../public/err.jpg";
import { TMyLoaderArgs } from '../types/TMyLoaderArgs';

type THomeProps = {
  operators: TOperator[];
}

const CardOperator = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: whitesmoke;
  margin: 20px;
  width: 500px;
  max-width: 100%;
  background-color: rgb(67,65,65);
  height: 300px;
  font-size: 90px;
  font-weight:700;
  border-radius: 20px;
  @media (max-width: 600px) {
    margin: 20px 0;
  }
`;

const CardOperatorImageContainer = styled.div`
  @media (max-width: 600px) {
    padding: 0 25px;
  }
`;

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

const myLoader = ( { src } : TMyLoaderArgs) => src

const Home: NextPage<THomeProps> = ({operators}) => {

  const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 } , config: {duration: 2000} })

  return (
    <animated.div style={props}>
      <div className='operators__container'>
        {
          operators.map(operator => (
            <Link key={operator.id} href={`/${operator.id}`}>
              <CardOperator>
                <CardOperatorImageContainer>
                  <Image
                    loader={myLoader}
                    src={operator ? operator.imageSrc : defaultImg}
                    height='120'
                    width='400'
                    alt={operator ? operator.name : 'error'}
                    className='operator_image'
                  />
                </CardOperatorImageContainer>
              </CardOperator>
            </Link>)
          )
        }
      </div>
    </animated.div>
  )
}

export default Home
