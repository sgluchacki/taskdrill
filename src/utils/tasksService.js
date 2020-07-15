const BASE_URL = '/api/tasks';

export function getAllTasks() {
  return fetch(BASE_URL)
  .then(allTasks => allTasks.json());
}

export function createTask(taskToCreate) {
    return fetch(BASE_URL, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(taskToCreate)
    }).then(newTask => newTask.json());
}

export function deleteTask(taskID) {
    return fetch(`${BASE_URL}/${taskID}`, {
        method: 'DELETE'
    }).then(deletedTask => deletedTask.json());
}

export function updateTask(taskToUpdate) {
    return fetch(`${BASE_URL}/${taskToUpdate._id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(taskToUpdate)
    }).then(updatedTask => updatedTask.json());
}