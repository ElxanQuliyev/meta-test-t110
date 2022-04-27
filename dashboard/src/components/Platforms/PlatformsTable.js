import { Link } from "react-router-dom";


const PlatformsTable = ({ platforms }) => {
  return (
    <div className="col-md-12 col-lg-8">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th className="text-end">Action</th>
          </tr>
        </thead>
        {/* Table Data */}
        <tbody>
          {platforms.map((platform) => (
            <tr key={platform.id}>
              <td>
                <b>{platform.name}</b>
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
                      to={`/platform/${platform.id}/edit`}
                    >
                      Edit info
                    </Link>
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

export default PlatformsTable;
