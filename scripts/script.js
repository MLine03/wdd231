// Example course data
const courses = [
    { name: 'WDD 130', subject: 'Web', credits: 3, completed: true },
    { name: 'WDD 231', subject: 'Web', credits: 3, completed: false },
    { name: 'CIT 160', subject: 'Programming', credits: 3, completed: true },
    { name: 'CIT 230', subject: 'Design', credits: 3, completed: false },
  ];
  
  // Generate course filters
  const filters = [...new Set(courses.map(course => course.subject))];
  const filtersContainer = document.getElementById('filters');
  filters.forEach(subject => {
    const button = document.createElement('button');
    button.textContent = subject;
    button.onclick = () => showCourses(subject);
    filtersContainer.appendChild(button);
  });
  
  // Show courses
  const list = document.getElementById('course-list');
  function showCourses(subject) {
    list.innerHTML = '';
    let total = 0;
  
    const filtered = courses.filter(course => course.subject === subject);
  
    filtered.forEach(course => {
      const li = document.createElement('li');
      li.textContent = `${course.name} (${course.credits} credits)`;
      if (course.completed) {
        li.style.fontWeight = 'bold';
        li.style.color = 'green';
      }
      list.appendChild(li);
      total += course.credits;
    });
  
    document.getElementById('total-credits').textContent = total;
  }
  
  // Footer Year and Last Modified
  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('lastModified').textContent = document.lastModified;
  