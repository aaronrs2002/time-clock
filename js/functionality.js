
/*let [categories, setCategories] = useState([]);
let [totals, setTotals] = useState([]);
let [loaded, setLoaded] = useState(false);
let year = timeclockTimestamp(new Date()).substring(0, 4);
let month = timeclockTimestamp(new Date()).substring(5, 7);
let day = timeclockTimestamp(new Date()).substring(8, 10);
let [counter, setCounter] = useState([]);*/

let categories = [];
let totals = [];
let loaded = false;
let year = timeclockTimestamp(new Date()).substring(0, 4);
year = Number(year);
let month = timeclockTimestamp(new Date()).substring(5, 7);
month = Number(month);
let day = timeclockTimestamp(new Date()).substring(8, 10);
let counter = [];
let email = "";



const runEmail = () => {


    Validate(["email"]);
    if (document.querySelector(".error")) {
        globalAlert("alert-warning", "Please type in an email address.");
        return false;
    }
    let usingTicket = "";
    if (localStorage.getItem("activeTicket")) {
        if (localStorage.getItem("activeTicket") !== "default") {
            usingTicket = ":" + localStorage.getItem("activeTicket");
        }

    }
    return document.querySelector("[name='email']").value + usingTicket;
}

const populateTime = (data) => {
    let clockInOutHTML = "";
    for (let i = 0; i < data.length; i++) {


        if (data[i].timeOut !== "noTimeYet") {
            clockInOutHTML = clockInOutHTML + "<li class='list-group-item' >" + timeclockTimestamp(data[i].timeIn) + " - " + timeclockTimestamp(data[i].timeOut) + " Worked: " + ((((data[i].timeOut - data[i].timeIn) / 1000) / 60) / 60).toFixed(2) + " Hours</li>";
        } else {

            clockInOutHTML = clockInOutHTML + "<li class='list-group-item list-group-item-light' >" + timeclockTimestamp(data[i].timeIn) + " - Currently working.</li>";
        }
    }

    if (JSON.stringify(data).indexOf("noTimeYet") !== -1) {
        document.querySelector("[data-clock='in']").classList.add("hide");
        document.querySelector("[data-clock='out']").classList.remove("hide");
    }

    document.getElementById("clockInOutWindow").innerHTML = clockInOutHTML;
}

/*START CLOCK IN / CLOVL OUT*/


//const ClockInOut = (props) => {
/*  let [time, setTime] = useState("");
  let second = 0;
  let minute = 0;
  let hour = 0;
  let [runTimer, setRunTimer] = useState(true);
  let [loaded, setLoaded] = useState(false);
  let [timeClock, setTimeClock] = useState([]);
  let [clockedIn, setClockedIn] = useState(false);
  let [totalHours, setTotalHours] = useState(0);*/

let time = "";
let second = 0;
let minute = 0;
let hour = 0;
let runTimer = true;
//let timeClock = [];
let clockedIn = false;
let totalHours = 0;

const getTotal = (data) => {
    let tempTotal = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i].timeOut !== "noTimeYet") {
            tempTotal = Number(tempTotal) + Number(((((data[i].timeOut - data[i].timeIn) / 1000) / 60) / 60).toFixed(2));
        }
    }
    // setTotalHours((totalHours) => tempTotal);
    totalHours = tempTotal;
    [].forEach.call(document.querySelectorAll("[data-target='total']"), (e) => {
        e.innerHTML = tempTotal;
    });

}


const filterHours = () => {
    let email = runEmail();
    getTotal([]);
    // setTimeClock((timeClock) => []);
    //timeClock = [];
    let tempData = [];
    let filterVal = document.querySelector("input[name='filter']").value;
    const tempInOrOut = JSON.parse(localStorage.getItem(email + ":timeClock"));
    for (let i = 0; i < tempInOrOut.length; i++) {
        let dateStr = timeclockTimestamp(tempInOrOut[i].timeIn);
        if (dateStr.indexOf(filterVal) !== -1) {
            tempData.push(tempInOrOut[i]);
        }
    }
    getTotal(tempData);
    // setTimeClock((timeClock) => tempData);
    // timeClock = tempData;
    populateTime(tempData);
}








