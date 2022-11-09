import { ALL_TEACHER, GET_EMPLOYEE_BY_ID, LAST_TEACHERS, UPDATE_EMPLOYEE } from "../endpoints";
import api from "../interceptor";

export const getAllTeachers = () => api.get(ALL_TEACHER)

export const getLastTeachers = () => api.get(LAST_TEACHERS)

export const getEmployeeById = (payload) => api.get(GET_EMPLOYEE_BY_ID(payload))

export const updateEmployeeById = (payload) => api.put(UPDATE_EMPLOYEE(payload))