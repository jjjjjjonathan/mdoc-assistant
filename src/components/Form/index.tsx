type Props = {
  children: string | JSX.Element | JSX.Element[];
};

const Form = ({ children }: Props) => {
  return <form action="">{children}</form>;
};

export default Form;
