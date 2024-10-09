let map;
var lat = 0;
var long = 0;

var accuracy = 0;
var speed = 0;

var pulsingIcon2 = L.icon.pulse({
    iconSize:[20,20]
   ,color:'#57c6fd'
   ,fillColor:'#57c6fd'
   ,heartbeat: 2
});

window.onload = function() {
  var container = L.DomUtil.get("map");
  if (container != null) {
    container._leaflet_id = null;
  }

  map = L.map("map", {
    zoomDelta: 0.2, // ズームの変化量を調整
    zoomSnap: 0.2, // ズームスナップの設定
  }).setView([lat, long], 18);
    
    //OpenStreetMapの地図
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
}

function displayMap() {
  map.removeLayer(pulsingIcon2);
  L.marker([lat, long], {icon:pulsingIcon2}).addTo(map).bindPopup("now location!");
}

function displayLogData() {
  document.getElementById("accuracy").textContent = accuracy.toFixed(3) + "m";
  document.getElementById("speed").textContent = speed.toFixed(0) + "km/h";
}

navigator.geolocation.watchPosition(
  (position) => {
    lat = position.coords.latitude; // 緯度を取得
    long = position.coords.longitude; // 経度を取得
    accuracy = position.coords.accuracy; // 位置の精度取得(何メートルほど誤差があるか)
    speed = ((position.coords.speed) * 3600) / 1000; // 速度を取得

    if (accuracy == null) {
      accuracy = 999.9;
    }
    if (speed == null) {
      speed = 0;
    }

    displayMap();
    displayLogData();
  },
  (error) => {
    // エラー処理（今回は特に何もしない）
    alert(error);
    error;
  },
  {
    enableHighAccuracy: true, // 高精度で測定するオプション
    maximumAge: 60000,
    timeout: 30000, // GPS取得のタイムアウト時間を設定するオプション。(ミリ秒)これを過ぎるとエラーになる。
  }
);

