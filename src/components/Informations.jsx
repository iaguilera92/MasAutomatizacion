import { Box, Typography, Container, Grid, Button, ListItem, ListItemIcon, ListItemText, useMediaQuery, useTheme, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { useInView } from 'react-intersection-observer';  // Importa el hook
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./css/Informations.css"; // Importamos el CSS
import "swiper/css";
import BoltIcon from '@mui/icons-material/Bolt';
import EngineeringIcon from '@mui/icons-material/Engineering';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

const promotions = [
  {
    title: "AUTOMATIZACIÓN Y CONTROL",
    description: "Diseño y desarrollo de sitios web modernos y rápidos para todos los dispositivos.",
    image: "/Informations-1.webp",
    bgColor: "linear-gradient(180deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3))",
    textColor: "white",
    descriptors: [
      "Especificaciones Técnicas Sistemas de Control.",
      "Diagramas P&ID.",
      "DataSheet Instrumentación.",
      "Diseño y Evaluación Redes de control."
    ]
  },
  {
    title: "ELÉCTRICA",
    description: "Tienda online, pagos seguros y seguimiento de pedidos. Compra rápido y sin complicaciones.",
    image: "/Informations-2.jpg",
    bgColor: "linear-gradient(180deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2))",
    textColor: "white",
    descriptors: [
      "Especificaciones Técnicas Generales.",
      "Memorias de Cálculo.",
      "Diseño y Desarrollo Sistemas SCADA.",
      "Desarrollo de Planes de Seguridad Eléctrica."
    ]
  },
  {
    title: "EVALUACIÓN Y GESTIÓN DE PROYECTOS",
    description: "Desarrollo de sistemas a la medida, eficientes, escalables y adaptados a tus necesidades.",
    image: "/Informations-3.webp",
    bgColor: "linear-gradient(180deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2))",
    textColor: "white",
    descriptors: [
      "Evaluación Financiera de Proyectos.",
      "Gestión de Proyectos.",
      "Capacitación Gestión del Proyectos y Software."
    ]
  }
];



const Informations = () => {
  // Controla la vista del componente
  const [isGrabbing, setIsGrabbing] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1, // Se activa cuando el 20% del componente es visible
    triggerOnce: true, // La animación ocurre solo una vez
  });
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showArrow, setShowArrow] = useState(true);

  const [swiperInstance, setSwiperInstance] = useState(null);
  const { ref: swiperRef, inView: swiperInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });
  const [hasAnimated, setHasAnimated] = useState(false);


  useEffect(() => {
    if (inView) {
      setShouldAnimate(true); // 🔹 Activa la animación cuando el componente es visible
    }
  }, [inView]);

  //ANIMACIÓN DESCRIPTORES
  useEffect(() => {
    if (swiperInView && swiperInstance && !hasAnimated) {
      swiperInstance.slideTo(0, 1500); // mueve del último al primero
      setHasAnimated(true);
    }
  }, [swiperInView, swiperInstance, hasAnimated]);

  return (
    <Box
      sx={{
        position: "relative", // 🆕 necesario para controlar el zIndex
        zIndex: 10,            // 🆕 alto para sobresalir
        backgroundImage: 'url(fondo-blizz.avif)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        py: 8,
        pt: 5,
        marginTop: "-90px",
        marginBottom: "-10px",
        color: "white",
        borderRadius: isMobile ? '90px' : '120px',
        overflow: 'hidden',
      }}
    >
      <Container sx={{ textAlign: "center", color: "white", maxWidth: "1400px !important", }}>

        <Box sx={{ position: "relative", textAlign: "center", mb: 2 }}>

          <Box
            ref={ref} // 🔹 Conecta el detector de scroll
            sx={{
              width: 25,
              height: 25,
              borderRadius: "50%",
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid white",
              mx: "auto",
              mb: 0.5,
            }}
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={shouldAnimate ? { rotate: 360 } : {}} // 🔹 Solo se activa cuando `shouldAnimate` es `true`
              transition={{
                duration: 0.3,
                delay: 0.3,
                repeat: 2, // Se repite una vez más (total: dos veces)
                ease: "linear", // Movimiento fluido
              }}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <BoltIcon sx={{ color: 'black', fontSize: 24 }} />
            </motion.div>
          </Box>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Typography
              variant="h4"
              gutterBottom
              sx={{
                fontFamily: "'Montserrat', Helvetica, Arial, sans-serif !important",
                fontSize: { xs: "1.5rem", md: "2rem" },
                paddingLeft: { xs: "100px", md: "30px" },
                paddingRight: { xs: "100px", md: "30px" },
                letterSpacing: "3px",
                my: 0,
                display: "inline-block",
                position: "relative",
                zIndex: 1,
                backgroundColor: "transparent",
                color: "white",
                "::after": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: "-5px",
                  height: "10px",
                  backgroundColor: "transparent",
                  zIndex: 2,
                },
              }}
            >
              Soluciones en Ingeniería y Automatización
            </Typography>
          </motion.div>

          {/* Línea debajo del título con animación (con retraso de 2 segundos) */}
          <motion.hr
            initial={{ opacity: 0 }} // Comienza invisible
            animate={shouldAnimate ? { opacity: 1 } : {}} // Aparece completamente
            transition={{ duration: 0.8, delay: 1 }} // Aparece después de 1s y dura 1s
            style={{
              position: "absolute",
              top: isMobile ? "calc(80% - 30px)" : "calc(100% - 30px)", // Ajusta la posición
              left: "5%",
              width: "90%", // Mantiene su tamaño desde el inicio
              border: "1px solid white",
              zIndex: 0,
              background: "white",
              clipPath: "polygon(0% 0%, 0% 0%, 15% 100%, 0% 100%, 0% 0%, 100% 0%, 84% 100%, 100% 100%, 100% 0%)",
            }}
          />

        </Box>
        <Grid container spacing={3} sx={{ mt: 2 }}>

          {/* Columna de los íconos */}
          <Grid item xs={12} md={6} ref={ref}>
            {[
              {
                icon: <EngineeringIcon sx={{ color: "white", fontSize: "2.2rem" }} />,
                text: "Servicios de Ingeniería.",
                desc: "Soluciones integrales para tus proyectos de ingeniería técnica.",
                hideLine: false,
              },
              {
                icon: <TrackChangesIcon sx={{ color: "white", fontSize: "2.2rem" }} />,
                text: "Control de Procesos.",
                desc: "Optimizamos y automatizamos procesos para mayor eficiencia.",
                hideLine: false,
              },
              {
                icon: <LightbulbIcon sx={{ color: "white", fontSize: "2.2rem" }} />,
                text: "Especialidad Eléctrica.",
                desc: "Diseño e implementación de soluciones eléctricas seguras.",
                hideLine: false,
              },
              {
                icon: <BoltIcon sx={{ color: "white", fontSize: "2.2rem" }} />,
                text: "Eléctricos.",
                desc: "Soluciones eficientes en sistemas y equipos eléctricos.",
                hideLine: true, // Último ítem sin línea hacia abajo
              },
            ].map((item, index) => {
              const hasLineAbove = index !== 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    delay: 0.5 * index, // Círculo aparece primero
                    duration: 0.5,      // Un poco más corto
                  }}
                >
                  <ListItem sx={{ display: "flex", alignItems: "center", zIndex: 2 }}>
                    <ListItemIcon sx={{ zIndex: 2 }}>
                      <Box
                        sx={{
                          position: "relative",
                          width: 100,
                          height: 85, // antes era 100
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {/* LÍNEA QUE SUBE DESDE EL CÍRCULO ACTUAL */}
                        {!item.hideLine && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={shouldAnimate ? { height: 40 } : { height: 0 }}
                            transition={{
                              delay: 0.5 * index,
                              duration: 1,
                              ease: "easeInOut",
                            }}
                            style={{
                              position: "absolute",
                              top: "80%",
                              left: "50%",
                              transform: "translateX(-50%)",
                              width: "2px",
                              backgroundImage: "linear-gradient(white 40%, rgba(255,255,255,0) 0%)",
                              backgroundPosition: "left",
                              backgroundSize: "2px 6px", // grosor y separación
                              backgroundRepeat: "repeat-y",
                              zIndex: 1,
                            }}
                          />

                        )}


                        {/* CÍRCULO CON ÍCONO */}
                        <Box
                          sx={{
                            width: 70,
                            height: 70,
                            borderRadius: "50%",
                            border: "2px solid white",
                            backgroundColor: "#072138",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative",
                            zIndex: 2,
                          }}
                        >
                          {item.icon}

                          {/* Efecto de pulsación */}
                          <motion.div
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                              borderRadius: "50%",
                              backgroundColor: "rgba(255, 255, 255, 0.2)",
                              zIndex: 1,
                              animation: "pulsacion 1s ease-in-out 0.1s infinite",
                            }}
                          />
                        </Box>
                      </Box>
                    </ListItemIcon>

                    <ListItemText
                      sx={{
                        fontFamily: "'Montserrat', Helvetica, Arial, sans-serif !important",
                        "& .MuiListItemText-primary": {
                          fontSize: "1.2rem",
                        },
                        "& .MuiListItemText-secondary": {
                          color: "white",
                        },
                      }}
                      primary={item.text}
                      secondary={item.desc}
                    />
                  </ListItem>
                </motion.div>
              );
            })}
          </Grid>



          {/* Columna de los descriptores */}
          <Grid item xs={12} md={6}>
            <Box ref={swiperRef} sx={{ display: isMobile ? "block" : "block", position: "relative", px: 1, pt: 3, pb: 1.5 }}>
              <Swiper
                spaceBetween={20}
                slidesPerView={1.2}
                onSwiper={setSwiperInstance}
                initialSlide={promotions.length - 1} // Comienza en el último
                centeredSlides={false}
                pagination={{ clickable: true }}
                onSlideChange={(swiper) => {
                  const index = swiper.activeIndex;
                  setShowArrow(index !== 2);
                }}
              >
                {promotions.map((promo, index) => (
                  <SwiperSlide key={index}>
                    <Box
                      sx={{
                        width: "100%",
                        height: "360px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        backgroundImage: `url(${promo.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        borderRadius: "16px",
                        position: "relative",
                        overflow: "hidden",
                        color: "white",
                        p: 0.5,
                        cursor: isGrabbing ? 'grabbing' : 'grab', // 👈 cursor de mano abierta y cerrada
                        transition: 'cursor 0.2s ease'
                      }}
                      onPointerDown={() => setIsGrabbing(true)}
                      onPointerUp={() => setIsGrabbing(false)}
                      onPointerLeave={() => setIsGrabbing(false)}
                    >


                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          background: "linear-gradient(180deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0))",
                          zIndex: 2
                        }}
                      />
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center', // centra horizontalmente
                          justifyContent: 'center', // centra verticalmente si el contenedor lo permite
                          textAlign: 'center',
                          mb: 2
                        }}
                        onPointerDown={() => setIsGrabbing(true)}
                        onPointerUp={() => setIsGrabbing(false)}
                        onPointerLeave={() => setIsGrabbing(false)}
                      >
                        {/* Contenido */}
                        <Box sx={{ zIndex: 2, textAlign: "center", padding: 0 }}>
                          <Typography variant="h6" sx={{ mt: 4, fontWeight: "bold", fontSize: "20px", fontFamily: "inherit" }}>
                            {promo.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: {
                                xs: '0.85rem',
                                sm: '0.95rem'
                              },
                              maxWidth: 400,
                              color: 'white'
                            }}
                          >
                            {promo.description}
                          </Typography>

                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.2, mt: 1, ml: 0 }}>
                            {promo.descriptors?.map((text, index) => (
                              <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box
                                  sx={{
                                    width: 16,
                                    height: 16,
                                    borderRadius: '50%',
                                    bgcolor: 'black',
                                    color: 'white',
                                    fontSize: 10,
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mr: 0.5
                                  }}
                                >
                                  {index + 1}
                                </Box>
                                <Typography variant="caption" sx={{ fontSize: '0.82rem', color: 'white', textAlign: 'left' }}>
                                  {text}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </SwiperSlide>
                ))}
              </Swiper>

              {showArrow && (
                <motion.div
                  animate={{
                    x: [0, 5, 0], // Flota hacia la derecha y vuelve
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: 2,
                    ease: "easeInOut",
                  }}
                  style={{
                    position: "absolute",
                    top: -12,
                    right: 10,
                    zIndex: 10,
                  }}
                >
                  <IconButton
                    sx={{
                      color: "white",
                      transition: "opacity 0.3s ease-in-out",
                      backgroundColor: "transparent",
                      boxShadow: "none",
                      padding: 0,
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    <ArrowForwardIcon fontSize="large" sx={{ fontSize: "23px" }} />
                  </IconButton>
                </motion.div>
              )}
            </Box>
          </Grid>




        </Grid>



      </Container>
    </Box>
  );
};

export default Informations;
