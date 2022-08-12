import "../../../../node_modules/bootstrap/dist/css/bootstrap.css";
import Table from "react-bootstrap/Table";
import "../StudentCss/StudentView.css"
function CreateResultTable(props) {
  const Array = props.ResultData[0];
  const Mid = Array.Mid;
  console.log(Mid);
  const End = Array.End;
  console.log(End);
  const Keys1 = Object.keys(Array.Mid);
  console.log(Keys1);
  const Keys2 = Object.keys(Array.End);
  console.log(Keys2);
  return (
    <div className="table_content" style={{color : "aliceblue"}}>
      <h1>RESULT</h1>
      <Table stripped bordered hover size="sm" style={{color : "aliceblue"}}>
        <thead>
          <tr>
            <th>Subject Code</th>
            <th>Subject Name </th>
            <th>Mid Term(50 marks)</th>
            <th>End Term(100 marks)</th>
          </tr>
        </thead>
        <tbody>
          {Keys1.map((key) => (
            <tr>
              <td>{key}</td>
              <td>{Mid[key].Name}</td>
              <td>{Mid[key].marks}</td>
              <td>{End[key] !== undefined ? End[key].marks : `-`}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
export default CreateResultTable;
