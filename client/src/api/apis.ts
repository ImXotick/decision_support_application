import {
  AHPPostProps,
  PrometheePostProps,
  TopisPostProps,
  WSMPostProps,
} from "../types";
import api from "../api/api";

export const getCompanies = async () => {
  try {
    const res = await api.get("/api/companies/");
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getCriteria = async () => {
  try {
    const res = await api.get("/api/criteria/");
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getTopsisResults = async ({
  weights,
  switches,
  tables,
  companies,
}: TopisPostProps) => {
  try {
    const res = await api.post("/api/topsis/", {
      weights,
      switches,
      tables,
      companies,
    });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getWSMResults = async ({
  weights,
  tables,
  companies,
}: WSMPostProps) => {
  try {
    const res = await api.post("/api/wsm/", {
      weights,
      tables,
      companies,
    });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getPrometheeResults = async ({
  weights,
  switches,
  companies,
  criteria,
  prefParams,
  prefFunc,
}: PrometheePostProps) => {
  try {
    const res = await api.post("/api/promethee/", {
      weights,
      switches,
      companies,
      criteria,
      prefParams,
      prefFunc,
    });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAHPResults = async ({
  criteria,
  companies,
  tables,
}: AHPPostProps) => {
  try {
    const res = await api.post("/api/ahp/", { criteria, companies, tables });
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUserDetails = async () => {
  try {
    const res = await api.get("/api/user/");
    return res.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
