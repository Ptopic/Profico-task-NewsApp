export const getTimeFromTimestamp = (timestamp: string) => {
   const date = new Date(timestamp);
   return date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
   });
};
