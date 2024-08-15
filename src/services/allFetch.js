export const wait = (duration) => {
  return new Promise(resolve => setTimeout(resolve, duration))
};

export const getPostsData = async () => {
  try {
    const response = await fetch("http://localhost:5000/tasks")

    if (!response.ok) {
      throw new Error(`Response status: ${response.status} \n Status text: ${response.statusText} \n Url: ${response.url}`);
    }

    return response.json();

  } catch (error) {
    console.log(error)
  }
}

export const addNewPostsData = async (inputDataNewPost) => {
  try {
    const response = await fetch("http://127.0.0.1:5000/tasks", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: inputDataNewPost,
        is_urgent: 0,
        importance_id: "1",
      })
    })

    if (!response.ok) {
      throw new Error(`Response status: ${response.status} \n Status text: ${response.statusText} \n Url: ${response.url}`);
    };

    return response;

  } catch (error) {

    console.log(error);
  }
}

export const deletePostData = async (taskId) => {
  try {
    const response = await fetch(`http://127.0.0.1:5000/tasks/${taskId}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status} \n Status text: ${response.statusText} \n Url: ${response.url}`);
    };

    return response

  } catch (error) {
    console.error("deletePostData()", error);
  }
}
