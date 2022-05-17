export function getDate(timestamp){
    const date = new Date(+timestamp);
    const mount  = (date.getMonth()+1).toString().padStart(2,"0");
    const day = (date.getDate()).toString().padStart(2, "0");
    const hour = (date.getHours()).toString().padStart(2, "0");
    const minutes = (date.getMinutes()).toString().padStart(2, "0");

    const weekArr = ['星期天','星期一','星期二','星期三','星期四','星期五','星期天六'];
    const week = weekArr[date.getDay()];

    const str = `${date.getFullYear()}-${mount}-${day} ${hour}:${minutes} ${week}`;
    return str;
}
