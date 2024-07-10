// script.js
document.getElementById('postJobForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const jobTitle = document.getElementById('job-title').value;
    const company = document.getElementById('company').value;
    const location = document.getElementById('location').value;
    const description = document.getElementById('description').value;

    const jobContainer = document.createElement('div');
    jobContainer.classList.add('job');

    jobContainer.innerHTML = `
        <h3>${jobTitle}</h3>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p>${description}</p>
    `;

    document.getElementById('jobs').appendChild(jobContainer);

    document.getElementById('postJobForm').reset();
});
