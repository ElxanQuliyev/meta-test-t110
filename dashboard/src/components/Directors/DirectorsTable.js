import { Link } from "react-router-dom";


const DirectorsTable = ({ directors }) => {
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
          {directors.map((director) => (
            <tr key={director.id}>
              <td>
                <b>{director.name}</b>
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
                      to={`/director/${director.id}/edit`}
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

export default DirectorsTable;
