import MainLayout from "../layouts/MainLayout";
import { useLocation } from "react-router-dom";
import Tabla from "../components/Tabla";

export default function MisCompras() {
    // const [avance, setAvance] = useState(0)
    const location = useLocation()
    const { results, count, Direccion, Pagos  } = location.state || {}

  return (
    <MainLayout>
        <Tabla results={results} count={count} Direccion={Direccion} Pagos={Pagos}></Tabla>
    </MainLayout>
  );
}
