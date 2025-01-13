fetch("js/courses.json") // fetch gathers all info from the json
  .then((response) => { // .then tells what you want to do with this info. 
    if (!response.ok) { //if response is not ok, if there is error gathering info display error
      throw new Error(`Failed to load JSON: ${response.status}`);
    }
    return response.json();
  })
  .then((courses) => { //no error
    console.log("Fetched courses:", courses);
    const tableBody = document.querySelector("#timetable tbody"); 
    //tableBody represents tbody under the class timetable
    //function displays all courses on the screen
    function displayCourses(filteredCourses) { //argument called filtered courses
      tableBody.innerHTML = ""; //empty, want it to be empty so we can put in new info

      filteredCourses.forEach((course) => { //forEach filtered course, have a table row
        const row = document.createElement("tr");

        const courseCell = document.createElement("p");
        courseCell.textContent = course.title;

        const addButton = document.createElement("button");
        addButton.textContent = "Add Course";

        addButton.onclick = function () { //another way of adding event listener
          addSchedule(course);
        };

        const buttonDiv = document.createElement("td");
        buttonDiv.classList.add("course-container");
        buttonDiv.appendChild(courseCell);
        buttonDiv.appendChild(addButton);

        row.appendChild(buttonDiv);

        const code = document.createElement("td");
        code.textContent = course.course_code;
        row.appendChild(code);

        const enrollment = document.createElement("td");
        enrollment.innerHTML = `${course.enrollment_info.current} / ${course.enrollment_info.max} (${course.enrollment_info.percent_full})`;
        row.appendChild(enrollment);

        const instructor = document.createElement("td");
        instructor.textContent = course.instructor;
        row.appendChild(instructor);

        const location = document.createElement("td");
        location.textContent = course.location;
        row.appendChild(location);

        const days = document.createElement("td");
        days.textContent = course.days;
        row.appendChild(days);

        const timeCell = document.createElement("td");
        timeCell.textContent = course.time;
        row.appendChild(timeCell);

        tableBody.appendChild(row);
      });
    }
    displayCourses(courses);

    document
      .querySelector(".search-but")
      .addEventListener("click", function (event) {
        event.preventDefault();

        const query = document
          .getElementById("course-search-bar")
          .value.toLowerCase();

        const filteredCourses = courses.filter((course) => {
          return (
            course.course_code.toLowerCase().includes(query) ||
            course.title.toLowerCase().includes(query)
          );
        });

        if (query === "") {
          displayCourses(courses);
        } else {
          displayCourses(filteredCourses);
        }
      });
  })
  .catch((err) => console.error("Error loading courses", err)); //catch catches any errors that occur and displays it

function addSchedule(course) { //takes in argument of courses
  const selectedCourses = document.querySelector("#personal-schedule tbody"); //represents tbody under class personal schedule

  const row = document.createElement("tr");

  const courseCell = document.createElement("td");
  courseCell.textContent = course.title;

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove Course";

  const removeButtonCell = document.createElement("td");
  removeButton.textContent = "Remove Course";
  removeButton.addEventListener("click", () => removeCourse(row));
  removeButtonCell.classList.add("course-contatiner");
  removeButtonCell.appendChild(courseCell);
  removeButtonCell.appendChild(removeButton);

  row.appendChild(removeButtonCell);

  const codeCell = document.createElement("td");
  codeCell.textContent = course.course_code;
  row.appendChild(codeCell);

  const enrollmentCell = document.createElement("td");
  enrollmentCell.innerHTML = `${course.enrollment_info.current} / ${course.enrollment_info.max} (${course.enrollment_info.percent_full})`;
  row.appendChild(enrollmentCell);

  const instructorCell = document.createElement("td");
  instructorCell.textContent = course.instructor;
  row.appendChild(instructorCell);

  const locationCell = document.createElement("td");
  locationCell.textContent = course.location;
  row.appendChild(locationCell);

  const daysCell = document.createElement("td");
  daysCell.textContent = course.days;
  row.appendChild(daysCell);

  const timeCell = document.createElement("td");
  timeCell.textContent = course.time;
  row.appendChild(timeCell);

  selectedCourses.appendChild(row);
}

function removeCourse(course) {
  const tableBody = document.querySelector("#personal-schedule tbody");
  tableBody.removeChild(course);
}