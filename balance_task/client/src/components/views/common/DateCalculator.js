const calculateDate = (data, isTime) => {
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
  if(!isTime){
    return `${year}-${month}-${date}`;
  }else{
    const hours = current_date.getHours() >12 ? '오후 ' + current_date.getHours()%12 :'오전 '+current_date.getHours();
    let minutes = current_date.getMinutes();
    if(minutes.toString().length===1){
      minutes = "0" + minutes;
    }
    return `${year}-${month}-${date} ${hours}:${minutes}`;
  }
};
export default calculateDate;