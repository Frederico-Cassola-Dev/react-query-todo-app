export const wait = (duration) => {
  return new Promise(resolve => setTimeout(resolve, duration))
};

export const getTaskData = async (pageNumber) => {
  try {
    const response = await fetch("http://localhost:8000/api.php/tasks");

    if (!response.ok) {
      const data = await response.json();
      const error = {
        status: 'error',
        message: data.error,
        code: response.status,
      };
      throw new Error(JSON.stringify(error));
    }

    return response.json();

  } catch (error) {
    console.log(error)
  }
}

export const addTaskData = async (inputDataAddTask) => {
  try {
    const response = await fetch("http://localhost:8000/api.php/tasks", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: inputDataAddTask,
        is_urgent: 0,
        importance_id: "1",
        action: "addTask"
      })
    })

    if (!response.ok) {
      const data = await response.json();
      const error = {
        status: 'error',
        message: data.message,
        code: response.status,
      };
      throw new Error(JSON.stringify(error));
    };

    const data = await response.json();

    // INFO: This data return is taken from the useMutation when the fetch is successful
    return data;

  } catch (error) {
    throw error;
  }
}

export const deleteTaskData = async (taskId) => {
  try {
    const response = await fetch(`http://localhost:8000/api.php/tasks/${taskId}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      const data = await response.json();
      const error = {
        status: 'error',
        message: data.error,
        code: response.status,
      };
      throw new Error(JSON.stringify(error));
    }
    console.log(response)

    const data = await response.json();

    // INFO: The data return is taken from the useMutation after the fetch is successful
    return data;
  } catch (error) {
    // Re-throw the error for the useDeleteTask to handle
    throw error;
  }
}

export const getPageData = async (pageNumber) => {
  try {
    const response = await fetch(`http://localhost:8000/api.php/tasks`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pageNumber: pageNumber,
        action: "getPage"
      })
    })

    if (!response.ok) {
      const error = {
        status: "error",
        message: "Change Page Error",
        code: response.status,
      };
      throw new Error(JSON.stringify(error));
    }

    const data = await response.json();
    // INFO: The data return is taken from the useMutation after the fetch is successful
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

