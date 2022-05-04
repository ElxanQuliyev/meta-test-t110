import React, { useEffect } from "react";
import CreateCategory from "./CreateCategory";
import CategoriesTable from "./CategoriesTable";
import { useDispatch, useSelector } from "react-redux";
import { editCategory, listCategories } from "../../Redux/Actions/CategoryActions";

const MainCategories = (props) => {
  const dispatch = useDispatch();
  const categoryId=props.categoryId??null;
  const categoryList = useSelector((state) => state.categoryList);
  const {  categories } = categoryList;
 const categoryEdit = useSelector((state) => state.categoryEdit);
  const {  category } = categoryEdit;
  useEffect(() => {
    if (categoryId !== null) {
      dispatch(editCategory(categoryId));
    }
  }, [categoryId, dispatch]);
  useEffect(() => {
    dispatch(listCategories("AZ"));
  }, [dispatch]);
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Categories</h2>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row">
            {/* Create category */}
            <CreateCategory category={category}/>
            {/* Categories table */}
            <CategoriesTable categories={categories}/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainCategories;