const addSecond = () => {

    if (runTimer !== false) {

        let tempSecond = Number(second);
        let tempMinute = Number(minute);
        let tempHour = Number(hour);
        tempSecond = second + 1;
        second = Number(second) + 1;
        if (tempSecond >= 60) {
            tempMinute = (Number(tempMinute) + 1);
            minute = tempMinute;
            tempSecond = 0;
            second = 0;
        }
        if (tempMinute >= 60) {
            tempHour = (Number(tempHour) + 1);
            hour = tempHour;
            tempMinute = 0;
            minute = 0;
        }
        if (tempSecond < 10) {
            tempSecond = "0" + tempSecond;
        }
        if (tempMinute < 10) {
            tempMinute = "0" + tempMinute;
        }
        if (tempHour < 10) {
            tempHour = "0" + tempHour;
        }
        //setTime((time) => tempHour + ":" + tempMinute + ":" + tempSecond); return false;
        time = tempHour + ":" + tempMinute + ":" + tempSecond;
        return false;
    } else {
        clearInterval(addSecond);
        return false;
    }


}



const startTimer = (trueFalse) => {
    if (runTimer !== false) {
        // setRunTimer((runTimer) => true);
        runTimer = true;
        setInterval(addSecond, 1000)
    } else {
        //  setTime((time) => "");
        time = "";
        //setRunTimer((runTimer) => false);
        runTimer = false;
        clearInterval(addSecond);
        console.log("TRIED TO STOP!");

        return false;
    }


}



/* useEffect(() => {
     if (loaded === false && props.email) {
         if (localStorage.getItem(props.email + ":timeClock")) {
             let tempData = JSON.parse(localStorage.getItem(props.email + ":timeClock"));
             getTotal(tempData);

             setTimeClock((timeClock) => tempData);
             if (tempData[tempData.length - 1].timeOut === "noTimeYet") {
                 setClockedIn((clockedIn) => true)
             }
         }
         setLoaded((loaded) => true);
     }
 });*/

//[{"timeIn":1648241326300,"timeOut":1648241591265}]





/*END CLOCK IN / CLOCK OUT*/


let monthList = document.querySelector("[name='dateEndMonth']").innerHTML;
for (let i = 1; i < 13; i++) {
    if (i < 10) {
        i = "0" + i;
    }
    monthList = monthList + "<option value=" + i + ">" + i + "</option>";
}
document.querySelector("[name='dateEndMonth']").innerHTML = monthList;

let yearHTML = "";
for (let i = (year - 1); i < (year + 2); i++) {
    yearHTML = yearHTML + "<option value='" + i + "'>" + i + "</option>";
}
document.querySelector("[name='dateEndYear']").innerHTML = yearHTML;
document.querySelector("[name='dateEndYear']").selectedIndex = 1;



