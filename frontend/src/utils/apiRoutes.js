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

  /////////////////////////////////////////////////////////////////////////////////////////////////

  // server
  const loginAPI = "http://65.0.204.84:9002/api/login";
  const registerAPI = "http://65.0.204.84:9002/api/register";
  const getJobsListAPI = `http://65.0.204.84:9002/api/${importer}/jobs/${
    arg2 || arg3
  }`;
  const getJobAPI = `http://65.0.204.84:9002/api/${importer}/job/${
    arg2 || arg3
  }`;
  const updateJobAPI = `http://65.0.204.84:9002/api/${importer}/updatejob/${
    arg2 || arg3
  }`;
  const addJobAPI = "http://65.0.204.84:9002/api/jobs/addJob";
  const mainReportAPI = "http://65.0.204.84:9002/api/report";
  const jobsOverviewAPI = "http://65.0.204.84:9002/api/getJobsOverview";
  const importerListAPI = "http://65.0.204.84:9002/api/getImporterList";
  const importerJobsAPI = "http://65.0.204.84:9002/api/getImporterJobs";
  const assignedImporterAPI = "http://65.0.204.84:9002/api/getAssignedImporter";
  const assignJobsAPI = "http://65.0.204.84:9002/api/assignJobs";
  const getUsersAPI = "http://65.0.204.84:9002/api/getUsers";

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
  };
}
