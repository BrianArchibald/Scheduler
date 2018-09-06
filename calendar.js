//getting the events from the DB
let meetings = scheduler.getEvents();
//gets date and times of first event in array
let startDate = meetings[0].start_date;
let endDate = meetings[0].end_date;