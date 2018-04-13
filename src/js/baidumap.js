function initMap(markerArr, level) {
    // 百度地图API功能
    var map = new BMap.Map("map_list");
    var myIcon = new BMap.Icon("./assets/images/moredata_map.png", new BMap.Size(30, 39));
    map.enableScrollWheelZoom(true);
    var points = [];
    for (var i = 0; i < markerArr.length; i++) {
        var sid = markerArr[i].sid;
        var pArray = markerArr[i].point.split(",");
        var p0 = pArray[0];
        var p1 = pArray[1];
        var address = markerArr[i].address;
        var title = markerArr[i].title;
        var icon = markerArr[i].icon;
        var sContent =
            '<div style="padding: 20px 0 10px 20px"><img style="display:block" id="imgDemo" src="' + icon + '" width="180" height="140"/>' +
            '<p style="margin-top:14px; font-size:14px; width: 180px;">' + title + '</p>';
        if (address != null) {
            sContent += ('<p style="font-size: 12px; color: #666; width: 180px;">' + address + '</p>');
        }
        sContent += '</div>';
        var point = new BMap.Point(p0, p1);
        points.push(point);
        addMarker(map, sid, point, sContent, title, myIcon);
    }
    var view = map.getViewport(eval(points));
    var mapZoom = view.zoom;
    var centerPoint = view.center;
    if (typeof(level) != 'undefined' && markerArr.length == 1) {
        mapZoom = level;
    }
    if (mapZoom > 12) {
        mapZoom = 12;
    }
    map.centerAndZoom(centerPoint, mapZoom);
    var top_right_navigation = new BMap.NavigationControl({ anchor: BMAP_ANCHOR_TOP_LEFT, type: BMAP_NAVIGATION_CONTROL_ZOOM }); //左上角，仅包含平移和缩放按钮
    map.addControl(top_right_navigation);
}

// 编写自定义函数,创建标注
function addMarker(map, sid, point, sContent, title, myIcon) {
    // 自定义图片修改这句
    var marker = new BMap.Marker(point, { icon: myIcon });
    map.addOverlay(marker);

    var infoWindow = new BMap.InfoWindow(sContent); // 创建信息窗口对象
    // 添加marker点击事件
    marker.addEventListener("click", function() {
        this.openInfoWindow(infoWindow);
        //图片加载完毕重绘infowindow
        document.getElementById('imgDemo').onload = function() {
            infoWindow.redraw(); //防止在网速较慢，图片未加载时，生成的信息框高度比图片的总高度小，导致图片部分被隐藏
        }
    });

    var titleLength = title.length;
    var label = new BMap.Label(title, { offset: new BMap.Size(-titleLength * 7, -35) });
    label.setStyle({
        color: "#666",
        fontSize: "14px",
        paddingLeft: "10px",
        paddingRight: "10px",
        height: "30px",
        lineHeight: "24px",
        border: "none",
        backgroundColor: "#FFFFFF",
        fontFamily: "PingFang SC, Helvetica Neue, Helvetica, Arial, Hiragino Sans GB, Microsoft YaHei, STHeiti, sans-serif"
    });
    marker.setLabel(label);
}