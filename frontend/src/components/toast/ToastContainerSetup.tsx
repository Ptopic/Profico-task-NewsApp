import { Slide, ToastContainer } from 'react-toastify';

const ToastContainerSetup = () => {
  return (
    <ToastContainer
      position='bottom-center'
      closeButton={false}
      autoClose={2500}
      transition={Slide}
      hideProgressBar={true}
      toastClassName={() => 'p-0 w-[80%] md:w-[640px]'}
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    />
  );
};

export default ToastContainerSetup;
