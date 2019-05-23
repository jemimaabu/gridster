import * as React from 'react';
import "../styles/home.less";

interface IGridProps {

}

interface IGridState {
  rows: number;
  columns: number;
}

export class Home extends React.Component<IGridProps, IGridState> {
  constructor(props: IGridProps) {
    super(props);

    this.state = {
      rows: 10,
      columns: 10
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
    if (e.which < 48 || e.which > 57)
    {
        e.preventDefault();
    }
    var columns = e.target.value;
    this.setState({
      columns
    })
  }

  handleRowChange(e:any) {
    if (e.which < 48 || e.which > 57)
    {
        e.preventDefault();
    }
    var rows = e.target.value;
    this.setState({
      rows
    })
  }

  getRandomNum(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  handleCellInit() {
    var colLength = this.state.columns;
    var rowLength = this.state.rows;
    var randomFirst = this.getRandomNum(rowLength);
    var randomLast = this.getRandomNum(rowLength);
    document.getElementById(`cell-0${randomFirst}`).classList.add("start");
    document.getElementById(`cell-${colLength-1}${randomLast}`).classList.add("end");
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
              Gridster
          </header>
          <main>
              <div className="controls-container">
                  <span className="input-container">
                      <label>Rows</label>
                      <input 
                        value={this.state.rows}
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
                        value={this.state.columns}
                        maxLength={2}
                        onChange={(e) => this.handleColumnChange(e)}
                        id="columns-input"/>
                  </span>
                  <button 
                    className="generate-btn">Generate</button>
              </div>
              <div className="grid-container" style={styles.columns}>
                  {
                      gridArray.map((x,i) => (
                        <div className="column" id={`column-${i}`} style={styles.rows}>
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