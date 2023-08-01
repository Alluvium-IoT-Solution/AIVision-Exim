export function apiRoutes() {
  // localhost
  // const loginAPI = "http://localhost:9002/api/login";
  // const registerAPI = "http://localhost:9002/api/register";
  // const getJobsListAPI = `http://localhost:9002/api`;
  // const getJobAPI = `http://localhost:9002/api`;
  // const updateJobAPI = `http://localhost:9002/api`;
  // const addJobAPI = "http://localhost:9002/api/jobs/addJob";
  // const mainReportAPI = `http://localhost:9002/api/report`;
  // const importerListAPI = "http://localhost:9002/api/getImporterList";
  // const jobsOverviewAPI = "http://localhost:9002/api/getJobsOverview";
  // const importerJobsAPI = "http://localhost:9002/api/getImporterJobs";
  // const assignedImporterAPI = "http://localhost:9002/api/getAssignedImporter";
  // const assignJobsAPI = "http://localhost:9002/api/assignJobs";
  // const getUsersAPI = "http://localhost:9002/api/getUsers";
  // const updateJobsDateAPI = "http://localhost:9002/api/updateJobsDate";
  // const getLastJobsDateAPI = "http://localhost:9002/api/getLastJobsDate";
  // const importerListToAssignJobs =
  //   "http://localhost:9002/api/importerListToAssignJobs";
  // const getYearsAPI = "http://localhost:9002/api/getYears";

  /////////////////////////////////////////////////////////////////////////////////////////////////

  // server
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
