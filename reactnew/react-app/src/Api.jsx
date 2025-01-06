export default function Api() {
  function sendRequest(params) {
    return fetch("http://localhost:5000", params);
  }

  function getAllItems() {
    return sendRequest();
  }

  function insertItem(item) {
    const params = {
      mode: "cors",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        item: item,
      }),
    };
    return sendRequest(params);
  }

  function deleteItem(item) {
    const params = {
      mode: "cors",
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: item.id,
      }),
    };
    return sendRequest(params);
  }

  function updateItem(id, newItem) {
    const params = {
      mode: "cors",
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        item: newItem,
      }),
    };
    return sendRequest(params);
  }

  return { getAllItems, insertItem, deleteItem, updateItem };
}
