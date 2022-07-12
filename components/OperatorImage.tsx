import React from 'react';
import defaultImg from "../public/err.jpg";
import Image from "next/image";
import { TMyLoaderArgs, TOperator } from "../types";

type TOperatorImageProps = {
  operator: TOperator
}

const OperatorImage = ({  operator  }: TOperatorImageProps) => {

  const myLoader = ({ src }: TMyLoaderArgs) => src

  return (
    <div>
      <Image
        loader={myLoader}
        src={operator ? operator.imageSrc : defaultImg }
        height='120'
        width='400'
        alt={operator ? operator.name : 'error'}
        className='operator_image'
      />
    </div>
  );
};

export default OperatorImage;
