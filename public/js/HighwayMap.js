$(document).ready(function () {
    SegmentInfoList.forEach((segment) => {
        let css = "";
        if (segment.Issues !== undefined) {
            if (segment.Issues.Critical != undefined)
                css = "redAlert";
            else if (segment.Issues.Medium != undefined)
                css = "yellowAlert";
        }

        let badges = "<br/>";
        if (segment.Documents !== undefined) {
            badges += '<span class="glyphicon glyphicon-file"></span>';
        }
        if (segment.Camera !== undefined) {
            badges += '<span class="glyphicon glyphicon-camera"></span>';
        }

        $('#highwaymap').append('<div class="segment ' + css + '" onclick="goToSegment(' + segment.SegmentNo + ')"> ' + segment.SegmentNo + ' km' + badges + ' </div>');
    });
});

function goToSegment(segmentNo) {
    if (!viewer) return;// model still loading...
    viewer.utilities.goHome();
    setTimeout(function () {
        viewer.impl.setViewFromCamera(presets_cams[SegmentInfoList[segmentNo].Viewpoint], false);
    }, 50);

    // clear issues
    viewer.clearThemingColors();
    const $viewer = $('div.adsk-viewing-viewer');
    $('div.adsk-viewing-viewer label.markup').remove();
    $('div.adsk-viewing-viewer div.camera').remove();

    // clear documents
    var row = $(".row").children();
    if (row.length > 1) row[1].remove();
    $(row[0]).removeClass('col-sm-8').addClass('col-sm-12 transition-width');

    setTimeout(function () { viewer.resize(); }, 1000);

    if (SegmentInfoList[segmentNo].Issues !== undefined) showIssues(segmentNo);
    if (SegmentInfoList[segmentNo].Documents !== undefined) showDocuments(segmentNo);
    if (SegmentInfoList[segmentNo].Camera !== undefined) showCamera(segmentNo);

}

function showCamera(segmentNo) {
    let cam = SegmentInfoList[segmentNo].Camera;

    const $viewer = $('div.adsk-viewing-viewer');

    //var row = $(".row").children();
    //$(row[0]).removeClass('col-sm-12').addClass('col-sm-8 transition-width').after('<div class="col-sm-4 transition-width" id="cameras"></div>');

    const tree = viewer.model.getInstanceTree();
    if (tree === undefined) { console.log('Loading tree...'); return; }
    tree.enumNodeFragments(cam[0].Location, function (fragId) {
        const pos = this.viewer.worldToClient(getModifiedWorldBoundingBox(fragId).center());
        const $label = $(`<div class="camera update" data-id="${fragId}"><iframe src="${cameraList[cam[0].DeviceNo]}" /></div>`);
        $label.css('left', Math.floor(pos.x) + 10 /* arrow image width */ + 'px');
        $label.css('top', Math.floor(pos.y) + 10 /* arrow image height */ + 'px');
        $label.css('display', viewer.isNodeVisible(fragId) ? 'block' : 'none');
        $viewer.append($label);

        viewer.addEventListener(Autodesk.Viewing.CAMERA_CHANGE_EVENT, updateMarkups);
    });
}

function showDocuments(segmentNo) {
    let docs = SegmentInfoList[segmentNo].Documents;

    var row = $(".row").children();
    $(row[0]).removeClass('col-sm-12').addClass('col-sm-8 transition-width').after('<div class="col-sm-4 transition-width" id="documents"><div id="forgeViewer2d"></div></div>');

    launchViewer2d(docs[0].urn, null, 'forgeViewer2d');
}

function showIssues(segmentNo) {
    const $viewer = $('div.adsk-viewing-viewer');
    let issues = SegmentInfoList[segmentNo].Issues.Critical || SegmentInfoList[segmentNo].Issues.Medium;
    if (issues == undefined) return;

    const issueId = issues[0];

    viewer.setThemingColor(issueId, new THREE.Vector4(1, 0, 0, 0.5));

    // adapted from https://github.com/Autodesk-Forge/forge-digital-twin/blob/master/public/scripts/extensions/issues.js
    const tree = viewer.model.getInstanceTree();
    if (tree === undefined) { console.log('Loading tree...'); return; }
    tree.enumNodeFragments(issueId, function (fragId) {
        const imgSrc = `/img/issue${issueId}.jpg`;

        const pos = this.viewer.worldToClient(getModifiedWorldBoundingBox(fragId).center());
        const $label = $(`
            <label class="markup update" data-id="${fragId}">
                Reported by John Doe
                <img class="arrow" src="/img/arrow.png" />
                <br><img class="thumbnail" src="${imgSrc}"/> 
            </label>
            `);
        $label.css('left', Math.floor(pos.x) + 10 /* arrow image width */ + 'px');
        $label.css('top', Math.floor(pos.y) + 10 /* arrow image height */ + 'px');
        $label.css('display', viewer.isNodeVisible(fragId) ? 'block' : 'none');
        $viewer.append($label);

        viewer.addEventListener(Autodesk.Viewing.CAMERA_CHANGE_EVENT, updateMarkups);
    });
}

function updateMarkups() {
    for (const label of $('div.adsk-viewing-viewer .update')) {
        const $label = $(label);
        const id = $label.data('id');
        const pos = viewer.worldToClient(getModifiedWorldBoundingBox(id).center());
        $label.css('left', Math.floor(pos.x) + 10 /* arrow image width */ + 'px');
        $label.css('top', Math.floor(pos.y) + 10 /* arrow image height */ + 'px');
        $label.css('display', viewer.isNodeVisible(id) ? 'block' : 'none');
    }
}

// adapted from https://stackoverflow.com/a/51037866/4838205
function getModifiedWorldBoundingBox(fragId) {

    //fragments list array
    var fragList = viewer.model.getFragmentList();
    const fragbBox = new THREE.Box3()
    const nodebBox = new THREE.Box3()

    fragList.getWorldBounds(fragId, fragbBox);
    nodebBox.union(fragbBox);

    return nodebBox
}