const addUpDayTotals = (ym, inOrOut) => {


    email = runEmail();

    [].forEach.call(document.querySelectorAll(".showAtData"), (e) => {
        e.classList.remove("hide");
    })

    document.getElementById("inOutBts").classList.remove("hide");
    data = [];
    /* console.log("ym: " + ym + " - email: " + email)
     if (ym === "year") {
         data = JSON.parse(localStorage.getItem(email + ":timeClock"));
     } else {
         data = JSON.parse(localStorage.getItem(email + ":timeClock"));
     }*/
    data = JSON.parse(localStorage.getItem(email + ":timeClock"));

    /*let clockInOutHTML = "";
    for (let i = 0; i < data.length; i++) {


        if (data[i].timeOut !== "noTimeYet") {
            clockInOutHTML = clockInOutHTML + "<li class='list-group-item' >" + timeclockTimestamp(data[i].timeIn) + " - " + timeclockTimestamp(data[i].timeOut) + " Worked: " + ((((data[i].timeOut - data[i].timeIn) / 1000) / 60) / 60).toFixed(2) + " Hours</li>";
        } else {

            clockInOutHTML = clockInOutHTML + "<li class='list-group-item list-group-item-light' >" + timeclockTimestamp(data[i].timeIn) + " - Currently working.</li>";
        }
    }

    if (JSON.stringify(data).indexOf("noTimeYet") !== -1) {
        document.querySelector("[data-clock='in']").classList.add("hide");
        document.querySelector("[data-clock='out']").classList.remove("hide");
    }

    document.getElementById("clockInOutWindow").innerHTML = clockInOutHTML;*/
    populateTime(data);


    // console.log("JSON.stringify(data): " + JSON.stringify(data));
    let daysList = [];
    let daysTotal = [];
    let endDateYear = document.querySelector("[name='dateEndYear']").value;
    let endDateMonth = document.querySelector("[name='dateEndMonth']").value;
    const endDate = endDateYear + "-" + endDateMonth;
    try {


        for (let i = 0; i < data.length; i++) {
            if (endDate !== "default") {
                let dateHere = timeclockTimestamp(new Date(data[i].timeIn));
                dateHere = dateHere.toString();
                if (dateHere.indexOf(endDate) !== -1) {
                    dateHere = dateHere.toString().substring(0, 10)
                    // if (daysList.indexOf(dateHere) === -1) {
                    daysList.push(dateHere);
                    daysTotal.push(0);
                    // }
                }

                for (let i = 0; i < daysList.length; i++) {
                    for (let j = 0; j < data.length; j++) {
                        let dateHere = new Date(Number(data[j].timeIn));
                        dateHere = dateHere.toString();
                        let yrMoSelected = daysList[i].substring(0, 7);
                        if (data[j].timeOut !== "noTimeYet") {

                        }
                        if (data[j].timeOut !== "noTimeYet" && yrMoSelected === timeclockTimestamp(dateHere).substring(0, 7)) {
                            let tempNum = (daysTotal[i] + Number(((((data[i].timeOut - data[i].timeIn) / 1000) / 60) / 60).toFixed(2)))
                            daysTotal[i] = parseFloat(tempNum).toFixed(2);
                        }
                    }
                }

                if (JSON.stringify(data).indexOf("noTimeYet") !== -1) {
                    document.querySelector("[data-clock='out']").classList.remove("hide");
                    document.querySelector("[data-clock='in']").classList.add("hide");
                }
                //  setCategories((categories) => daysList);
                categories = daysList;
                //setTotals((totals) => daysTotal);
                totals = daysTotal;
                let graphTotalList = [];
                let tempTotal = 0;
                for (let i = 0; i < totals.length; i++) {
                    if (totals[i] !== 'NaN') {
                        tempTotal = Number(tempTotal) + Number(totals[i]);
                        graphTotalList.push(Number(totals[i]))
                    }

                }
                [].forEach.call(document.querySelectorAll("[data-target='total']"), (e) => {
                    e.innerHTML = tempTotal;
                });



            }


        }
        var options = {

            series: [{
                data: totals
                // data: [totals[0], totals[1], totals[2], totals[3], totals[4], totals[5], totals[6], totals[7], totals[8], totals[9], totals[10], totals[11], totals[12], totals[13], totals[14], totals[15], totals[16], totals[17], totals[18], totals[19], totals[20], totals[21], totals[22], totals[23], totals[24], totals[25], totals[26], totals[27]]
            }],
            chart: {
                type: 'bar',
                height: 430
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    dataLabels: {
                        position: 'top',
                    },
                }
            },
            dataLabels: {
                enabled: true,
                offsetX: -6,
                style: {
                    fontSize: '12px',
                    colors: ['#fff']
                }
            },
            stroke: {
                show: true,
                width: 1,
                colors: ['#fff']
            },
            tooltip: {
                shared: true,
                intersect: false
            },
            xaxis: {
                categories
            },
        };

        console.log("JSON.stringify(options): " + JSON.stringify(options));
        if (inOrOut !== "in") {
            document.querySelector("#chart").innerHTML = "<div class='loader'></div>";
            setTimeout(() => {
                document.querySelector("#chart").innerHTML = "";
                var chart = new ApexCharts(document.querySelector("#chart"), options);
                chart.render();
            }, 1000);

        }


    }

    catch (error) {
        globalAlert("alert-warning", "No data yet: " + error);
    }
}


