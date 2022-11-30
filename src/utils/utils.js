export const getErrorMessage = (error) => {
  if (error.response) {
    if (error.response.status === 401) {
      return "You are not authorized";
    }
    if (error.response.status === 404) {
      return "Resource not found";
    }
    if (error.response.status === 403) {
      return "You are blocked";
    }
    if (error.response.data) {
      return error.response.data.message;
    }
  }
};
