global.fetch = require("node-fetch");
require("dotenv").config();
const OrganizationService = require("../Services/OrganizationService");

exports.createOrganization = async (event) => {
  console.log("event", event);
  const data = JSON.parse(event.body);
  return await OrganizationService.createOrganization(data);
};

exports.getOrganizations = async (event) => {
  console.log("event", event);
  return await OrganizationService.getOrganizations();
};

exports.getOrganization = async (event) => {
  console.log("event", event);
  const filter = event.queryStringParameters.filter;
  return await OrganizationService.getOrganization(filter);
};

exports.updateOrganization = async (event) => {
  console.log("event", event);
  const Organization_id = event.queryStringParameters.Organization_id;
  const data = JSON.parse(event.body);
  return await OrganizationService.updateOrganization(Organization_id, data);
};

exports.deleteOrganization = async (event) => {
  console.log("event", event);
  const Organization_id = event.queryStringParameters.Organization_id;
  return await OrganizationService.deleteOrganization(Organization_id);
};
