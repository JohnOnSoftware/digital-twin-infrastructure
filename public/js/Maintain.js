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


// TBD: move this to cloud database
var Standard_Book = {
  'Concrete': {
    'Price': 146,
    'Unit': 'm3',
    'Code': '200420420847'
  },
  'Window' : {
    'Price': 1224,
    'Unit': 'nr',
    'Code': '200420420857'
  },
  'Door' : {
    'Price': 1836,
    'Unit': 'nr',
    'Code': '200420420867'
  },
  'Floor' : {
    'Price': 80,
    'Unit': 'm2',
    'Code': '200420420877'
  }
} 

const Budget_Table_Columns = [
  { title: "Type" },
  { title: "ID" },
  { title: "Name" },
  { title: "Description" }
];

const Budget_Table_Datas = [
  ['Issue', '1234', 'Check the tunnul', 'Something is wrong'],
  ['Issue', '1234', 'Check the tunnul', 'Something is wrong'],
  ['RFI', '1234', 'Check the tunnul', 'Something is wrong'],
  ['Issue', '1234', 'Check the tunnul', 'Something is wrong']
];

var budgetTable = null;

///////////////////////////////////////////////////////////////////////
/// Generate random color
///////////////////////////////////////////////////////////////////////
function random_rgba() {
  var o = Math.round, r = Math.random, s = 255;
  return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + 0.5 + ')';
}



// class Chart{

//   constructor( tableId, columns, dataSet=[] ) {
//     this.tableId = tableId;
//     this.table = $(tableId).DataTable({
//       pageLength: 10,
//       data: dataSet,
//       columns: columns
//     });
//   }

//   refreshTable( dataSet = null){
//     if(this.table === null){
//       console.log('The table is not initialized, please re-check');
//       return;
//     }
//     const newData = dataSet ? dataSet : this.table.data();
//     this.table.clear().rows.add(newData).draw();
//   }


//   getBudgetList() {
//     var budgetData = [];
//     if (this.table !== null) {
//       this.table.data().toArray().forEach((budgetItem) => {
//         const item = {
//           parentId: null,
//           code: budgetItem[1],
//           name: budgetItem[0] + ' Budget',
//           quantity: budgetItem[2],
//           description: "",
//           unit: budgetItem[3],
//           unitPrice: budgetItem[4].toString()
//         }
//         budgetData.push(item);
//       })
//     }
//     return budgetData;
//   }

//   updateBudgetsTable( budgetCode, unitPrice, amount ){
//     if (this.table !== null){
//       let tableData = this.table.data();
//       const budgetCount = tableData.length; 
//       // reset the data
//       for( let i = 0; i < budgetCount; ++i ){
//         if(tableData[i][1] === budgetCode){
//           tableData[i][4] = unitPrice;
//           tableData[i][5] = amount;
//           break;
//         }
//       }
//     }
//   }  
// } 





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



///////////////////////////////////////////////////////////////////////
/// Document ready event
///////////////////////////////////////////////////////////////////////
$(document).ready(function () {

  // initialize the charts and table
  budgetTable = new BudgetTable('#myTaskList', Budget_Table_Columns );

  budgetTable.refreshTable( Budget_Table_Datas );



  // iot monitor
  var  series = new TimeSeries();

  
  var chartSettlement1 = new SmoothieChart();
  var  canvas1 = document.getElementById('chart-settlement-1');
  chartSettlement1.addTimeSeries(series, { lineWidth: 2, strokeStyle: '#00ff00' });
  chartSettlement1.streamTo(canvas1, 500);


  var chartSettlement2 = new SmoothieChart();
  var  canvas2 = document.getElementById('chart-settlement-2');
  chartSettlement2.addTimeSeries(series, { lineWidth: 2, strokeStyle: '#00ff00' });
  chartSettlement2.streamTo(canvas2, 500);

  var chartSettlement3 = new SmoothieChart();
  var  canvas3 = document.getElementById('chart-settlement-3');
  chartSettlement3.addTimeSeries(series, { lineWidth: 2, strokeStyle: '#00ff00' });
  chartSettlement3.streamTo(canvas3, 500);



  google.charts.load('current', { 'packages': ['gauge'] });
  google.charts.setOnLoadCallback(drawChart);



  // weather report
  window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];
  window.myWidgetParam.push({
    id: 15,
    cityid: '2031533',
    appid: key,
    units: 'metric',
    containerid: 'openweathermap-widget',
  });
  weatherWidget();



  // Segements management
  
  budgetTable = new BudgetTable('#segmentList', Budget_Table_Columns );
  budgetTable.refreshTable( Budget_Table_Datas );


});



function setRamdonData() {
  
  // set the temperature data 

  setInterval(function(){ 
    const tension1 = Math.random(40, 80);
    const tension2 = Math.random(40, 80);
    const tension3 = Math.random(40, 80);
    const tension4 = Math.random(40, 80);
  
    _data.setValue(0, 1, tension1 );
    _googleChart.draw(_data, _options);
    // _temperatureTimeSeries.append(new Date().getTime(), );
  
    // set the humidity data 
    _data.setValue(1, 1, tension2);
    _googleChart.draw(_data, _options);
    // _humidityTimeSeries.append(new Date().getTime(), msgJson.humidity);
  
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
  var script = document.createElement('script');
  script.async = true;
  script.charset = "utf-8";
  script.src =
    "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(script, s);
};



