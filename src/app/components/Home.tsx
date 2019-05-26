import * as React from "react";
import "../styles/home.less";
import * as $ from "jquery";
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
    gridArray: [[""]],
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
        gridArray[i].push("Empty");
      }
    }

    this.setState({ gridArray }, () => this.handleCellInit());
  };

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

  handleCellInit() {
    const { rows, columns } = this.state;
    let randomFirst = this.getRandomNum(rows);
    let randomLast = this.getRandomNum(rows);
    let gridArray = [...this.state.gridArray];

    gridArray[0][randomFirst] = "start";
    gridArray[columns - 1][randomLast] = "end";
    this.setState({ gridArray });
  }

  handleFindPath(start: number, gridArray: Array<Array<string>>) {
    var validPath = findShortestPath([0,start], gridArray);
    for (var path in validPath) {
      gridArray[validPath[path][0]][validPath[path][1]] = "path";
    }
  }

  handleCellClick(e: any) {
    var cellId = document.getElementById(e.target.id);
    cellId.classList.contains("selected")
      ? cellId.classList.remove("selected")
      : cellId.classList.add("selected");
  }

  handleColumnChange = (e: any) => {
    const columns = this.getMinmaxValue(e.target.value, 1, 20);
    this.setState({ columns });
  };

  handleRowChange = (e: any) => {
    const rows = this.getMinmaxValue(e.target.value, 1, 20);
    this.setState({ rows });
  };

  resetTable() {
    $(".cell").removeClass("selected");
  }

  handleGenerateGrid() {
    this.generateGrid();
    this.resetTable();
    this.updateStyle();
  }

  renderCell(cellContent: string, index: any) {
    return (
      <div
        className="cell"
        key={index}
        id={`cell${index}`}
        onClick={e => this.handleCellClick(e)}
        data-status={cellContent}
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
                id="rows-input"
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
                id="columns-input"
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
                {x.map((y, j) => this.renderCell(y, i + "-" + j))}
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }
}