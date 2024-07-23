document.addEventListener('DOMContentLoaded', () => {
    const projectForm = document.getElementById('project-form');
    const projectNameInput = document.getElementById('project-name');
    const projectDescriptionInput = document.getElementById('project-description');
    const projectsList = document.getElementById('projects-list');

    let projects = [];

    projectForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const projectName = projectNameInput.value;
        const projectDescription = projectDescriptionInput.value;

        const project = {
            id: Date.now(),
            name: projectName,
            description: projectDescription,
            tasks: []
        };

        projects.push(project);
        renderProjects();

        projectNameInput.value = '';
        projectDescriptionInput.value = '';
    });

    const renderProjects = () => {
        projectsList.innerHTML = '';

        projects.forEach((project) => {
            const projectDiv = document.createElement('div');
            projectDiv.classList.add('project');

            projectDiv.innerHTML = `
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <div class="tasks">
                    <h4>Tasks</h4>
                    <ul>
                        ${project.tasks.map(task => `
                            <li>
                                ${task.title} - ${task.deadline} - ${task.status}
                            </li>
                        `).join('')}
                    </ul>
                    <form class="task-form" data-id="${project.id}">
                        <input type="text" placeholder="Task Title" required>
                        <input type="date" required>
                        <select>
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                        <button type="submit">Add Task</button>
                    </form>
                </div>
            `;

            const taskForm = projectDiv.querySelector('.task-form');
            taskForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const taskTitle = taskForm.querySelector('input[type="text"]').value;
                const taskDeadline = taskForm.querySelector('input[type="date"]').value;
                const taskStatus = taskForm.querySelector('select').value;

                const task = {
                    title: taskTitle,
                    deadline: taskDeadline,
                    status: taskStatus
                };

                const projectId = taskForm.getAttribute('data-id');
                const project = projects.find(p => p.id == projectId);
                project.tasks.push(task);
                renderProjects();
            });

            projectsList.appendChild(projectDiv);
        });
    };

    renderProjects();
});
