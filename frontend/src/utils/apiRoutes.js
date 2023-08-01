export function apiRoutes() {
  // localhost
  const loginAPI = "http://localhost:9002/api/login";
  const registerAPI = "http://localhost:9002/api/register";
  const getJobsListAPI = `http://localhost:9002/api`;
  const getJobAPI = `http://localhost:9002/api`;
  const updateJobAPI = `http://localhost:9002/api`;
  const addJobAPI = "http://localhost:9002/api/jobs/addJob";
  const mainReportAPI = `http://localhost:9002/api/report`;
  const importerListAPI = "http://localhost:9002/api/getImporterList";
  const jobsOverviewAPI = "http://localhost:9002/api/getJobsOverview";
  const importerJobsAPI = "http://localhost:9002/api/getImporterJobs";
  const assignedImporterAPI = "http://localhost:9002/api/getAssignedImporter";
  const assignJobsAPI = "http://localhost:9002/api/assignJobs";
  const getUsersAPI = "http://localhost:9002/api/getUsers";
  const updateJobsDateAPI = "http://localhost:9002/api/updateJobsDate";
  const getLastJobsDateAPI = "http://localhost:9002/api/getLastJobsDate";
  const importerListToAssignJobs =
    "http://localhost:9002/api/importerListToAssignJobs";
  const getYearsAPI = "http://localhost:9002/api/getYears";

  /////////////////////////////////////////////////////////////////////////////////////////////////

  // server
  // const loginAPI = "http://15.206.69.192:9002/api/login";
  // const registerAPI = "http://15.206.69.192:9002/api/register";
  // const getJobsListAPI = `http://15.206.69.192:9002/api/${importer}/jobs/${
  //   arg3 || arg4
  // }`;
  // const getJobAPI = `http://15.206.69.192:9002/api/${importer}/job/${
  //   arg3 || arg4
  // }`;
  // const updateJobAPI = `http://15.206.69.192:9002/api/${importer}/updatejob/${
  //   arg3 || arg4
  // }`;
  // const addJobAPI = "http://15.206.69.192:9002/api/jobs/addJob";
  // const mainReportAPI = "http://15.206.69.192:9002/api/report";
  // const jobsOverviewAPI = "http://15.206.69.192:9002/api/getJobsOverview";
  // const importerListAPI = "http://15.206.69.192:9002/api/getImporterList";
  // const importerJobsAPI = "http://15.206.69.192:9002/api/getImporterJobs";
  // const assignedImporterAPI =
  //   "http://15.206.69.192:9002/api/getAssignedImporter";
  // const assignJobsAPI = "http://15.206.69.192:9002/api/assignJobs";
  // const getUsersAPI = "http://15.206.69.192:9002/api/getUsers";
  // const updateJobsDateAPI = "http://15.206.69.192:9002/api/updateJobsDate";
  // const getLastJobsDateAPI = "http://15.206.69.192:9002/api/getLastJobsDate";
  // const importerListToAssignJobs='http://15.206.69.192:9002/api/importerListToAssignJobs';

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
    importerListToAssignJobs,
    getYearsAPI,
  };
}
