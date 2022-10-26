import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import "antd/dist/antd.css";
import { useSelector, useDispatch } from "react-redux";
import {fetchCategories , CategoriesSelectors } from "../../store/categorySlice";
import navBar from "./NavBar.module.css"


export const NavBar = () => {
  const categories = useSelector(CategoriesSelectors);
 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  return (
    <Menu className={navBar.container} mode="inline" >
      {categories.map((item) => {
        return (
          <Menu.Item className={navBar.hover}  key={item.id}>
            <Link  to={item.id} key={item.id}>
              {item.label}
            </Link>
          </Menu.Item>
        );
      })}
    </Menu>
  );
};
