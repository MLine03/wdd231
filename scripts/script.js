// Sample course data
const courses = [
    { name: 'WDD 130', subject: 'Web', credits: 3, completed: true },
    { name: 'WDD 231', subject: 'Web', credits: 3, completed: false },
    { name: 'CIT 160', subject: 'Programming', credits: 3, completed: true },
    { name: 'CIT 230', subject: 'Design', credits: 3, completed: false }
  ];
  
  // Generate filter buttons
  const filtersContainer = document.getElementById('filters');
  const uniqueSubjects = [...new Set(courses.map(course => course.subject))];
  
  uniqueSubjects.forEach(subject => {
    const btn = document.createElement('button');
    btn.textContent = subject;
    btn.addEventListener('click', () => filterCourses(subject));
    filtersContainer.appendChild(btn);
  });
  
  const courseList = document.getElementById('course-list');
  const creditsDisplay = document.getElementById('total-credits');
  
  function filterCourses(subject) {
    courseList.innerHTML = '';
    const filtered = courses.filter(c => c.subject === subject);
    let total = 0;
  
    filtered.forEach(course => {
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
  
  // Footer dynamic content
  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('lastModified').textContent = document.lastModified;
  