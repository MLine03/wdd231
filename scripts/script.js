// Sample course data
const courses = [
    { name: 'WDD 130', subject: 'Web', credits: 3, completed: true },
    { name: 'WDD 231', subject: 'Web', credits: 3, completed: false },
    { name: 'CIT 160', subject: 'Programming', credits: 3, completed: true },
    { name: 'CIT 230', subject: 'Design', credits: 3, completed: false }
  ];
  
  // Filter Buttons
  const filters = [...new Set(courses.map(course => course.subject))];
  const filtersContainer = document.getElementById('filters');
  
  filters.forEach(subject => {
    const button = document.createElement('button');
    button.textContent = subject;
    button.addEventListener('click', () => showCourses(subject));
    filtersContainer.appendChild(button);
  });
  
  // Display Courses by Subject
  const courseList = document.getElementById('course-list');
  const creditsDisplay = document.getElementById('total-credits');
  
  function showCourses(subject) {
    courseList.innerHTML = '';
    let total = 0;
  
    const filteredCourses = courses.filter(course => course.subject === subject);
  
    filteredCourses.forEach(course => {
      const li = document.createElement('li');
      li.textContent = `${course.name} (${course.credits} credits)`;
      if (course.completed) {
        li.style.fontWeight = 'bold';
        li.style.color = 'green';
      }
      courseList.appendChild(li);
      total += course.credits;
    });
  
    creditsDisplay.textContent = total;
  }
  
  // Footer Dynamic Year and Last Modified
  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('lastModified').textContent = document.lastModified;
  