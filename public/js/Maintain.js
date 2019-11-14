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

const ProjectDes = "Norconsult delivers a multidisciplinary planning and design approach to clients in the Nordic region and beyond. Software and web development is handled by the daughter company Norconsult Informasjonssystemer (NoIS). Norwegian road authorities (Nye Veier) recently chose constructor AF Gruppen together with Norconsult to lead construction, design, and engineering on a new road linking Mandal and Kristiansand in southern Norway. This $500-million project will feature multiple tunnels and bridges throughout its 19-kilometer length, with one tunnel stretching more than 2.5 kilometers. The road authority attached an ambitious goal to the project: reduce the project’s carbon emissions by 20%, as compared to a typical project. Nye Veier set a long list of ambitious goals for this project, both general digitalization and using the BIM model as a single source of information on web.\r\n\r\n The project wanted to use model based construction, reduce drawings and printing to a minimum and make timely data widely available. NoIS were hired to create a tool called ISY Prosjekt, to link all project participants with project data stored in the cloud. This tool allows users to virtually access all project data on mobile devices. A cache feature lets users select design models for viewing offline—critical to making project information available in tunnels without printing. Geolocation capabilities help users quickly find documents and models related to their physical locations, saving time as they keep construction and sustainability efforts on track."


const cameraList = [
  'http://cwwp2.dot.ca.gov/vm/loc/d10/nbsr99nodeadmanscreek.htm',
  'http://cwwp2.dot.ca.gov/vm/loc/d6/fre99sofloralave.htm',
  'http://cwwp2.dot.ca.gov/vm/loc/d4/tv144us101northofpetalumablvd.htm'
]

