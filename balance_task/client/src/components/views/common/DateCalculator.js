const calculateDate = (data) => {
  let current_date = new Date();
  if(data){
    current_date = new Date(data);
  }
  const year = current_date.getFullYear();
  const month =
    current_date.getMonth() + 1 < 10
      ? "0" + (current_date.getMonth() + 1)
      : current_date.getMonth() + 1;
  const date =
    current_date.getDate() < 10
      ? "0" + current_date.getDate()
      : current_date.getDate();
  return `${year}-${month}-${date}`;
};
export default calculateDate;