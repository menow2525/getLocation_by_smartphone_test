let map;
var lat = 0;
var long = 0;

var accuracy = 0;
var speed = 0;

function displayMap() {
  var container = L.DomUtil.get("map");
  if (container != null) {
    container._leaflet_id = null;
  }

  map = L.map("map", {
    zoomDelta: 0.2, // ズームの変化量を調整
    zoomSnap: 0.2, // ズームスナップの設定
  }).setView([lat, long], 18);

  L.marker([lat, long]).addTo(map).bindPopup("now location!");

  //OpenStreetMapの地図
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);
}

function displayLogData() {
  document.getElementById("accuracy").textContent = accuracy.toFixed(3) + "m";
  document.getElementById("speed").textContent = speed.toFixed(digit) + "km/h";
}

navigator.geolocation.watchPosition(
  (position) => {
    lat = position.coords.latitude; // 緯度を取得
    long = position.coords.longitude; // 経度を取得
    accuracy = position.coords.accuracy; // 位置の精度取得(何メートルほど誤差があるか)
    speed = position.coords.speed; // 速度を取得

    if (accuracy == null) {
      accuracy = 999;
    }
    if (speed == null) {
      speed = 0;
    }

    displayMap();
    displayLogData();
  },
  (error) => {
    // エラー処理（今回は特に何もしない）
    console.log(error);
    error;
  },
  {
    timeout: 30000, // GPS取得のタイムアウト時間を設定するオプション。(ミリ秒)これを過ぎるとエラーになる。
    enableHighAccuracy: true, // 高精度で測定するオプション
    maximumAge: 2000,
  }
);