var SegmentInfoList = [
  {
    'SegmentNo': 0,
    'ButtonId': 'SegmentBtn0',
    'Name': 'Segment 0 KM',
    'Description': 'Who made this segement, any issue need to be check, how special is this segement.',
    'Viewpoint': 2,
    //'Camera': [{ 'DeviceNo': 1, 'Location': 2132, 'Status': 1 }, { 'CameraNo': 2, 'Location': 2133, 'Status': 1 }],
    'Slope': [{ 'DeviceNo': 1, 'Location': 111, 'Status': 1 }],
    'Temperature': [{ 'DeviceNo': 1, 'Location': 50795, 'Status': 1, 'Position': 22 }],
    'Humidity': [{ 'DeviceNo': 1, 'Location': 50795, 'Status': 1 }],
  },
  {
    'SegmentNo': 1,
    'ButtonId': 'SegmentBtn1',
    'Name': 'Segment 1 KM',
    'Description': 'Who made this segement, any issue need to be check, how special is this segement.',
    'Viewpoint': 3,
    //'Camera': [{ 'DeviceNo': 1, 'Location': 2132, 'Status': 1 }, { 'CameraNo': 2, 'Location': 2133, 'Status': 1 }],
    'Slope': [{ 'DeviceNo': 1, 'Location': 111, 'Status': 1 }],
    'Temperature': [{ 'DeviceNo': 1, 'Location': 50795, 'Status': 1, 'Position': 22 }],
    'Humidity': [{ 'DeviceNo': 1, 'Location': 50795, 'Status': 1 }],
  },
  {
    'SegmentNo': 2,
    'ButtonId': 'SegmentBtn2',
    'Viewpoint': 12,
    'Name': 'Segment 2 KM',
    'Description': 'Who made this segement, any issue need to be check, how special is this segement.',
    //'Camera': [{ 'DeviceNo': 1, 'Location': 2132, 'Status': 0 }, { 'CameraNo': 2, 'Location': 2133, 'Status': 0 }],
    'Slope': [{ 'DeviceNo': 1, 'Location': 111, 'Status': 1 }, { 'DeviceNo': 2, 'Location': 111, 'Status': 1 }, { 'DeviceNo': 1, 'Location': 111, 'Status': 1 }],
    'Temperature': [{ 'DeviceNo': 1, 'Location': 50795, 'Position': 23, 'Status': 0 }, { 'DeviceNo': 2, 'Location': 50795, 'Status': 0, 'Position': 24 }, { 'DeviceNo': 3, 'Location': 50795, 'Status': 0, 'Position': 25 }],
    'Humidity': [{ 'DeviceNo': 1, 'Location': 50795, 'Status': 1 }],
  },
  {
    'SegmentNo': 3,
    'ButtonId': 'SegmentBtn3',
    'Viewpoint': 13,
    'Name': 'Segment 3 KM',
    'Description': 'Who made this segement, any issue need to be check, how special is this segement.',
    //'Camera': [{ 'DeviceNo': 1, 'Location': 2132 }, { 'CameraNo': 2, 'Location': 2133 }],
    'Slope': [{ 'DeviceNo': 1, 'Location': 111 }],
    'Temperature': [{ 'DeviceNo': 1, 'Location': 50795, 'Status': 1, 'Position': 24 }],
    'Humidity': [{ 'DeviceNo': 1, 'Location': 50795 }],
    'Issues': { 'Medium': [13243] }
  },
  {
    'SegmentNo': 4,
    'ButtonId': 'SegmentBtn4',
    'Viewpoint': 14,
    'Name': 'Segment 4 KM',
    'Description': 'Who made this segement, any issue need to be check, how special is this segement.',
    //'Camera': [{ 'DeviceNo': 1, 'Location': 2132 }],
    'Slope': [{ 'DeviceNo': 1, 'Location': 111 }],
    'Temperature': [{ 'DeviceNo': 1, 'Location': 50795 }],
    'Humidity': [{ 'DeviceNo': 1, 'Location': 50795 }],
  },
  {
    'SegmentNo': 5,
    'ButtonId': 'SegmentBtn5',
    'Viewpoint': 15,
    'Name': 'Segment 5 KM',
    'Description': 'Starting point for the highway',
    'Camera': [{ 'DeviceNo': 1, 'Location': 74313 }],
    'Slope': [{ 'DeviceNo': 1, 'Location': 111 }],
    'Temperature': [{ 'DeviceNo': 1, 'Location': 50795 }],
    'Humidity': [{ 'DeviceNo': 1, 'Location': 50795 }],
  },
  {
    'SegmentNo': 6,
    'ButtonId': 'SegmentBtn6',
    'Viewpoint': 16,
    'Name': 'Segment 6 KM',
    'Description': 'Starting point for the highway',
    //'Camera': [{ 'DeviceNo': 1, 'Location': 2132 }, { 'CameraNo': 2, 'Location': 2133 }],
    'Slope': [{ 'DeviceNo': 1, 'Location': 111 }],
    'Temperature': [{ 'DeviceNo': 1, 'Location': 50795 }],
    'Humidity': [{ 'DeviceNo': 1, 'Location': 50795 }],
  },
  {
    'SegmentNo': 7,
    'ButtonId': 'SegmentBtn7',
    'Viewpoint': 17,
    'Name': 'Segment 7 KM',
    'Description': 'Starting point for the highway',
    //'Camera': [{ 'DeviceNo': 1, 'Location': 2132 }, { 'CameraNo': 2, 'Location': 2133 }],
    'Slope': [{ 'DeviceNo': 1, 'Location': 111 }],
    'Temperature': [{ 'DeviceNo': 1, 'Location': 50795 }],
    'Humidity': [{ 'DeviceNo': 1, 'Location': 50795 }],
    'Documents': [{ 'Title': 'Corridor DWG', 'urn': 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6M3h4YWdmZ2s2aHhyb2F0YzVhdTJwM3JoY3VncnZiYnUtaW5mcmFpb3RzYW1wbGUvQ29ycmlkb3ItNWMuZHdn' }]
  },
  {
    'SegmentNo': 8,
    'ButtonId': 'SegmentBtn8',
    'Viewpoint': 18,
    'Name': 'Segment 8 KM',
    'Description': 'Starting point for the highway',
    //'Camera': [{ 'DeviceNo': 1, 'Location': 2132 }, { 'CameraNo': 2, 'Location': 2133 }],
    'Slope': [{ 'DeviceNo': 1, 'Location': 111 }],
    'Temperature': [{ 'DeviceNo': 1, 'Location': 50795 }],
    'Humidity': [{ 'DeviceNo': 1, 'Location': 50795 }],
  },
  {
    'SegmentNo': 9,
    'ButtonId': 'SegmentBtn9',
    'Viewpoint': 19,
    'Name': 'Segment 9 KM',
    'Description': 'Starting point for the highway',
    //'Camera': [{ 'DeviceNo': 1, 'Location': 2132 }, { 'CameraNo': 2, 'Location': 2133 }],
    'Slope': [{ 'DeviceNo': 1, 'Location': 111 }],
    'Temperature': [{ 'DeviceNo': 1, 'Location': 50795 }],
    'Humidity': [{ 'DeviceNo': 1, 'Location': 50795 }],
  },
  {
    'SegmentNo': 10,
    'ButtonId': 'SegmentBtn10',
    'Viewpoint': 4,
    'Name': 'Segment 10 KM',
    'Description': 'Starting point for the highway',
    //'Camera': [{ 'DeviceNo': 1, 'Location': 2132 }, { 'CameraNo': 2, 'Location': 2133 }],
    'Slope': [{ 'DeviceNo': 1, 'Location': 111 }],
    'Temperature': [{ 'DeviceNo': 1, 'Location': 50795 }],
    'Humidity': [{ 'DeviceNo': 1, 'Location': 50795 }],
  },
  {
    'SegmentNo': 11,
    'ButtonId': 'SegmentBtn11',
    'Viewpoint': 5,
    'Name': 'Segment 11 KM',
    'Description': 'Starting point for the highway',
    //'Camera': [{ 'DeviceNo': 1, 'Location': 2132 }, { 'CameraNo': 2, 'Location': 2133 }],
    'Slope': [{ 'DeviceNo': 1, 'Location': 111 }],
    'Temperature': [{ 'DeviceNo': 1, 'Location': 50795 }],
    'Humidity': [{ 'DeviceNo': 1, 'Location': 50795 }],
  },
  {
    'SegmentNo': 12,
    'ButtonId': 'SegmentBtn12',
    'Viewpoint': 6,
    'Name': 'Segment 12 KM',
    'Description': 'Starting point for the highway',
    //'Camera': [{ 'DeviceNo': 1, 'Location': 2132 }, { 'CameraNo': 2, 'Location': 2133 }],
    'Slope': [{ 'DeviceNo': 1, 'Location': 111 }],
    'Temperature': [{ 'DeviceNo': 1, 'Location': 50795 }],
    'Humidity': [{ 'DeviceNo': 1, 'Location': 50795 }],
    'Issues': { 'Critical': [290867] }
  },
  {
    'SegmentNo': 13,
    'ButtonId': 'SegmentBtn13',
    'Viewpoint': 7,
    'Name': 'Segment 13 KM',
    'Description': 'Starting point for the highway',
    //'Camera': [{ 'DeviceNo': 1, 'Location': 2132 }, { 'CameraNo': 2, 'Location': 2133 }],
    'Slope': [{ 'DeviceNo': 1, 'Location': 111 }],
    'Temperature': [{ 'DeviceNo': 1, 'Location': 50795 }],
    'Humidity': [{ 'DeviceNo': 1, 'Location': 50795 }],
  },
  {
    'SegmentNo': 14,
    'ButtonId': 'SegmentBtn14',
    'Viewpoint': 8,
    'Name': 'Segment 14 KM',
    'Description': 'Starting point for the highway',
    //'Camera': [{ 'DeviceNo': 1, 'Location': 2132 }, { 'CameraNo': 2, 'Location': 2133 }],
    'Slope': [{ 'DeviceNo': 1, 'Location': 111 }],
    'Temperature': [{ 'DeviceNo': 1, 'Location': 50795 }],
    'Humidity': [{ 'DeviceNo': 1, 'Location': 50795 }],
  },
  {
    'SegmentNo': 15,
    'ButtonId': 'SegmentBtn15',
    'Viewpoint': 9,
    'Name': 'Segment 15 KM',
    'Description': 'Starting point for the highway',
    //'Camera': [{ 'DeviceNo': 1, 'Location': 2132 }, { 'CameraNo': 2, 'Location': 2133 }],
    'Slope': [{ 'DeviceNo': 1, 'Location': 111, 'Viewpoint': 9, 'Status': 1 }, { 'DeviceNo': 2, 'Location': 419340, 'Viewpoint': 9, 'Status': 0 }, { 'DeviceNo': 1, 'Location': 419468, 'Viewpoint': 9, 'Status': 0 }],
    'Temperature': [{ 'DeviceNo': 1, 'Location': 50795 }],
    'Humidity': [{ 'DeviceNo': 1, 'Location': 50795 }],
  },
  {
    'SegmentNo': 16,
    'ButtonId': 'SegmentBtn16',
    'Viewpoint': 10,
    'Name': 'Segment 16 KM',
    'Description': 'Starting point for the highway',
    //'Camera': [{ 'DeviceNo': 1, 'Location': 2132, 'Status': 1 }, { 'CameraNo': 2, 'Location': 2133, 'Status': 1 }],
    'Slope': [{ 'DeviceNo': 1, 'Location': 111, 'Status': 1 }, { 'DeviceNo': 2, 'Location': 111, 'Status': 1 }, { 'DeviceNo': 1, 'Location': 111, 'Status': 1 }],
    'Temperature': [{ 'DeviceNo': 1, 'Location': 50795, 'Position': 23, 'Status': 1 }, { 'DeviceNo': 2, 'Location': 50795, 'Status': 1, 'Position': 24 }, { 'DeviceNo': 3, 'Location': 50795, 'Status': 1, 'Position': 25 }],
    'Humidity': [{ 'DeviceNo': 1, 'Location': 50795 }],
  },
  {
    'SegmentNo': 17,
    'ButtonId': 'SegmentBtn17',
    'Viewpoint': 11,
    'Name': 'Segment 17 KM',
    'Description': 'Starting point for the highway',
    //'Camera': [{ 'DeviceNo': 1, 'Location': 2132 }, { 'CameraNo': 2, 'Location': 2133 }],
    'Slope': [{ 'DeviceNo': 1, 'Location': 111 }],
    'Temperature': [{ 'DeviceNo': 1, 'Location': 50795 }],
    'Humidity': [{ 'DeviceNo': 1, 'Location': 50795 }],
  }/*,
  {
    'SegmentNo': 18,
    'ButtonId': 'SegmentBtnGeneral',
    'Name': 'Highway linking Mandal and Kristiansand',
    'Description': ProjectDes,
    'Viewpoint': 0,
    'Camera': [],
    'Slope': [],
    'Temperature': [],
    'Humidity': [],
  },*/
];


class GaugeChart {
  constructor(id, label, min, max) {
    var config =
    {
      size: 120,
      label: label,
      min: undefined != min ? min : 0,
      max: undefined != max ? max : 100,
      minorTicks: 5
    }

    var range = config.max - config.min;
    config.yellowZones = [{ from: config.min + range * 0.1, to: config.min + range * 0.2 }, { from: config.min + range * 0.8, to: config.min + range * 0.9 }];
    config.redZones = [{ from: config.min, to: config.min + range * 0.1 }, { from: config.min + range * 0.9, to: config.max }];

    this.gauge = new Gauge(id, config);
    this.gauge.render();
  }


  refresh() {
    let value = 20 + 2 * Math.random();
    this.gauge.redraw(value);
  }

  startStreamData(interval = 1000) {
    setInterval(() => {
      this.refresh()
    }, interval);
  }
}


class LineChart {
  constructor(lineChartId) {
    const ctx = document.getElementById(lineChartId).getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [{
          label: 'Speed [rpm]',
          borderColor: 'rgba(255, 196, 0, 1.0)',
          backgroundColor: 'rgba(255, 196, 0, 0.5)',
          data: []
        }]
      },
      options: {
        scales: {
          xAxes: [{ type: 'realtime', realtime: { delay: 2000 } }],
          yAxes: [{ ticks: { beginAtZero: true } }]
        }
      }
    });
  }

  refreshData() {
    this.chart.data.datasets[0].data.push({
      x: Date.now(),
      y: 9750.0 + Math.random() * 500.0
    });
  }


  startStreamData(interval = 1000) {
    setInterval(() => {
      this.refreshData();
    }, interval);
  }
}



