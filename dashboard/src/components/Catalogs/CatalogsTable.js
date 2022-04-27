import { Link } from "react-router-dom";

const CatalogsTable = ({ catalogs }) => {
  // const dispatch = useDispatch();
  // const [categoryId, setCategoryId] = useState(null);

  // const categoryEdit = useSelector((state) => state.categoryEdit);

  // const { loading, error, category } = categoryEdit;
  // useEffect(() => {
  //   if (categoryId !== null) {
  //     dispatch(editCategory(categoryId));
  //   }
  // }, [categoryId, dispatch]);
  // const handleChangeCategoryId = (e, id) => {
  //   e.preventDefault();
  //   setCategoryId(id);
  // };
  // const history=useHistory();
  return (
    <div className="col-md-12 col-lg-8">
      {/* {error && <Message variant="alert-danger">{error}</Message>}
      {loading && <Loading />} */}
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th className="text-end">Action</th>
          </tr>
        </thead>
        {/* Table Data */}
        <tbody>
          {catalogs.map((cate) => (
            <tr key={cate.id}>
              <td>
                <b>{cate.name}</b>
              </td>

              <td className="text-end">
                <div className="dropdown">
                  <Link
                    to="#"
                    data-bs-toggle="dropdown"
                    className="btn btn-light"
                  >
                    <i className="fas fa-ellipsis-h"></i>
                  </Link>
                  <div className="dropdown-menu">
                    <Link
                      className="dropdown-item"
                      to={`/catalog/${cate.id}/edit`}
                    >
                      Edit info
                    </Link>
                    <Link className="dropdown-item text-danger" to="#">
                      Delete
                    </Link>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CatalogsTable;
