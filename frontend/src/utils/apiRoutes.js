export function apiRoutes(importer, arg2, arg3) {
  // localhost
  // const loginAPI = "http://localhost:9002/api/login";
  // const registerAPI = "http://localhost:9002/api/register";
  // const getJobsListAPI = `http://localhost:9002/api/${importer}/jobs/${
  //   arg2 || arg3
  // }`;
  // const getJobAPI = `http://localhost:9002/api/${importer}/job/${arg2 || arg3}`;
  // const updateJobAPI = `http://localhost:9002/api/${importer}/updatejob/${
  //   arg2 || arg3
  // }`;
  // const addJobAPI = "http://localhost:9002/api/jobs/addJob";
  // const mainReportAPI = "http://localhost:9002/api/report";
  // const importerListAPI = "http://localhost:9002/api/getImporterList";
  // const jobsOverviewAPI = "http://localhost:9002/api/getJobsOverview";
  // const importerJobsAPI = "http://localhost:9002/api/getImporterJobs";
  // const assignedImporterAPI = "http://localhost:9002/api/getAssignedImporter";
  // const assignJobsAPI = "http://localhost:9002/api/assignJobs";
  // const getUsersAPI = "http://localhost:9002/api/getUsers";
  // const updateJobsDateAPI = "http://localhost:9002/api/updateJobsDate";
  // const getLastJobsDateAPI = "http://localhost:9002/api/getLastJobsDate";

  /////////////////////////////////////////////////////////////////////////////////////////////////

  // server
  const loginAPI = "http://172.31.46.220:9002/api/login";
  const registerAPI = "http://172.31.46.220:9002/api/register";
  const getJobsListAPI = `http://172.31.46.220:9002/api/${importer}/jobs/${
    arg2 || arg3
  }`;
  const getJobAPI = `http://172.31.46.220:9002/api/${importer}/job/${
    arg2 || arg3
  }`;
  const updateJobAPI = `http://172.31.46.220:9002/api/${importer}/updatejob/${
    arg2 || arg3
  }`;
  const addJobAPI = "http://172.31.46.220:9002/api/jobs/addJob";
  const mainReportAPI = "http://172.31.46.220:9002/api/report";
  const jobsOverviewAPI = "http://172.31.46.220:9002/api/getJobsOverview";
  const importerListAPI = "http://172.31.46.220:9002/api/getImporterList";
  const importerJobsAPI = "http://172.31.46.220:9002/api/getImporterJobs";
  const assignedImporterAPI =
    "http://172.31.46.220:9002/api/getAssignedImporter";
  const assignJobsAPI = "http://172.31.46.220:9002/api/assignJobs";
  const getUsersAPI = "http://172.31.46.220:9002/api/getUsers";
  const updateJobsDateAPI = "http://172.31.46.220:9002/api/updateJobsDate";
  const getLastJobsDateAPI = "http://172.31.46.220:9002/api/getLastJobsDate";

  return {
    loginAPI,
    registerAPI,
    getJobsListAPI,
    getJobAPI,
    updateJobAPI,
    addJobAPI,
    mainReportAPI,
    importerListAPI,
    jobsOverviewAPI,
    importerJobsAPI,
    assignedImporterAPI,
    assignJobsAPI,
    getUsersAPI,
    updateJobsDateAPI,
    getLastJobsDateAPI,
  };
}