///////////////////////////////////////////////////////////////////////
/// Document ready event
///////////////////////////////////////////////////////////////////////
$(document).ready(function () {


  launchViewer('dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6M3h4YWdmZ2s2aHhyb2F0YzVhdTJwM3JoY3VncnZiYnUtaW5mcmFpb3RzYW1wbGUvMy1wMF9pbm5zeW5zbW9kZWxsLUUzOUtNLm53ZA')

  // let lineChart1 = new LineChart('chartDiv')
  // lineChart1.startStreamData();
});

function refreshTab(currentSegInfo) {

  refreshMainTab(currentSegInfo);
  // refreshCameraTab( cameraInfo );
  // refreshSlopeTab( slopeInfo );
  // refreshTemperatureTab( temperatureInfo );  

}

function refreshMainTab(segmentInfo) {

  if (segmentInfo == null) {
    console.log('input segment info is not valid');
    return;
  }

  cleanupIssuesInTab();

  $('#detail')[0].innerHTML = "<center>" + segmentInfo.Name + "</center>";
  $('#description')[0].innerHTML = "<p>" + segmentInfo.Description + "</p>";

  let cameraIndex = 0;
  for (let key in segmentInfo.Camera) {
    $('#cameraIssueRow')[0].hidden = false;
    // append the camera to the list
    let iframeElement = document.createElement('iframe')
    iframeElement.src = cameraList[cameraIndex];
    cameraIndex += 1;

    let divElement = document.createElement('div');
    divElement.align = "center";
    divElement.ondblclick = () => {
      viewer.impl.setViewFromCamera(presets_cams[5]);
      // viewer.fitToView(segmentInfo.Temperature[key].Location);
    }
    divElement.append(iframeElement);
    // TBD: Set the different color for device which has issue
    // if (segmentInfo.Camera[key].Status === 0) {
    let divColumn = document.createElement('div');
    divColumn.setAttribute('class', 'col-lg-6');
    divColumn.append(divElement);
    $('#cameraIssueRow')[0].append(divColumn);
  }



  for (let key in segmentInfo.Slope) {
    $('#slopeIssueRow')[0].hidden = false;
    // append the camera to the list
    let divElement = document.createElement('div');
    divElement.id = 'slopeIssueDev' + key;
    divElement.ondblclick = () => {
      console.log(divElement.id);
      viewer.impl.setViewFromCamera(presets_cams[segmentInfo.Slope[key].Viewpoint]);
      viewer.setThemingColor(segmentInfo.Slope[key].Location, new THREE.Vector4(1, 0, 0, 1));
      // viewer.fitToView(segmentInfo.Temperature[key].Location);
    }
    let divColumn = document.createElement('div');
    divColumn.setAttribute('class', 'col-lg-4');
    // TBD: Set the different color for device which has issue
    // if (segmentInfo.Slope[key].Status === 0) 
    divColumn.append(divElement);
    $('#slopeIssueRow')[0].append(divColumn);
    let gaugeChart1 = new GaugeChart(divElement.id, 'Force', 40, 80);
    gaugeChart1.startStreamData();
  }

  for (let key in segmentInfo.Temperature) {
    $('#temperatureIssueRow')[0].hidden = false;
    // append the camera to the list
    let divElement = document.createElement('div');
    divElement.id = 'temperatureIssueDev' + key;
    divElement.ondblclick = () => {
      console.log(divElement.id);
      viewer.impl.setViewFromCamera(presets_cams[segmentInfo.Temperature[key].Position]);
      // viewer.fitToView(segmentInfo.Temperature[key].Location);
    }
    let divColumn = document.createElement('div');
    divColumn.setAttribute('class', 'col-lg-4');
    // TBD: Set the different color for device which has issue
    // if (segmentInfo.Temperature[key].Status === 0) {
    divColumn.append(divElement);
    $('#temperatureIssueRow')[0].append(divColumn);
    let gaugeChart1 = new GaugeChart(divElement.id, 'Temperature', -10, 60);
    gaugeChart1.startStreamData();
  }
}


