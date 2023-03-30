import "./styles.css";
import parse from "html-react-parser";
import round from "round";
const CfdiToJson = require("cfdi-to-json");
var jsonCfdi = null;
var ruta = "../1.xml";
// Uso con ruta del XML
jsonCfdi = CfdiToJson.parse({ path: ruta });
console.log(jsonCfdi);
var data = "";
var desc = 0;

for (let index = 0; index < jsonCfdi.conceptos.length; index++) {
  const con = jsonCfdi.conceptos[index];
  if (con.descuento) {
    desc = con.descuento / con.cantidad;
  } else {
    desc = 0;
  }
  con2 =
    "<tr><td>" +
    con.noIdentificacion +
    "</td><td>" +
    con.cantidad +
    "</td><td>" +
    con.descripcion +
    "<td>" +
    round((con.valorUnitario - desc) * (1.21 * 1.75), 10) +
    "</td></tr>";

  data += con2;
}

function dataParse() {
  const reactElement = parse(data);

  return reactElement;
}

export default function App() {
  return (
    <div className="App">
      <h2>Proveedor:{jsonCfdi.emisor.nombre}</h2>
      <h3>Fecha:{jsonCfdi.fecha}</h3>
      <br />
      ------------------------------------------------
      <table>
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Cantidad</th>
            <th>Descripcion</th>
            <th>Precio Bici-vic</th>
          </tr>
        </thead>
        <tbody>{dataParse()}</tbody>
      </table>
    </div>
  );
}
