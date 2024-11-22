import { Task } from "../entity/Task";
import { userService } from ".";
import { AppDataSource } from "../data-source"; 

const createTask = async (taskData, id) => {
    const user = await userService.getOneUser({ id });
  
    const taskRepo = AppDataSource.getRepository(Task);
    let task = taskRepo.create({ ...taskData, user });
    task = await taskRepo.save(task);
  
    return task;
  }
  
  const listTask = async (id, page: number, limit: number) => {
    const taskRepo = AppDataSource.getRepository(Task);
    const count = await taskRepo.count({
      relations: { user: true },
      where: {
        user: {
          id
        }
      },
    });
    const tasks = await taskRepo.find({
      skip: (page - 1) * limit,
      take: limit,
      relations: { user: true },
      where: {
        user: {
          id
        }
      },
    });
  
    return { tasks, count };
  }

  const handleTaskUpdate = async (taskId, title)  => {
    const taskRepo = AppDataSource.getRepository(Task);
    let task = await taskRepo.findOneBy({ id: taskId });
  
    task = await taskRepo.save({
      ...task,
      title
    });
  
    return task;
  }
  
  const handleCheckTask = async (taskId)  => {
    const taskRepo = AppDataSource.getRepository(Task);
    let task = await taskRepo.findOneBy({ id: taskId });
  
    task = await taskRepo.save({
      ...task,
      checked: !task!.checked
    });
  
    return task;
  }
  
  const deleteTask = async (taskId) => {
    const taskRepo = AppDataSource.getRepository(Task);
    const task = await taskRepo.findOneBy({ id: taskId });
    await taskRepo.remove(task!);
  }
  
  export {
    createTask,
    listTask,
    handleTaskUpdate,
    handleCheckTask,
    deleteTask
  }
