import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Series from "./Series";
import { useDispatch, useSelector } from "react-redux";
import { listSerie } from "../../Redux/Actions/SerieAction";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { listPlatforms } from "../../Redux/Actions/PlatformActions";
import { listCatalogs } from "../../Redux/Actions/CatalogActions";
import { contentTypeList } from "../../Redux/Actions/ContentTypeActions";

const MainSeries = () => {

  const dispatch = useDispatch();

  const [platformId, setPlatformId] = useState("");
  const [catalogId, setCatalogId] = useState("");
  const [contentTypeId, setContentTypeId] = useState(null);

  const platformInfo = useSelector((state) => state.platformList);
  const contentTypeInfo = useSelector((state) => state.contentType);
  console.log(contentTypeInfo)
  const catalogInfo = useSelector((state) => state.catalogList);

  const { platforms } = platformInfo;
  const { catalogs } = catalogInfo;
  const { contentType } = contentTypeInfo;



  const serieList = useSelector((state) => state.serieList);
  const { loading, error, series } = serieList;
  const serieDelete = useSelector((state) => state.serieDelete);
  const { error: errorDelete, success: successDelete } = serieDelete;

  useEffect(() => {
    dispatch(listSerie({ lang: "AZ", platformId, catalogId ,contentTypeId}));
    dispatch(listPlatforms());
    dispatch(listCatalogs("AZ"));
    dispatch(contentTypeList("AZ"))
  }, [dispatch, successDelete,platformId,catalogId,contentTypeId]);
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Series</h2>
        <div>
          <Link to="/addSeries" className="btn btn-primary">
            Create new
          </Link>
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
      <header className="card-header bg-white ">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto ">
              <input
                type="search"
                placeholder="Search..."
                className="form-control p-2"
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select
                // defaultValue={}
                className="form-select"
                onChange={(e) => setContentTypeId(e.target.value)}
              >
                {/* <option value="">Content Type ...</option> */}
                {contentType &&
                  contentType.filter(c=>c.name!=="Film").map((p) => (
                    <option value={p.id} key={p.id}>
                      {p.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select
                defaultValue={""}
                className="form-select"
                onChange={(e) => setPlatformId(e.target.value)}
              >
                <option value="">Platform ...</option>
                {platforms &&
                  platforms.map((p) => (
                    <option value={p.id} key={p.id}>
                      {p.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
            <select
                defaultValue={""}
                className="form-select"
                onChange={(e) => setCatalogId(e.target.value)}
              >
                <option value="">Catalog ...</option>
                {catalogs &&
                  catalogs.map((p) => (
                    <option value={p.id} key={p.id}>
                      {p.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </header>

        <div className="card-body">
          {errorDelete && (
            <Message variant="alert-danger">{errorDelete}</Message>
          )}
          {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <div className="row">
              {/* Products */}
              {series.map((product) => (
                <Series serie={product} key={product.id} />
              ))}
            </div>
          )}

          <nav className="float-end mt-4" aria-label="Page navigation">
            <ul className="pagination">
              <li className="page-item disabled">
                <Link className="page-link" to="#">
                  Previous
                </Link>
              </li>
              <li className="page-item active">
                <Link className="page-link" to="#">
                  1
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  2
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  3
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  Next
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default MainSeries;
