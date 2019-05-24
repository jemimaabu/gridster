import * as React from 'react';
import "../styles/home.less";
import * as $ from "jquery";

// @ts-ignore
var Logo = require("../images/logo.png");

interface IGridProps {
}

interface IGridState {
  rowInput: number;
  columnInput: number;
  rows: number;
  columns: number
}

export class Home extends React.Component<IGridProps, IGridState> {
  constructor(props: IGridProps) {
    super(props);

    this.state = {
      rows: 10,
      columns: 10,
      rowInput: 10,
      columnInput: 10
    }
  }

  componentDidMount() {
    this.handleCellInit();
  }    

  handleCellClick(e: any) {
    var cellId = document.getElementById(e.target.id);
    cellId.classList.contains("selected") ? cellId.classList.remove("selected") : cellId.classList.add("selected");
  }

  handleColumnChange(e:any) {
    var columnInput = e.target.value;
    this.setState({
      columnInput
    })
  }

  handleRowChange(e:any) {
    var rowInput = e.target.value;
    this.setState({
      rowInput
    })
  }

  handleGenerateGrid() {
    var rows = this.state.rowInput;
    var columns = this.state.columnInput;
    this.setState({
      rows,
      columns
    });
    this.resetTable();
    this.handleCellInit();
  }

  getRandomNum(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  handleCellInit() {
    var colLength = this.state.columnInput;
    var rowLength = this.state.rowInput;
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
    var rows = this.state.rows;
    var columns = this.state.columns;
    for(var i = 0; i<columns; i++) {
      gridArray.push([]);
      for(var j =0; j<rows; j++) {
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
                        value={this.state.rowInput}
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
                        value={this.state.columnInput}
                        maxLength={2}
                        onChange={(e) => this.handleColumnChange(e)}
                        id="columns-input"/>
                  </span>
                  <button 
                    className="generate-btn"
                    onClick={() => this.handleGenerateGrid()}>Generate</button>
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