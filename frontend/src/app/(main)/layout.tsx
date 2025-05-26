interface IProps {
   children: React.ReactNode;
}

const layout = ({ children }: IProps) => {
   return <div>{children}</div>;
};

export default layout;
