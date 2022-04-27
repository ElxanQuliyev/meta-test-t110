import { Link } from "react-router-dom";


const PlatformRefsTable = ({ platformRefs }) => {
  console.log(platformRefs)
  return (
    <div className="col-md-12 col-lg-8">
      <table className="table">
        <thead>
          <tr>
            <th>Platform</th>
            <th>Catalog</th>
            <th>Type</th>
            <th className="text-end">Action</th>
          </tr>
        </thead>
        {/* Table Data */}
        <tbody>
          {platformRefs.map((platform) => (
            <tr key={platform.id}>
              <td>
                <b>{platform.platform}</b>
              </td>

              <td>
                <b>{platform.catalog_name}</b>
              </td>
              <td>
                <b>{platform.type_name}</b>
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
                    {/* <Link
                      className="dropdown-item"
                      to={`/platform-ref/${platform.id}/edit`}
                    >
                      Edit info
                    </Link> */}
                    {/* <Link className="dropdown-item text-danger" to="#">
                      Delete
                    </Link> */}
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

export default PlatformRefsTable;
