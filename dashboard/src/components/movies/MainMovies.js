import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Movies from "./Movies";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../Redux/Actions/ProductActions";
import { listPlatforms } from "../../Redux/Actions/PlatformActions";

import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import { listCatalogs } from "../../Redux/Actions/CatalogActions";

const MainMovies = () => {
  const [platformId, setPlatformId] = useState("");
  const [catalogId, setCatalogId] = useState("");

  const platformInfo = useSelector((state) => state.platformList);
  const catalogInfo = useSelector((state) => state.catalogList);


  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const productDelete = useSelector((state) => state.productDelete);
  const { error: errorDelete, success: successDelete } = productDelete;
  const { platforms } = platformInfo;
  const { catalogs } = catalogInfo;

  useEffect(() => {
    dispatch(listProducts({ lang: "AZ", platformId, catalogId }));
    dispatch(listPlatforms());
    dispatch(listCatalogs("AZ"));

  }, [dispatch, successDelete, platformId,catalogId]);
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Movies</h2>
        <div>
          <Link to="/addMovie" className="btn btn-primary">
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
              {products.map((product) => (
                <Movies product={product} key={product.id} />
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

export default MainMovies;
