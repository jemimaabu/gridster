import * as React from 'react';
import "../styles/home.less";
import * as $ from "jquery";

// @ts-ignore
var Logo = require("../images/logo.png");

interface IGridState {
  rows: number;
  columns: number
}

export class Home extends React.Component<{}, IGridState> {
  private rowInput: React.RefObject<HTMLInputElement>;
  private colInput: React.RefObject<HTMLInputElement>;

  constructor(props: any) {
    super(props);

    this.rowInput = React.createRef();
    this.colInput = React.createRef();

    this.state = {
      rows: 10,
      columns: 10
    }
  }

  componentDidMount() {
    this.handleCellInit();
  } 
  
  componentDidUpdate() {
    this.resetTable();
    this.handleCellInit();
  }

  handleCellClick(e: any) {
    var cellId = document.getElementById(e.target.id);
    cellId.classList.contains("selected") ? cellId.classList.remove("selected") : cellId.classList.add("selected");
  }

  handleColumnChange(e:any) {
    var colInput = e.target.value;
    this.colInput = colInput;
  }

  handleRowChange(e:any) {
    var rowInput = e.target.value;
    this.rowInput = rowInput;
  }

  handleGenerateGrid() {
    var rows = +this.rowInput;
    var columns = +this.colInput;
    this.setState({
      rows,
      columns
    });
  }

  getRandomNum(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  handleCellInit() {
    var colLength = this.state.columns;
    var rowLength = this.state.rows;
    var randomFirst = this.getRandomNum(rowLength);
    var randomLast = this.getRandomNum(rowLength);
    $(`#cell-0${randomFirst}`).addClass("start");
    $(`#cell-${colLength-1}${randomLast}`).addClass("end");
  }

  resetTable() {
    $(".cell").removeClass("start end selected");
  }

  renderCell(cellContent: string, index: any) {
    return (
      <div 
        className="cell" 
        key={index} 
        id={`cell-${index}`}
        onClick={(e) => this.handleCellClick(e)}>
          {cellContent}
      </div>
    )
  }
  
  render() {
    var gridArray = [];
    for(var i = 0; i < this.state.columns; i++) {
      gridArray.push([]);
      for(var j =0; j < this.state.rows; j++) {
        gridArray[i].push("");
      }
    }

    var styles = {
      rows: {
        gridTemplateRows: `repeat(${this.state.rows}, 1fr)`
      },
      columns: {
        gridTemplateColumns: `repeat(${this.state.columns}, 1fr)`
      }
    }

    return (
      <div className="home-container">
        <header>
          <img src={Logo} alt="Gridster logo"/>
        </header>
        <main>
          <div className="controls-container">
              <span className="input-container">
                <label>Rows</label>
                <input 
                  ref = {this.rowInput}
                  maxLength={2}
                  onChange={(e) => this.handleRowChange(e)}
                  id="rows-input"/>
              </span>
              <span className="input-container">
                <label>x</label>
              </span>
              <span className="input-container">
                <label>Columns</label>
                <input 
                  ref = {this.colInput}
                  maxLength={2}
                  onChange={(e) => this.handleColumnChange(e)}
                  id="columns-input"/>
              </span>
              <button 
                className="generate-btn"
                onClick={() => this.handleGenerateGrid()}>
                  Generate
              </button>
          </div>
          <div className="grid-container" style={styles.columns}>
              {
                gridArray.map((x,i) => (
                  <div className="column" key={i} id={`column-${i}`} style={styles.rows}>
                    {
                      x.map((y,j) => 
                        this.renderCell(y,i+""+j)
                      )
                    }
                  </div>
                ))
              }
          </div>
        </main>
      </div>
    )
  }
}