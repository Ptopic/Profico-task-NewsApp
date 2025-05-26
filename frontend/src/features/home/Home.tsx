const HomePage = () => {
   return (
      <div>
         <nav className='news-gradient fixed left-0 top-0 z-30 flex h-[60px] w-full items-center justify-between px-[11vw]'>
            <div className='flex flex-row items-center gap-10'>
               <p className='text-white500 font-bold leading-[21px]'>
                  Make MyNews your homepage
               </p>
               <p className='text-white500 text-sm font-[300] leading-[21px]'>
                  Every day discover what’s trending on the internet!
               </p>
            </div>
            <div className='flex flex-row items-center gap-6'>
               <button className='text-white500 text-sm font-bold leading-5'>
                  No, thanks
               </button>
               <button className='text-black600 bg-white500 h-[40px] w-[60px] rounded-lg text-sm font-bold leading-5'>
                  Get
               </button>
            </div>
         </nav>
      </div>
   );
};

export default HomePage;
