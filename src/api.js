import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      console.debug("MESSAGE: ", message);
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Signup a user
   *  - returns a token
  */
  static async signup(username, password, firstName, lastName, email) {
    let res = await this.request(
      "auth/register", 
      { username,
        password,
        firstName,
        lastName,
        email
      }, 
      "post"
    );
    return res.token;
  }

  /** Authenticate and login a user
   *  - returns a token
  */
  static async login(username, password) {
    try {
      let res = await this.request("auth/token", { username, password }, "post");
      return res.token;
    } catch (err) {
      console.error("ERR: ", err);
    }

  }

  /** Get a user by username */
  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`, {}, "get");
    return res.user;
  }

  /** Update user information */
  static async updateUserProfile(username, userData) {
    let res = await this.request(`users/${username}`, userData, "patch");
    return res.user;
  }

  /** Update userApplied for a specific user-job combo */

  static async applyToJob(username, jobId) {
    let jobAppStatus = await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
    return jobAppStatus;
  }

  /** Get a list of companies
   * Can filter by partial name (?name=<stringToMatch>)
   */

  static async getCompanies(name) {
    let res = await this.request("companies", { name }, "get");
    return res.companies;
  }

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    console.log("RES: ", res);
    return res.company;
  }

  /** Get a list of jobs
   * Can filter by partial job title (?name=<stringToMatch>)
   */
  
  static async getJobs(title) {
    let res = await this.request("jobs", { title });
    return res.jobs;
  }
}

export default JoblyApi;