export function apiRoutes(importer, arg2, arg3) {
  // localhost
  const loginAPI = "http://localhost:9002/api/login";
  const getJobsListAPI = `http://localhost:9002/api/${importer}/jobs/${
    arg2 || arg3
  }`;
  const getJobAPI = `http://localhost:9002/api/${importer}/job/${arg2 || arg3}`;
  const updateJobAPI = `http://localhost:9002/api/${importer}/updatejob/${
    arg2 || arg3
  }`;
  const addJobAPI = "http://localhost:9002/api/jobs/addJob";

  // server
  // const loginAPI = "https://exim.onrender.com/api/login";
  // const getJobsListAPI = `https://exim.onrender.com/api/${importer}/jobs/${
  //   arg2 || arg3
  // }`;
  // const getJobAPI = `https://exim.onrender.com/api/${importer}/job/${
  //   arg2 || arg3
  // }`;
  // const updateJobAPI = `https://exim.onrender.com/api/${importer}/updatejob/${
  //   arg2 || arg3
  // }`;
  // const addJobAPI = "https://exim.onrender.com/api/jobs/addJob";

  return { loginAPI, getJobsListAPI, getJobAPI, updateJobAPI, addJobAPI };
}
