// src/router.jsx
import { Navigate, createBrowserRouter, useOutletContext } from "react-router-dom";
import { lazy, Suspense } from "react";
import App from "./App";

// ✅ Carga dinámica de componentes de rutas
const Servicios = lazy(() => import("./components/Servicios"));
const Nosotros = lazy(() => import("./components/Nosotros"));
const Contacto = lazy(() => import("./components/Contacto"));
const Administracion = lazy(() => import("./components/Administracion"));
const Home = lazy(() => import("./components/Home"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const ConfigurarServicios = lazy(() => import("./components/configuraciones/ConfigurarServicios"));

// ✅ Función para proteger rutas con autenticación
const isAuthenticated = () => {
    const creds = sessionStorage.getItem("credenciales");
    return creds !== null;
};

const ProtectedRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/administracion" replace />;
};

// ✅ HOC para envolver cualquier componente con Suspense
const withSuspense = (Component) => (
    <Suspense fallback={null}>
        <Component />
    </Suspense>
);

// 👇 Wrapper para pasar los refs desde el contexto de App
function HomeWrapper() {
    const { contactoRef, informationsRef, setVideoReady } = useOutletContext();
    return (
        <Suspense fallback={null}>
            <Home contactoRef={contactoRef} informationsRef={informationsRef} setVideoReady={setVideoReady} />
        </Suspense>
    );
}

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
            children: [
                { path: "", element: <HomeWrapper /> },
                { path: "servicios", element: withSuspense(Servicios) },
                { path: "nosotros", element: withSuspense(Nosotros) },
                { path: "contacto", element: withSuspense(Contacto) },
                { path: "administracion", element: withSuspense(Administracion) },
                { path: "dashboard", element: withSuspense(Dashboard) },
                {
                    path: "configurar-servicios",
                    element: (
                        <ProtectedRoute>
                            {withSuspense(ConfigurarServicios)}
                        </ProtectedRoute>
                    ),
                },
            ],
        },
    ],
    {
        future: {
            v7_startTransition: true,
        },
    }
);

export default router;
