const LatestNews = () => {
   return (
      <div
         className='flex max-h-[528px] flex-col gap-3 rounded-lg bg-white500 p-3'
         style={{ boxShadow: '0px 1px 2px -1px #c8cad1' }}
      >
         <div className='flex flex-row items-center gap-2'>
            <div className='flex size-[20px] items-center justify-center rounded-full bg-red500/25'>
               <div className='size-[10px] rounded-full bg-red500'></div>
            </div>
            <p className='font-medium leading-5'>Latest news</p>
         </div>
         <div className='flex flex-grow-0 flex-col gap-1 overflow-y-scroll'>
            <div className='h-[100px] w-full flex-shrink-0 bg-red500' />
            <div className='h-[100px] w-full flex-shrink-0 bg-red500' />
            <div className='h-[100px] w-full flex-shrink-0 bg-red500' />
            <div className='h-[100px] w-full flex-shrink-0 bg-red500' />
            <div className='h-[100px] w-full flex-shrink-0 bg-red500' />
            <div className='h-[100px] w-full flex-shrink-0 bg-red500' />
            <div className='h-[100px] w-full flex-shrink-0 bg-red500' />
         </div>
      </div>
   );
};

export default LatestNews;
