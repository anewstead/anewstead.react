/* eslint-disable no-console */

import React, { useEffect, useState } from "react";

import { client, v1 } from "@datadog/datadog-api-client";

import type { ConfigurationParameters } from "@datadog/datadog-api-client/dist/packages/datadog-api-client-common/configuration";

const DD_API_TOKEN = import.meta.env.VITE_DD_API_KEY;
const DD_APP_TOKEN = import.meta.env.VITE_DD_APP_KEY;
const DD_SITE = import.meta.env.VITE_DD_SITE;

const configurationOpts: ConfigurationParameters = {
  authMethods: {
    apiKeyAuth: DD_API_TOKEN,
    appKeyAuth: DD_APP_TOKEN,
  },
};

const configuration = client.createConfiguration(configurationOpts);
configuration.setServerVariables({
  site: DD_SITE,
});

const dashboardParams: v1.DashboardsApiGetDashboardRequest = {
  dashboardId: "h5s-cic-6ea",
};

const dashboardAPI = new v1.DashboardsApi(configuration);

console.log(dashboardAPI);

const getDashboard = async () => {
  return dashboardAPI
    .getDashboard(dashboardParams)
    .then((data) => {
      console.log(`success: ${JSON.stringify(data)}`);
      return data;
    })
    .catch((err: ErrorEvent) => {
      console.error(err);
      throw new Error("Error fetching");
    });
};

export const DataDogExample = () => {
  const [dashboard, setDashboard] = useState<v1.Dashboard | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  useEffect(() => {
    getDashboard()
      .then((dashData) => {
        setDashboard(dashData);
      })
      .catch((err: ErrorEvent) => {
        setErrorMsg(err.message);
      });
  }, []);

  let content = <></>;
  if (errorMsg) {
    content = <div>{errorMsg}</div>;
  } else if (dashboard) {
    content = <div>{dashboard.title}</div>;
  }

  return content;
};
