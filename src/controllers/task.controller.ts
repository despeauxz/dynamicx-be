import { Response } from "../utils";
import { createTask, deleteTask, handleCheckTask, listTask, handleTaskUpdate } from "../services/task.service";

const addTask = async (req, res) => {
    const { title, startTime } = req.body;
    const { id } = req;
    const task = await createTask({
        title,
        checked: false
    }, id);

    return Response.success(res, "Task created successfully", task);
}

const listAllTasks = async (req, res) => {
    const { id } = req;
    const { page = 1, limit = 10 } = req.query;
    const { tasks, count } = await listTask(id, page, limit);
    return Response.success(res, "Tasks fetched successfully!", {
        data: tasks,
        pagination: {
            totalItems: count,
            totalPages: Math.ceil(count / limit),
            currentPage: Number(page),
            nextPage: (Number(page) * Number(limit)) < count ? Number(page) + 1 : null,
            previousPage: Number(page) !== 1 ? Number(page) - 1 : null,
            hasNextPage: (Number(page) * Number(limit)) < count,
            hasPreviousPage: Number(page) != 1
        }
    });
}

const toggleTaskCompletion = async (req, res) => {
    const taskId = +req.params.id;
    const newTask = await handleCheckTask(taskId);
    return Response.success(res, "Tasks updated successfully!", newTask);
}

const handleUppate = async (req, res) => {
    const taskId = +req.params.id;
    const { title } = req.body
    const newTask = await handleTaskUpdate(taskId, title);
    return Response.success(res, "Tasks updated successfully!", newTask);
}

const handleDelete = async (req, res) => {
    const taskId = +req.params.id;
    await deleteTask(taskId);
    return Response.success(res, "Tasks deleted successfully!", {});
}

export {
    addTask,
    handleUppate,
    listAllTasks,
    handleDelete,
    toggleTaskCompletion
};