function cleanupIssuesInTab() {

  // remove all the dynamic elements until only text left
  let cameraIssueRow = $('#cameraIssueRow')[0];
  while (cameraIssueRow.childElementCount > 1) {
    cameraIssueRow.removeChild(cameraIssueRow.lastElementChild)
  }

  let slopeIssueRow = $('#slopeIssueRow')[0];
  while (slopeIssueRow.childElementCount > 1) {
    slopeIssueRow.removeChild(slopeIssueRow.lastElementChild)
  }

  let temperatureIssueRow = $('#temperatureIssueRow')[0];
  while (temperatureIssueRow.childElementCount > 1) {
    temperatureIssueRow.removeChild(temperatureIssueRow.lastElementChild)
  }


  // reset to hidden
  $('#cameraIssueRow')[0].hidden = true;
  $('#slopeIssueRow')[0].hidden = true;
  $('#temperatureIssueRow')[0].hidden = true;


}

function hasIssueInSegment(segmentInfo) {

  for (let key in segmentInfo.Camera) {
    if (segmentInfo.Camera[key].Status === 0) {
      return true;
    }
  }

  for (let key in segmentInfo.Slope) {
    if (segmentInfo.Slope[key].Status === 0) {
      return true;
    }
  }

  for (let key in segmentInfo.Temperature) {
    if (segmentInfo.Temperature[key].Status === 0) {
      return true;
    }
  }

  return false;
}

function initialzeSegmentBtns() {
  SegmentInfoList.forEach((segmentInfo) => {

    $('#' + segmentInfo.ButtonId)[0].onchange = () => {
      viewer.impl.setViewFromCamera(presets_cams[segmentInfo.Viewpoint]);
      refreshTab(segmentInfo);
    }

    if (hasIssueInSegment(segmentInfo)) {
      let label = $('#' + segmentInfo.ButtonId).parent();
      if (label.hasClass('btn-success')) {
        label.removeClass('btn-success');
      }
      label.addClass('btn-danger');
    }
  })
}
