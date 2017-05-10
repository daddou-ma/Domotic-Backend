const mongoose		= require('mongoose')

let schedules = {}

let initSchedules = function() {
	let Schedule = mongoose.models.Schedule

	Schedule.find({time : {$gt : new Date()}})
	.then((doc) => {
		doc.map(addSchedule)
	})
	.catch((err) => {
		console.log('[Schedule.Handler] Problem in loading schedules !', err)
	})
}

let addSchedule = function(schedule) {
	schedules[schedule._id] = setTimeout(function() {
		executeSchedule(schedule)
	}, (schedule.time - new Date()))

	console.log('Schedule Created : ' + (schedule.time - new Date()), schedule)
}

let removeSchedule = function(id) {
	clearTimeout(schedules[id])
	delete schedules[id]

	console.log('Schedule Deleted : ' + id)
}


let executeSchedule = function(schedule) {
	schedule.executed = true
	schedule.save()
	.then((doc) => {
		console.log('Schedule Executed : ' + doc._id)
	})
	.catch((err) => {
		console.log('Error on schedule execution : ' + schedule._id, err)
	})
	
}

module.exports = {
	initSchedules,
	addSchedule,
	removeSchedule,
	executeSchedule
}