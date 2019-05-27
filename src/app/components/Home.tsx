import * as React from "react";
import "../styles/home.less";
import { findShortestPath } from "../utils/helpers";

// @ts-ignore
const Logo = require("../images/logo.png");

interface IGridState {
  rows: number;
  columns: number;
  gridArray: Array<Array<string>>;
  styles: Object;
}

export class Home extends React.Component<{}, IGridState> {
  state = {
    rows: 10,
    columns: 10,
    gridArray: Array<Array<string>>(),
    styles: { rows: {}, columns: {} }
  };

  componentDidMount() {
    this.generateGrid();
    this.updateStyle();
  }

  generateGrid = () => {
    if (this.state.columns == 0 || this.state.rows == 0) {
      alert("Input cannot be zero");
      return;
    }

    let gridArray = [];

    for (var i = 0; i < this.state.columns; i++) {
      gridArray.push([]);
      for (var j = 0; j < this.state.rows; j++) {
        gridArray[i].push("blocked");
      }
    }
    
    this.setState({ gridArray }, () => this.handleCellInit());
    this.handleCellClick = this.handleCellClick;
  };
  
  handleCellInit() {
    const { rows, columns } = this.state;
    let randomFirst = this.getRandomNum(rows);
    let randomLast = this.getRandomNum(rows);
    let gridArray = [...this.state.gridArray];

    gridArray[0][randomFirst] = "start";
    gridArray[columns - 1][randomLast] = "end";
    
    this.setState({ gridArray });
  }

  updateStyle = () => {
    const styles = {
      rows: {
        gridTemplateRows: `repeat(${this.state.rows}, 1fr)`
      },
      columns: {
        gridTemplateColumns: `repeat(${this.state.columns}, 1fr)`
      }
    };
    this.setState({ styles });
  };

  getRandomNum(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  getMinmaxValue(value: any, min: number, max: number) {
    if (isNaN(value)) return min;
    if (value.length < 2) return value; 

    const parsedInput = parseInt(value);
    if (parsedInput >= min && parsedInput <= max) {
      return value;
    } else if (parsedInput < min) {
      return min;
    } else if (parsedInput > max) {
      return max;
    }
    return value;
  }

  handleCellClick(column: number, row: number) {
    this.generateGridPath(column, row);

    const gridArray = this.state.gridArray;
    const start = gridArray[0].indexOf("start");
    
    for(var grid in gridArray) {
      gridArray[grid] = gridArray[grid].map(x => x.replace("visited","empty"));
    }
    var validPath = findShortestPath([0,start], gridArray);
    if (validPath) {
      for (var path in validPath) {
        gridArray[validPath[path][0]][validPath[path][1]] = "path";
      }
      gridArray[validPath[0][0]][validPath[0][1]] = "start";
    }
    this.setState({gridArray});
  }

  generateGridPath(column: number, row: number) {
    let gridArray = [...this.state.gridArray];
    if (gridArray[column][row]=="blocked") {
      gridArray[column][row] = "empty"
    } else if (gridArray[column][row]=="empty" || gridArray[column][row]=="visited") {
      gridArray[column][row] = "blocked"
    }
    this.setState({gridArray}); 
  }

  handleColumnChange = (e: any) => {
    const columns = this.getMinmaxValue(e.target.value, 1, 20);
    this.setState({ columns });
  };

  handleRowChange = (e: any) => {
    const rows = this.getMinmaxValue(e.target.value, 1, 20);
    this.setState({ rows });
  };

  handleGenerateGrid() {
    this.generateGrid();
    this.updateStyle();
  }

  renderCell(cellStatus: string, column: number, row: number) {
    return (
      <div
        className="cell"
        key={`${column}-${row}`}
        id={`cell${column}-${row}`}
        onClick={() => this.handleCellClick(column, row)}
        data-status={cellStatus}
        data-column = {column}
        data-row = {row}
      />
    );
  }

  render() {
    const { rows, columns, gridArray, styles } = this.state;

    return (
      <div className="home-container">
        <header>
          <img src={Logo} alt="Gridster logo" />
        </header>
        <main>
          <div className="controls-container">
            <span className="input-container">
              <label>Rows</label>
              <input
                maxLength={2}
                value={rows}
                onChange={this.handleRowChange}
              />
            </span>
            <span className="input-container">
              <label>x</label>
            </span>
            <span className="input-container">
              <label>Columns</label>
              <input
                maxLength={2}
                value={columns}
                onChange={this.handleColumnChange}
              />
            </span>
            <button
              className="generate-btn"
              onClick={() => this.handleGenerateGrid()}
            >
              Generate
            </button>
          </div>
          <div className="grid-container" style={styles.columns}>
            {gridArray.map((x, i) => (
              <div
                className="column"
                key={i}
                id={`column-${i}`}
                style={styles.rows}
              >
                {x.map((y, j) => this.renderCell(y, i, j))}
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }
}