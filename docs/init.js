function init() {
    console.log("Starting");
    //$("#mainTable").text("Loading...");
    const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTjaZakAkFHBpOAyB2f9IIVxImvySfK-4M26x4gew5iY8fdn-tbXMIYUZ05_z8XUULw6Hk8sv1dXLvq/pub?output=csv";
    const data = Papa.parse(csvUrl, {download: true, header: true,
        complete: function(result){
            const columnOptionsMap = new Map();
            Object.keys(result.data[0]).forEach((key) => { 
                columnOptionsMap.set(key, { name: key, title: key, data: key });
            });

            columnOptionsMap.get("Commit").render = (x) => `<a href="https://chromium.googlesource.com/chromium/src.git/+/${x}">${x.slice(0, 8)}</a>`

            //columnOptionsMap.get("Date").render = DataTable.render.datetime("MM/DD/YYYY");

            columnOptionsMap.get("Android").className = "platformIcon"
            columnOptionsMap.get("CrOS").className = "platformIcon"
            columnOptionsMap.get("Fuchsia").className = "platformIcon"
            columnOptionsMap.get("iOS").className = "platformIcon"
            columnOptionsMap.get("Lacros").className = "platformIcon"
            columnOptionsMap.get("Linux").className = "platformIcon"
            columnOptionsMap.get("Mac").className = "platformIcon"
            columnOptionsMap.get("Windows").className = "platformIcon"

            // TODO: replace with render generator
            columnOptionsMap.get("Android").render = (x, t) => t === "display" ? (x === "TRUE" ? `<img src="static/img/android.png" />` : "") : x;
            columnOptionsMap.get("CrOS").render = (x, t) => t === "display" ? (x === "TRUE" ? `<img src="static/img/cros.png" />` : "") : x;
            columnOptionsMap.get("Fuchsia").render = (x, t) => t === "display" ? (x === "TRUE" ? `<img src="static/img/fuchsia.png" />` : "") : x;
            columnOptionsMap.get("iOS").render = (x, t) => t === "display" ? (x === "TRUE" ? `<img src="static/img/ios.png" />` : "") : x;
            columnOptionsMap.get("Lacros").render = (x, t) => t === "display" ? (x === "TRUE" ? `<img src="static/img/lacros.png" />` : "") : x;
            columnOptionsMap.get("Linux").render = (x, t) => t === "display" ? (x === "TRUE" ? `<img src="static/img/linux.png" />` : "") : x;
            columnOptionsMap.get("Mac").render = (x, t) => t === "display" ? (x === "TRUE" ? `<img src="static/img/macos.png" />` : "") : x;
            columnOptionsMap.get("Windows").render = (x, t) => t === "display" ? (x === "TRUE" ? `<img src="static/img/windows.png" />` : "") : x;

            const dataTable = new DataTable("#mainTable", {
                data: result.data,
                fixedHeader: true,
                responsive: true,
                columns: columnOptionsMap.values().toArray()
            });
            debugger;
        }
    });
}
