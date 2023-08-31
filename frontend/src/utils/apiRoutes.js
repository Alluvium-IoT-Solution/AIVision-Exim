export function apiRoutes() {
  // localhost
  // const loginAPI = "http://localhost:9002/api/login";
  // const registerAPI = "http://localhost:9002/api/register";
  // const getJobsListAPI = `http://localhost:9002/api`;
  // const updateJobAPI = `http://localhost:9002/api`;
  // const addJobAPI = "http://localhost:9002/api/jobs/addJob";
  // const mainReportAPI = `http://localhost:9002/api/report`;
  // const importerListAPI = "http://localhost:9002/api/getImporterList";
  // const jobsOverviewAPI = "http://localhost:9002/api/getJobsOverview";
  // const importerJobsAPI = "http://localhost:9002/api/getImporterJobs";
  // const assignJobsAPI = "http://localhost:9002/api/assignJobs";
  // const getUsersAPI = "http://localhost:9002/api/getUsers";
  // const getUsersWithJobsAPI = "http://localhost:9002/api/getUsersWithJobs";
  // const updateJobsDateAPI = "http://localhost:9002/api/updateJobsDate";
  // const getLastJobsDateAPI = "http://localhost:9002/api/getLastJobsDate";
  // const importerListToAssignJobs =
  //   "http://localhost:9002/api/importerListToAssignJobs";
  // const getYearsAPI = "http://localhost:9002/api/getYears";
  // const removeUserAPI = "http://localhost:9002/api/remove-user";
  // const reportFieldsAPI = "http://localhost:9002/api/getReportFields";
  // const sendOtpAPI = "http://localhost:9002/api/sendOtp";
  // const getJobAPI = "http://localhost:9002/api/getJob";
  // const feedbackAPI="http://localhost:9002/api/feedback"

  /////////////////////////////////////////////////////////////////////////////////////////////////

  // server
  const loginAPI = "http://localhost:9002/api/login";
  const registerAPI = "http://localhost:9002/api/register";
  const getJobsListAPI = `http://localhost:9002/api`;
  const updateJobAPI = `http://localhost:9002/api`;
  const addJobAPI = "http://localhost:9002/api/jobs/addJob";
  const mainReportAPI = `http://localhost:9002/api/report`;
  const importerListAPI = "http://localhost:9002/api/getImporterList";
  const jobsOverviewAPI = "http://localhost:9002/api/getJobsOverview";
  const importerJobsAPI = "http://localhost:9002/api/getImporterJobs";
  const assignJobsAPI = "http://localhost:9002/api/assignJobs";
  const getUsersAPI = "http://localhost:9002/api/getUsers";
  const getUsersWithJobsAPI = "http://localhost:9002/api/getUsersWithJobs";
  const updateJobsDateAPI = "http://localhost:9002/api/updateJobsDate";
  const getLastJobsDateAPI = "http://localhost:9002/api/getLastJobsDate";
  const importerListToAssignJobs =
    "http://localhost:9002/api/importerListToAssignJobs";
  const getYearsAPI = "http://localhost:9002/api/getYears";
  const removeUserAPI = "http://localhost:9002/api/remove-user";
  const reportFieldsAPI = "http://localhost:9002/api/getReportFields";
  const sendOtpAPI = "http://localhost:9002/api/sendOtp";
  const getJobAPI = "http://localhost:9002/api/getJob";
  const feedbackAPI = "http://localhost:9002/api/feedback";

  return {
    loginAPI,
    registerAPI,
    getJobsListAPI,
    updateJobAPI,
    addJobAPI,
    mainReportAPI,
    importerListAPI,
    jobsOverviewAPI,
    importerJobsAPI,
    assignJobsAPI,
    getUsersAPI,
    getUsersWithJobsAPI,
    updateJobsDateAPI,
    getLastJobsDateAPI,
    importerListToAssignJobs,
    getYearsAPI,
    removeUserAPI,
    reportFieldsAPI,
    sendOtpAPI,
    getJobAPI,
    feedbackAPI,
  };
}
