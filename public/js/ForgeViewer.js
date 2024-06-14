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

var viewer;
var viewer2d;
var presets_cams = [];

// @urn the model to show
// @viewablesId which viewables to show, applies to BIM 360 Plans folder
function launchViewer(urn, viewableId) {

  /*
  OTG
  var options = {
    useADP: false,
    env: "FluentProduction",
    api: 'fluent',
    getAccessToken: getForgeToken,
    isAEC: true,
    applyRefPoint: true,
    globalOffset: { x: 0, y: 0, z: 0 }
    //useCredentials: true,
  };

  if (location.hash=="#svf") {
    options.env = "AutodeskProduction";
    options.api = "";   
  }
  */
  var options = {
    env: 'AutodeskProduction2',
    api:'streamingV2',
    getAccessToken: getForgeToken,
    //api: 'derivativeV2' + (atob(urn.replace('_', '/')).indexOf('emea') > -1 ? '_EU' : '') // handle BIM 360 US and EU regions
  };


  Autodesk.Viewing.Initializer(options, () => {
    viewer = new Autodesk.Viewing.GuiViewer3D(document.getElementById("forgeViewer"));
    viewer.start();
    var documentId = 'urn:' + urn;
    Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
  });

  function onDocumentLoadSuccess(doc) {
    // if a viewableId was specified, load that view, otherwise the default view
    var viewables = (viewableId ? doc.getRoot().findByGuid(viewableId) : doc.getRoot().getDefaultGeometry());
    viewer.loadDocumentNode(doc, viewables).then(i => {
      // The original viewer.model.getData().cameras does not include these pre-saved cameras due to 
      // "Make Viewpoints Great Again" initiative, details https://autodesk.slack.com/archives/C0FL5BJF7/p1718032639044439?thread_ts=1505938820.000202&cid=C0FL5BJF7
      let viewpoints = viewer.model.getData().viewpoints;
      const gOffset = viewer.model.getData().globalOffset;
      const gOffsetVector = new THREE.Vector3( gOffset.x, gOffset.y, gOffset.z);
      for( let viewpoint of viewpoints ){
        // the target, position and up are just simple object instead of THREE.Vector3, convert to THREE.Vector3 to avoid issues
        let newCamera = viewpoint.camera;
        newCamera.target = new THREE.Vector3(newCamera.target.x, newCamera.target.y, newCamera.target.z).sub(gOffsetVector); 
        newCamera.position = new THREE.Vector3(newCamera.position.x, newCamera.position.y, newCamera.position.z ).sub(gOffsetVector); 
        newCamera.up = new THREE.Vector3(newCamera.up.x, newCamera.up.y, newCamera.up.z); 
        presets_cams.push(newCamera)
      }
      if (initialzeSegmentBtns) initialzeSegmentBtns();
      //alert('Viewer is initialized');
    });
  }

  function onDocumentLoadFailure(viewerErrorCode) {
    console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
  }
}

function getForgeToken(callback) {
  fetch('/api/forge/oauth/token').then(res => {
    res.json().then(data => {
      callback(data.access_token, data.expires_in);
    });
  });
}

function launchViewer2d(urn, viewableId, div) {
  var options = {
    env: 'AutodeskProduction2',
    api:'streamingV2',
    getAccessToken: getForgeToken,
    //api: 'derivativeV2' + (atob(urn.replace('_', '/')).indexOf('emea') > -1 ? '_EU' : '') // handle BIM 360 US and EU regions
  };

  Autodesk.Viewing.Initializer(options, () => {
    viewer2d = new Autodesk.Viewing.GuiViewer3D(document.getElementById(div));
    viewer2d.start();
    var documentId = 'urn:' + urn;
    Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
  });

  function onDocumentLoadSuccess(doc) {
    // if a viewableId was specified, load that view, otherwise the default view
    var viewables = (viewableId ? doc.getRoot().findByGuid(viewableId) : doc.getRoot().getDefaultGeometry());
    viewer2d.loadDocumentNode(doc, viewables).then(i => {
      // any additional action here?
    });
  }

  function onDocumentLoadFailure(viewerErrorCode) {
    console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
  }
}