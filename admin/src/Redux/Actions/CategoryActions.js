import React from 'react';
import request from '../../utils/request';
import {
  CATEGORY_ADD_FAIL,
  CATEGORY_ADD_REQUEST,
  CATEGORY_ADD_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_FAIL,
  CATEGORY_REQUEST,
  CATEGORY_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_SUCCESS,
  UPDATE_WHEN_ADD_CATEGORY_SUCCESS,
  UPDATE_WHEN_DELETE_CATEGORY_SUCCESS,
} from '../Constants/CategoryConstants';

export const ListCategory =
  (level = 2) =>
  async (dispatch) => {
    try {
      dispatch({ type: CATEGORY_REQUEST });

      const { data } = await request.get(`/categories`, { params: { level: level } });
      dispatch({ type: CATEGORY_SUCCESS, payload: data.data?.categories || [] });
    } catch (error) {
      dispatch({
        type: CATEGORY_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
    }
  };

export const FetchCategoriesTree = () => async (dispatch) => {
  try {
    dispatch({ type: CATEGORY_REQUEST });
    const { data } = await request.get('/categories/get-category-tree');
    dispatch({ type: CATEGORY_SUCCESS, payload: data?.data?.categories || [] });
  } catch (error) {
    dispatch({
      type: CATEGORY_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const DeleteCategory =
  ({ id, statusDeleteCategory }) =>
  async (dispatch) => {
    try {
      dispatch({ type: CATEGORY_DELETE_REQUEST });

      const { data } = await request.delete(`/categories/${id}`);
      dispatch({ type: CATEGORY_DELETE_SUCCESS, payload: data });
      dispatch({ type: UPDATE_WHEN_DELETE_CATEGORY_SUCCESS, payload: id });
      statusDeleteCategory.success();
    } catch (error) {
      const message = error.response && error.response.data.message ? error.response.data.message : error.message;
      dispatch({
        type: CATEGORY_DELETE_FAIL,
        payload: message,
      });
      statusDeleteCategory.error(message);
    } finally {
      statusDeleteCategory.finally();
    }
  };

export const AddCategory =
  ({ category = { level: 1, name: '', description: '' }, createCategoryStatus }) =>
  async (dispatch) => {
    try {
      dispatch({ type: CATEGORY_ADD_REQUEST });

      const { data } = await request.post(`/categories`, category);
      dispatch({ type: CATEGORY_ADD_SUCCESS, payload: data });
      dispatch({ type: UPDATE_WHEN_ADD_CATEGORY_SUCCESS, payload: data?.data?.newCategory });

      createCategoryStatus.success();
    } catch (error) {
      const message = error.response && error.response.data.message ? error.response.data.message : error.message;
      dispatch({
        type: CATEGORY_ADD_FAIL,
        payload: message,
      });
      createCategoryStatus.error(message);
    } finally {
      createCategoryStatus.finally();
    }
  };
export const UpdateCategory =
  ({ id, category, updateCategoryStatus }) =>
  async (dispatch) => {
    try {
      dispatch({ type: CATEGORY_UPDATE_REQUEST });

      const { data } = await request.put(`/categories/${id}`, category);
      dispatch({ type: CATEGORY_UPDATE_SUCCESS, payload: data });
      updateCategoryStatus.success();
    } catch (error) {
      const message = error.response && error.response.data.message ? error.response.data.message : error.message;
      dispatch({
        type: CATEGORY_UPDATE_FAIL,
        payload: message,
      });
      updateCategoryStatus.error(message);
    } finally {
      updateCategoryStatus.finally();
    }
  };
