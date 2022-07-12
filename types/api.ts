export type TResponseOperatorsData = {
  id: number;
  name: string;
  imageSrc: string;
}

export type TGetServerSidePropsArgs = {
  params: {
    id: number;
  };
}