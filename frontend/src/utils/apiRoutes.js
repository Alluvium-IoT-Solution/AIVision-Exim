export function apiRoutes(importer, arg2, arg3) {
  // localhost
  // const loginAPI = "http://localhost:9002/api/login";
  // const getJobsListAPI = `http://localhost:9002/api/${importer}/jobs/${
  //   arg2 || arg3
  // }`;
  // const getJobAPI = `http://localhost:9002/api/${importer}/job/${arg2 || arg3}`;
  // const updateJobAPI = `http://localhost:9002/api/${importer}/updatejob/${
  //   arg2 || arg3
  // }`;
  // const addJobAPI = "http://localhost:9002/api/jobs/addJob";
  // const mainReportAPI = "http://localhost:9002/api/report";

  /////////////////////////////////////////////////////////////////////////////////////////////////

  // // server
  const loginAPI = "http://65.0.72.99:9002/api/login";
  const getJobsListAPI = `http://65.0.72.99:9002/api/${importer}/jobs/${
    arg2 || arg3
  }`;
  const getJobAPI = `http://65.0.72.99:9002/api/${importer}/job/${
    arg2 || arg3
  }`;
  const updateJobAPI = `http://65.0.72.99:9002/api/${importer}/updatejob/${
    arg2 || arg3
  }`;
  const addJobAPI = "http://65.0.72.99:9002/api/jobs/addJob";
  const mainReportAPI = "http://65.0.72.99:9002/api/report";

  /////////////////////////////////////////////////////////////////////////////////////////////////

  // test
  // const loginAPI = "http://52.66.41.49:9002/api/login";
  // const getJobsListAPI = `http://52.66.41.49:9002/api/${importer}/jobs/${
  //   arg2 || arg3
  // }`;
  // const getJobAPI = `http://52.66.41.49:9002/api/${importer}/job/${
  //   arg2 || arg3
  // }`;
  // const updateJobAPI = `http://52.66.41.49:9002/api/${importer}/updatejob/${
  //   arg2 || arg3
  // }`;
  // const addJobAPI = "http://52.66.41.49:9002/api/jobs/addJob";
  // const mainReportAPI = "http://52.66.41.49:9002/api/report";

  return {
    loginAPI,
    getJobsListAPI,
    getJobAPI,
    updateJobAPI,
    addJobAPI,
    mainReportAPI,
  };
}
