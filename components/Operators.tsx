import React from 'react';
import Link from "next/link";
import { SCCardOperator } from "./SCCardOperator";
import Image from "next/image";
import defaultImg from "../public/err.jpg";
import { NextPage } from "next";
import { TMyLoaderArgs, TOperator } from "../types";
import { SCCardOperatorImageContainer } from "./SCCardOperatorImageContainer";

type THomeProps = {
  operators: TOperator[];
}

const myLoader = ( { src } : TMyLoaderArgs) => src

const Operators: NextPage<THomeProps> = ({ operators }) => {
  return (
      <div className='operators__container'>
        {
          operators.map(operator => (
            <Link key={operator.id} href={`/${operator.id}`} passHref={false}>
              <SCCardOperator>
                <SCCardOperatorImageContainer>
                  <Image
                    loader={myLoader}
                    src={operator ? operator.imageSrc : defaultImg}
                    height='120'
                    width='400'
                    alt={operator ? operator.name : 'error'}
                    className='operator_image'
                  />
                </SCCardOperatorImageContainer>
              </SCCardOperator>
            </Link>)
          )
        }
      </div>
  );
};



export default Operators;
