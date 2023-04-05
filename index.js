// Your code here

function createEmployeeRecord(input){

    let employee = {
        firstName : input[0],
        familyName : input[1],
        title: input[2],
        payPerHour: input[3],
        timeInEvents: [],
        timeOutEvents: [],
    }

    return employee;
}

function createEmployeeRecords(inputArray){
      
   let groupArray=[];
   for(let element of inputArray){
    groupArray.push(createEmployeeRecord(element));
   }

   return groupArray;

}



function createTimeInEvent(record,date){

let timeIn={
  type: "TimeIn",
  hour: parseInt(date.slice(-4)),
  date: date.slice(0,10),
}

record["timeInEvents"].push(timeIn);
return record;
}

function createTimeOutEvent(record,date){

    let timeOut={
      type: "TimeOut",
      hour: parseInt(date.slice(-4)),
      date: date.slice(0,10),
    }
    
    record["timeOutEvents"].push(timeOut);
    return record;   
}

function hoursWorkedOnDate(record,date){
    
    let timeIn;
    let timeOut;

    record.timeInEvents.forEach(element => {
        if(element.date===date.slice(0,10)){
            timeIn= parseInt(element.hour)/100;
            timeIn= Math.trunc(timeIn);
        }
        
    });

    record.timeOutEvents.forEach(element => {
        if(element.date===date.slice(0,10)){
         timeOut= parseInt(element.hour)/100;
         timeOut= Math.trunc(timeOut);
        }
        
    });

   

    return  timeOut-timeIn;
}

function wagesEarnedOnDate(record,date){

    let totalTime=hoursWorkedOnDate(record,date);
    let wage=record.payPerHour*totalTime;
    return wage;

}



function allWagesFor(record){
    
    let dateArray = record.timeInEvents.map((object)=>{
       return object.date;
    })

    let total=0;
    for(let x of dateArray){
     total+=wagesEarnedOnDate(record,x);
    }

    return total;
}


function calculatePayroll(records){

   let totalPayroll = 0;
   for(let record of records){
    totalPayroll+=allWagesFor(record);
   }

   return totalPayroll;

}


//My Test For Functionality
 /*

let date="2023-05-05 0830";
let date2="2023-05-05 1530";
let date3="2023-05-06 0830";
let date4="2023-05-06 1130";

let timeOut={
    type: "TimeOut",
    hour: date2.slice(-4),
    date: date2.slice(0,10),
  }
  

let timeIn={
    type: "TimeIn",
    hour: date.slice(-4),
    date: date.slice(0,10),
  }

  let timeOut2={
    type: "TimeOut",
    hour: date4.slice(-4),
    date: date4.slice(0,10),
  }
  

let timeIn2={
    type: "TimeIn",
    hour: date3.slice(-4),
    date: date3.slice(0,10),
  }
  
let input=["Sam","Gichuhi","CEO",100];

  let employee = {
    firstName : input[0],
    familyName : input[1],
    title: input[2],
    payPerHour: input[3],
    timeInEvents: [timeIn,timeIn2],
    timeOutEvents: [timeOut, timeOut2],
}

let newDate="2023-05-05 0930";
console.log(hoursWorkedOnDate(employee,newDate));
console.log(wagesEarnedOnDate(employee,newDate));
console.log(allWagesFor(employee));

let all=[employee,employee,employee];

console.log(calculatePayroll(all));

*/