const inOut = (inOrOut) => {

    email = runEmail()

    let tempInOrOut = [];
    if (inOrOut === "in") {

        document.querySelector("[data-clock='in']").classList.add("hide");
        document.querySelector("[data-clock='out']").classList.remove("hide");


        if (localStorage.getItem(email + ":timeClock")) {
            tempInOrOut = JSON.parse(localStorage.getItem(email + ":timeClock"));
            tempInOrOut.push({
                timeIn: Date.now(), timeOut: "noTimeYet"
            });
            localStorage.setItem(email + ":timeClock", JSON.stringify(tempInOrOut))
        } else {
            tempInOrOut = [{ timeIn: Date.now(), timeOut: "noTimeYet" }];
            localStorage.setItem(email + ":timeClock", JSON.stringify(tempInOrOut))
        }
        // setClockedIn((clockedIn) => true);
        clockedIn = true;
    } else {

        document.querySelector("[data-clock='in']").classList.remove("hide");
        document.querySelector("[data-clock='out']").classList.add("hide");
        if (localStorage.getItem(email + ":timeClock")) {
            tempInOrOut = JSON.parse(localStorage.getItem(email + ":timeClock"));
            getTotal(tempInOrOut);
            console.log("JSON.stringify(tempInOrOut): " + JSON.stringify(tempInOrOut));
            if (tempInOrOut[tempInOrOut.length - 1].timeOut === "noTimeYet") {
                tempInOrOut[tempInOrOut.length - 1].timeOut = Date.now();
            }

            localStorage.setItem(email + ":timeClock", JSON.stringify(tempInOrOut));
            setTimeout(() => {
                getTotal(tempInOrOut);
            }, 1000);
        }
        // setClockedIn((clockedIn) => false);
        clockedIn = false;

    }
    // setTimeClock((timeClock) => tempInOrOut);
    // timeClock = tempInOrOut;

    populateTime(tempInOrOut);

    addUpDayTotals(tempInOrOut, inOrOut);

}



/*useEffect(() => {
if (loaded === false && localStorage.getItem(email + ":timeClock")) {
    let tempCounter = [];

    for (let i = 1; i < 32; i++) {
        if (i < 10) {
            i = "0" + i;
        }
        tempCounter.push(i);
    }
    //setCounter((counter) => tempCounter);
    counter = tempCounter;
    setTimeout(() => {
        addUpDayTotals(JSON.parse(localStorage.getItem(email + ":timeClock")));
    }, 2000)

    //setLoaded((loaded) => true);
    loaded = true;

}
//})*/


buildTaskMenu();





const addTask = () => {
    document.getElementById("deleteBt").disabled = false;

    let taskValue = document.getElementById("taskTarget").value;
    if (taskValue === "default") {
        document.getElementById("deleteBt").disabled = true;
    }

    localStorage.setItem("activeTicket", taskValue);

}

localStorage.setItem("activeTicket", 'default');


function deleteTime() {

    let whichTime = document.getElementById("taskTarget").value;
    document.getElementById("taskTarget").classList.remove("error");
    if (whichTime === "default") {
        globalAlert("alert-warning", "Who are you deleting from the list?");
        document.getElementById("taskTarget").classList.add("error");
        return false;

    }
    let userEmail = document.querySelector("input[name='email']").value;
    document.querySelector("input[name='email']").classList.remove("error");
    if (userEmail === "") {
        globalAlert("alert-warning", "What/who are you deleting from the list?");
        document.querySelector("input[name='email']").classList.add("error");
        return false;

    }

    localStorage.removeItem(userEmail + ":" + whichTime + ":timeClock")
    toggle("");
    buildTaskMenu();
}