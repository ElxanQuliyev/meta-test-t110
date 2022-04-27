import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editCatalog, listCatalogs } from "../../Redux/Actions/CatalogActions";
import CreateCatalog from "./CreateCatalog";
import CatalogsTable from "./CatalogsTable";

const MainCatalog = (props) => {
  const dispatch = useDispatch();
  const catalogId=props.catalogId??null;
  const catalogList = useSelector((state) => state.catalogList);
  const { loading, error, catalogs } = catalogList;
 const catalogEdit = useSelector((state) => state.catalogEdit);
  const {  catalog } = catalogEdit;
  useEffect(() => {
    if (catalogId !== null) {
      dispatch(editCatalog(catalogId));
    }
  }, [catalogId, dispatch]);
  useEffect(() => {
    dispatch(listCatalogs("AZ"));
  }, [dispatch]);
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Catalogs</h2>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row">
            {/* Create catalog */}
            <CreateCatalog catalog={catalog}/>
            {/* Catalogs table */}
            <CatalogsTable catalogs={catalogs}/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainCatalog;
