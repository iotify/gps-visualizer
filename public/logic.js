Vue.use(
  new VueSocketIO({
    debug: true,
    connection: "/",
    options: {
      //path: "/my-app/"
    } //Optional options
  })
);

new Vue({
  components: {
    "l-map": window.Vue2Leaflet.LMap,
    "l-tile-layer": window.Vue2Leaflet.LTileLayer,
    "l-marker": window.Vue2Leaflet.LMarker,
    "l-polyline": window.Vue2Leaflet.LPolyline,
    "l-circle": window.Vue2Leaflet.LCircle,
    "l-popup": window.Vue2Leaflet.LPopup
  },
  el: "#example",
  sockets: {
    connect: function () {
      console.log("socket connected");
    },
    request: function (data) {
      console.log("Received", data);
      this.inited = true;
      this.logs += "\r\n" + JSON.stringify(data);
      this.$set(this.markers, data.client, data.data);
    }
  },
  methods: {
    updateIgnition: function (e) {
      this.logs += "\r\n Ignition manually set to " + this.ignition;
      this.$socket.emit("ignition", this.ignition);
    }
  },
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 10,
      inited: false,
      path: [],

      distance: 0,
      ignition: true,
      logs: "",
      location: window.location + "endpoint",
      markers: {},
      center: [47.3759831, 8.5274367]
    };
  }
});
