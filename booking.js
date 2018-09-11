		

		var config = {
			apiKey: "AIzaSyDJFbbPR1n6if3yX1giV8KvW_Pyq88aBKk",
			authDomain: "calendar-c07dd.firebaseapp.com",
			databaseURL: "https://calendar-c07dd.firebaseio.com",
			projectId: "calendar-c07dd",
			storageBucket: "calendar-c07dd.appspot.com",
			messagingSenderId: "1041934999578"
		};
		firebase.initializeApp(config);
		// Initialize Cloud Firestore through Firebase
		var db = firebase.firestore();
		db.settings({ timestampsInSnapshots: true });

		db.collection("events").get().then(function (data) {
			data.forEach(function (doc) {
				// doc.data() is never undefined for query doc snapshots

			console.log(doc.data().end_date.toDate());
			console.log(doc.data().end_date.toDate().getMonth(), "month");
			console.log(doc.data().end_date.toDate().getYear(), "year");
			console.log(doc.data().end_date.toDate().getDay(), "end day - this isn't correct");
			console.log(doc.data().start_date.toDate().getDay(), "start day - this isn't correct");
			console.log(doc.data().end_date.toDate().getMinutes(), "mins");
			console.log(doc.data().end_date.toDate().getHours(), "hours");
			console.log(doc.data().start_date.toDate().getMinutes(), "start mins");
			console.log(doc.data().start_date.toDate().getHours(), "start hours");


			// const meetingTimes = [];
			// meetingTimes.push(doc.data().end_date.toDate().getYear());
			// meetingTimes.push(doc.data().end_date.toDate().getMonth());
			// meetingTimes.push(doc.data().start_date.toDate().getDay());
			// meetingTimes.push(doc.data().start_date.toDate().getMinutes());
			// meetingTimes.push(doc.data().start_date.toDate().getHours());
			// meetingTimes.push(doc.data().end_date.toDate().getDay());
			// meetingTimes.push(doc.data().end_date.toDate().getMinutes());
			// meetingTimes.push(doc.data().end_date.toDate().getHours());

			// console.log(meetingTimes);



				/// using where to get only db collection that meet certain criteria
				// going to add a click event to the day button,
				// and use "this", then with click event run the function below with .where
				// dont need array above, use below to populate HTML on page.  
				// where date == click event date ex..

				db.collection("events").where("capital", "==", true)
    			.get()
    			.then(function(querySnapshot) {
        		querySnapshot.forEach(function(doc) {
            	// doc.data() is never undefined for query doc snapshots
           		 console.log(doc.id, " => ", doc.data());
        		});
    		})
    			.catch(function(error) {
        		console.log("Error getting documents: ", error);
    		});






			});

		});

			const dayCalendar = document.getElementById('booking-calendar');
			//const dayButtons = document.getElementsByClassName('booking-day');
			const timeButtons = document.getElementsByClassName('booking-time');

			dayCalendar.addEventListener('click', dayBtnClicked);
			

			function dayBtnClicked (event) {
				console.log("clicked");
				console.log(event.target);	
			}
		
			// get the current date/time
			let today = new Date(),
				locale = "en-us",
				mm = today.toLocaleString(locale, {month: "short"});
			let dd = today.getDate();
			//let mm = today.getMonth()+1; 
			let yyyy = today.getFullYear();
			let weekday = today.getDay();

			// if(dd<10) {
			//     dd = '0'+dd
			// } 
			// if(mm<10) {
			//     mm = '0'+mm
			// } 
			today = mm + '/' + dd + '/' + yyyy;
			console.log("today is " + today + " and it is " + weekday);



			// load the days of the week onload to current week

			let weekHtml = "";

			//run weekHtml 7 times to populate the week calendar


			weekHtml +=
				`
				<div class="booking-day">
					<div class="booking-day-title">Mon</div>
						<button class="booking-day-button">
							<div class="booking-day-button-month">${mm}</div>
							<div class="booking-day-dayOfMonth">${dd}</div>
						</button>
				</div>
				`
