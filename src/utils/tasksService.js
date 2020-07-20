import tokenService from './tokenService';

const BASE_URL = '/api/tasks';

export function getAllTasks() {
    return fetch(BASE_URL, {
        headers: {
            'Authorization': `Bearer ${tokenService.getTokenFromLocalStorage()}`
        }
    }).then(allTasks => allTasks.json());
}

export function getAllChildTasks(parentTaskID = null) {
    return fetch(`${BASE_URL}/${parentTaskID}`, {
        headers: {
            'Authorization': `Bearer ${tokenService.getTokenFromLocalStorage()}`
        }
    }).then(allTasks => allTasks.json());
}

export function createTask(taskToCreate) {
    return fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${tokenService.getTokenFromLocalStorage()}`
        },
        body: JSON.stringify(taskToCreate)
    }).then(newTask => newTask.json());
}

export function deleteTask(taskID) {
    return fetch(`${BASE_URL}/${taskID}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${tokenService.getTokenFromLocalStorage()}`
        }
    }).then(deletedTask => deletedTask.json());
}

export function updateTask(taskToUpdate) {
    return fetch(`${BASE_URL}/${taskToUpdate._id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${tokenService.getTokenFromLocalStorage()}`
        },
        body: JSON.stringify(taskToUpdate)
    }).then(updatedTask => updatedTask.json());
}