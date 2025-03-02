// function display_hour(){
//     today = Date.now();
//     hour = today.getHours();
//     minutes = today.getMinutes();
//     seconds = today.getSeconds();
//     return hour + ":" + minutes + ":" + seconds
// };

function display_hour(){
    let now = new Date();    
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    hours = hours.toString().padStart(2, "0");
    minutes = minutes.toString().padStart(2, "0");
    seconds = seconds.toString().padStart(2, "0");
    return (`Current time: ${hours}:${minutes}:${seconds}`);
}

let clock = display_hour();
console.log(clock);

