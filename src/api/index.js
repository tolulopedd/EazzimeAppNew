
import {
    ServiceApi,
    routes,
    UserApi,
    AuthenticationApi,
    AuthenticateToken,
  } from "./config";
export const adminLogout = async (body) =>
    AuthenticationApi.post(routes.logout, body);