/////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Forge Partner Development
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////

// weather API key
const key = 'a72549c9509913024ba23bb8623a8f2b';


var _googleChart = null;
var _options = null;
var _data = null;


const Budget_Table_Columns = [
  { title: "Type" },
  { title: "ID" },
  { title: "Name" },
  { title: "Description" }
];


const Budget_Table_Datas = [
  ['Issue', '1234', 'Check the tunnul', 'Something is wrong'],
  ['Issue', '1234', 'Check the tunnul', 'Something is wrong'],
  ['RFI',   '1234', 'Check the tunnul', 'Something is wrong'],
  ['Issue', '1234', 'Check the tunnul', 'Something is wrong']
];


const Segment_Table_Columns = [
  { title: "ID" },
  { title: "Name" },
  { title: "Type" },
  { title: "Description" }
];

const Segment_Table_Datas = [
  ['Issue', '1234', 'Check the tunnul', 'Something is wrong'],
  ['Issue', '1234', 'Check the tunnul', 'Something is wrong'],
  ['RFI',   '1234', 'Check the tunnul', 'Something is wrong'],
  ['Issue', '1234', 'Check the tunnul', 'Something is wrong'],
  ['Issue', '1234', 'Check the tunnul', 'Something is wrong'],
  ['Issue', '1234', 'Check the tunnul', 'Something is wrong'],
  ['Issue', '1234', 'Check the tunnul', 'Something is wrong']
];

///////////////////////////////////////////////////////////////////////
/// Generate random color
///////////////////////////////////////////////////////////////////////
function random_rgba() {
  var o = Math.round, r = Math.random, s = 255;
  return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + 0.5 + ')';
}



class Chart{

  constructor( chartId ) {
    this.series = new TimeSeries();
    this.chart = new SmoothieChart();
    this.chartId = chartId;
    this.canvas = document.getElementById(chartId);
    this.chart.addTimeSeries(this.series, { lineWidth: 2, strokeStyle: '#00ff00' });
    this.chart.streamTo(this.canvas, 500);

  }

  appendNewData( value ){
    if(this.chart === null || this.series === null ){
      console.log('The chart is not initialized, please re-check');
      return;
    }

    this.series.append(new Date().getTime(), value, false );
  }
} 



///////////////////////////////////////////////////////////////////////
/// Class to handle budget table
///////////////////////////////////////////////////////////////////////
class BudgetTable{

  constructor( tableId, columns, dataSet=[] ) {
    this.tableId = tableId;
    this.table = $(tableId).DataTable({
      pageLength: 10,
      data: dataSet,
      columns: columns
    });
  }

  refreshTable( dataSet = null){
    if(this.table === null){
      console.log('The table is not initialized, please re-check');
      return;
    }
    const newData = dataSet ? dataSet : this.table.data();
    this.table.clear().rows.add(newData).draw();
  }


  getBudgetList() {
    var budgetData = [];
    if (this.table !== null) {
      this.table.data().toArray().forEach((budgetItem) => {
        const item = {
          parentId: null,
          code: budgetItem[1],
          name: budgetItem[0] + ' Budget',
          quantity: budgetItem[2],
          description: "",
          unit: budgetItem[3],
          unitPrice: budgetItem[4].toString()
        }
        budgetData.push(item);
      })
    }
    return budgetData;
  }

  updateBudgetsTable( budgetCode, unitPrice, amount ){
    if (this.table !== null){
      let tableData = this.table.data();
      const budgetCount = tableData.length; 
      // reset the data
      for( let i = 0; i < budgetCount; ++i ){
        if(tableData[i][1] === budgetCode){
          tableData[i][4] = unitPrice;
          tableData[i][5] = amount;
          break;
        }
      }
    }
  }  
}


function animateRandomData( chart, interval=1000 ){
  setInterval(function(){ 
    const value = 40 + Math.round(60 * Math.random());
  

    chart.appendNewData( value );
  

   }, interval);


}

///////////////////////////////////////////////////////////////////////
/// Document ready event
///////////////////////////////////////////////////////////////////////
$(document).ready(function () {
  
  ////////////////////////////////////////////////////////////////////
  // initialize the table
  const myTaskTable = new BudgetTable('#myTaskList', Budget_Table_Columns );
  myTaskTable.refreshTable( Budget_Table_Datas );

  ////////////////////////////////////////////////////////////////////  
  // weather report
  weatherWidget();


  ////////////////////////////////////////////////////////////////////
  // iot monitor
  let chart1 = new Chart('chart-settlement-1');
  let chart2 = new Chart('chart-settlement-2');
  let chart3 = new Chart('chart-settlement-3');
  let chart4 = new Chart('chart-settlement-4');

  animateRandomData( chart1 );
  animateRandomData( chart2, 2000 );
  animateRandomData( chart3, 5000 );
  animateRandomData( chart4, 3000 );


  google.charts.load('current', { 'packages': ['gauge'] });
  google.charts.setOnLoadCallback(drawChart);



  ////////////////////////////////////////////////////////////////////
  // Segements management
  const segmentTable = new BudgetTable('#segmentList', Segment_Table_Columns );
  segmentTable.refreshTable( Segment_Table_Datas );


});



function setRamdonData() {
  
  setInterval(function(){ 
    const tension1 = 40 + Math.round(60 * Math.random());
    const tension2 = 40 + Math.round(40 * Math.random());
    const tension3 = 40 + Math.round(80 * Math.random());
    const tension4 = 40 + Math.round(70 * Math.random());
  
    _data.setValue(0, 1, tension1 );
    _googleChart.draw(_data, _options);
  
    _data.setValue(1, 1, tension2);
    _googleChart.draw(_data, _options);
  
    _data.setValue(2, 1, tension3);
    _googleChart.draw(_data, _options);
  
    _data.setValue(3, 1, tension4);
    _googleChart.draw(_data, _options);
  

   }, 1000);

}



function drawChart() {
  _data = google.visualization.arrayToDataTable([
      ['Label', 'Value'],
      ['Tension 1(kN)', 100],
      ['Tension 2(kN)', 100],
      ['Tension 3(kN)', 100],
      ['Tension 4(kN)', 100]
  ]);
 
  _options = {
      width: 400, height: 120,
      redFrom: 90, redTo: 100,
      yellowFrom: 75, yellowTo: 90,
      minorTicks: 5
  };
  _googleChart = new google.visualization.Gauge(document.getElementById('chartDiv'));
  _googleChart.draw(_data, _options);

  setRamdonData();
}




function weatherWidget() {

  window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];
  window.myWidgetParam.push({
    id: 15,
    cityid: '2031533',
    appid: key,
    units: 'metric',
    containerid: 'openweathermap-widget',
  });


  var script = document.createElement('script');
  script.async = true;
  script.charset = "utf-8";
  script.src =
    "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(script, s);
};



