import "./App.css";
import { useState, useEffect } from "react";
import Loader from "react-loader";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 250,
  },
  container: {
    maxHeight: 500,
  },
});
function App() {
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [clicked, setClicked] = useState(true);
  useEffect(() => {
    setLoaded(false);
    fetch("http://localhost:5000/")
      .then((res) => {
        if (res.status === 200) {
          setLoaded(true);
          res.json().then((result) => {
            setData(result);
          });
        }
      })
      .catch((error) => {
        setLoaded(true);
        alert("Something went wrong try again");
      });
  }, [clicked]);
  const classes = useStyles();

  return (
    <Loader loaded={loaded}>
      <div>
        <h1>The weather for San Francisco</h1>
      </div>
      {data ? (
        <TableContainer component={Paper} className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Minimum Temperature</TableCell>
                <TableCell>Maximum Temperature</TableCell>
                <TableCell>Weather</TableCell>
                <TableCell>Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.min_temp ? row.min_temp : "NA"}</TableCell>
                  <TableCell>{row.max_temp ? row.max_temp : "NA"}</TableCell>
                  <TableCell>
                    {row.weather_state_name ? row.weather_state_name : "NA"}
                  </TableCell>
                  <TableCell>{row.time ? row.time : "NA"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
      <Button onClick={() => setClicked(!clicked)}>Make Api call again</Button>
    </Loader>
  );
}

export default App;
