// Your code here
const createEmployeeRecord = (employee) => {
   return {
    firstName: employee[0],
    familyName: employee[1],
    title: employee[2],
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: []
}
}
const createEmployeeRecords = (employees) => {
    return employees.map(employee => createEmployeeRecord(employee))
}
const createTimeInEvent = (recordObj, dateTime) => {
    let [date, hour] = dateTime.split(' ')
    let eventObj = {
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    }
    recordObj.timeInEvents.push(eventObj)
   return recordObj;
}
const createTimeOutEvent = (recordObj, dateTime) => {
    let [date, hour] = dateTime.split(' ')
    let eventObj = {
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    }
    recordObj.timeOutEvents.push(eventObj)
    return recordObj;
}
const hoursWorkedOnDate = (recordObj, date) => {
    let timeIn = recordObj.timeInEvents.find((e) => e.date === date)
    let timeOut = recordObj.timeOutEvents.find((e) => e.date === date)
    return (timeOut.hour - timeIn.hour)/100
}
const wagesEarnedOnDate = (recordObj, date) => {
    let timeIn = recordObj.timeInEvents.find((e) => e.date === date)
    let timeOut = recordObj.timeOutEvents.find((e) => e.date === date)
    //console.log('TIME IN', timeIn)
    let workedHours = (timeOut.hour - timeIn.hour)/100
    let hourlyPay = recordObj.payPerHour
    return workedHours * hourlyPay
}

const allWagesFor = (recordObj) => {
    let timeIn = recordObj.timeInEvents.map((i) => wagesEarnedOnDate(recordObj,i.date)) 
    let pay = timeIn.reduce((acc, value ) => acc + value);
    
    return pay
}

const calculatePayroll = (recArr) => {
    let totalpay = recArr.map((rec) => allWagesFor(rec)) 
    let pay = totalpay.reduce((acc, value ) => acc + value);
    
    return pay
    
}