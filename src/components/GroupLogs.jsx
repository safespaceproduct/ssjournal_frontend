import { getTime } from "./utils";

const GroupLogs = ({ group, date }) => {
  console.log(group);
  return (
    <div>
      <h2 className="journal-entry-box-header">{date}</h2>
      <div className="log-item">
        {group.map((entry) => (
          <div key={entry.id}>
            <h3>
              About My {entry.category}{" "}
              <span className="timeStyle">
                {getTime(entry.date_created)}
                <i className="fas fa-edit" style={{ float: "right" }}></i>
              </span>
            </h3>
            <p className="log-text">{entry.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupLogs;
