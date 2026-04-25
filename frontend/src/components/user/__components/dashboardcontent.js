import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Toolbar,
  Avatar,
  IconButton,
  Badge,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import GroupIcon from "@mui/icons-material/Group";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import RouteIcon from "@mui/icons-material/Route";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import CancelIcon from "@mui/icons-material/Cancel";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function DashboardContent({ users = [] }) {
  const [conducteurs, setConducteurs] = useState([]);
  const [passagers, setPassagers] = useState([]);
  const [acceptedCount, setAcceptedCount] = useState(0);
  const [refusedCount, setRefusedCount] = useState(0);
  const [topCities, setTopCities] = useState([]);
  const [totalTrajets, setTotalTrajets] = useState(0);
  const [totalReservations, setTotalReservations] = useState(0);
  const [trajetsStats, setTrajetsStats] = useState({
    total: 0,
    valides: 0,
    rejetes: 0,
    enAttente: 0,
  });

  const [reservationStats, setReservationStats] = useState({
    total: 0,
    enAttente: 0,
    acceptees: 0,
    refusees: 0,
  });

  useEffect(() => {
    fetch("http://localhost:3004/conducteurs/all")
      .then((res) => res.json())
      .then(setConducteurs)
      .catch(console.error);

    fetch("http://localhost:3004/passagers/all")
      .then((res) => res.json())
      .then(setPassagers)
      .catch(console.error);

    fetch("http://localhost:3004/reservations/count/accepted")
      .then((res) => res.json())
      .then((data) => setAcceptedCount(data.total_accepted))
      .catch(console.error);

    fetch("http://localhost:3004/reservations/count/refused")
      .then((res) => res.json())
      .then((data) => setRefusedCount(data.total_refused))
      .catch(console.error);

    fetch("http://localhost:3004/top-arrivees")
      .then((res) => res.json())
      .then(setTopCities)
      .catch(console.error);

    fetch("http://localhost:3004/trajets/count/all")
      .then((res) => res.json())
      .then((data) => setTotalTrajets(data.total))
      .catch(console.error);

    fetch("http://localhost:3004/reservations/count/all")
      .then((res) => res.json())
      .then((data) => setTotalReservations(data.total))
      .catch(console.error);

    fetch("http://localhost:3004/trajets/count/by-status")
      .then((res) => res.json())
      .then((data) => setTrajetsStats(data))
      .catch(console.error);

    fetch("http://localhost:3004/reservations/count/by-status")
      .then((res) => res.json())
      .then((data) => setReservationStats(data))
      .catch(console.error);
  }, []);

  const reservationData = [
    { name: "Acceptées", value: reservationStats.acceptees },
    { name: "Refusées", value: reservationStats.refusees },
    { name: "En attente", value: reservationStats.enAttente },
  ];

  const reservationColors = ["#1976d2", "#d32f2f", "#ff9800"];

  const userBreakdown = [
    { name: "Conducteurs", value: conducteurs.length },
    { name: "Passagers", value: passagers.length },
  ];

  const reservationBarData = [
    {
      name: "Réservations",
      Acceptées: acceptedCount,
      Refusées: refusedCount,
    },
  ];

  const barColors = {
    Acceptées: "#1976d2",
    Refusées: "#d32f2f",
  };

  const cityBreakdown = topCities.map((city) => ({
    name: city.ville,
    value: city.total,
  }));

  const cityColors = ["#4caf50", "#ff9800", "#ff7043", "#9575cd", "#26a69a"];

  const userColors = ["#81c784", "#ffb74d"];

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        sx={{ backgroundColor: "rgba(255,255,255,0.7)", zIndex: 1 }}
      />

      <Box position="absolute" top={20} right={30} zIndex={3}>
        <IconButton color="primary">
          <Badge badgeContent={3} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Box>

      <Box component="main" flexGrow={1} p={4} position="relative" zIndex={2}>
        <Toolbar />
        <Typography
          variant="h1"
          fontWeight="bold"
          mb={4}
          sx={{
            textAlign: "left",
            fontFamily: "'Roboto', sans-serif",
            letterSpacing: "2px",
            color: "#333",
            textShadow: "2px 2px 8px rgba(42, 122, 234, 0.1)",
            fontSize: "2.5rem",
          }}
        >
          Dashboard Administrateur
        </Typography>

        {/* Première ligne : cartes statistiques */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} md={4}>
            <Card sx={cardSx}>
              <CardContent sx={cardContentSx}>
                <AccountCircleIcon fontSize="large" sx={{ mr: 1, color: "#1976d2" }} />
                <Typography variant="h6">Utilisateurs: {users.length - 1}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={cardSx}>
              <CardContent sx={cardContentSx}>
                <DriveEtaIcon fontSize="large" sx={{ mr: 1, color: "#43a047" }} />
                <Typography variant="h6">Conducteurs: {conducteurs.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={cardSx}>
              <CardContent sx={cardContentSx}>
                <GroupIcon fontSize="large" sx={{ mr: 1, color: "#fb8c00" }} />
                <Typography variant="h6">Passagers: {passagers.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={cardSx}>
              <CardContent sx={cardContentSx}>
                <CheckCircleIcon fontSize="large" sx={{ mr: 1, color: "#4caf50" }} />
                <Typography variant="h6" fontWeight="bold">
                  Réservations Acceptées: {acceptedCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={cardSx}>
              <CardContent sx={cardContentSx}>
                <CancelIcon fontSize="large" sx={{ mr: 1, color: "#d32f2f" }} />
                <Typography variant="h6" fontWeight="bold" color="error">
                  Réservations Refusées: {refusedCount}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Deuxième ligne : graphiques */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card sx={chartCardSx}>
              <CardContent>
                <Typography variant="h6" textAlign="center" mb={2}>
                  Répartition Conducteurs vs Passagers
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={userBreakdown}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {userBreakdown.map((entry, idx) => (
                        <Cell
                          key={entry.name}
                          fill={userColors[idx]}
                          stroke="#fff"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [value, ""]}
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #eee",
                        borderRadius: "4px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Legend verticalAlign="bottom" height={36} wrapperStyle={{ paddingTop: "20px" }} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Statistiques des Trajets */}
          <Grid item xs={12} md={4} width="550px">
            <Card sx={chartCardSx}>
              <CardContent>
                <Typography variant="h6" mb={2} fontWeight="medium">
                  Statistiques des Trajets
                </Typography>

                <Box mb={3}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1" color="textSecondary">
                      Trajets acceptés
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <Typography variant="h5" fontWeight="bold" color="success.main">
                        {trajetsStats.valides}
                      </Typography>
                    </Box>
                  </Box>
                  <Box mt={1}>
                    <Typography variant="caption" color="textSecondary">
                      {trajetsStats.total > 0
                        ? Math.round((trajetsStats.valides / trajetsStats.total) * 100)
                        : 0}
                      % du total
                    </Typography>
                  </Box>
                </Box>

                <Box mb={3}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1" color="textSecondary">
                      Trajets refusés
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <Typography variant="h5" fontWeight="bold" color="error.main">
                        {trajetsStats.rejetes}
                      </Typography>
                    </Box>
                  </Box>
                  <Box mt={1}>
                    <Typography variant="caption" color="textSecondary">
                      {trajetsStats.total > 0
                        ? Math.round((trajetsStats.rejetes / trajetsStats.total) * 100)
                        : 0}
                      % du total
                    </Typography>
                  </Box>
                </Box>

                <Box>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1" color="textSecondary">
                      En attente
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <Typography variant="h5" fontWeight="bold" color="warning.main">
                        {trajetsStats.enAttente}
                      </Typography>
                    </Box>
                  </Box>
                  <Box mt={1}>
                    <Typography variant="caption" color="textSecondary">
                      {trajetsStats.total > 0
                        ? Math.round((trajetsStats.enAttente / trajetsStats.total) * 100)
                        : 0}
                      % du total
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Troisième ligne */}
        <Grid container spacing={6}>
          <Grid item xs={12} md={6} width="550px">
            <Card sx={chartCardSx}>
              <CardContent>
                <Typography variant="h6" mb={2} fontWeight="medium">
                  Réservations acceptées vs refusées
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={reservationBarData}>
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend verticalAlign="bottom" />
                    {Object.keys(barColors).map((key) => (
                      <Bar key={key} dataKey={key} fill={barColors[key]} />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card sx={chartCardSx}>
              <CardContent>
                <Typography variant="h6" textAlign="center" mb={2}>
                  Villes d'arrivée les plus fréquentes
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={cityBreakdown}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {cityBreakdown.map((entry, idx) => (
                        <Cell key={entry.name} fill={cityColors[idx % cityColors.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Statistiques des Réservations */}
          <Grid item xs={12} md={4} width="550px">
            <Card sx={chartCardSx}>
              <CardContent>
                <Typography variant="h6" mb={2} fontWeight="medium">
                  Statistiques des Réservations
                </Typography>

                <Box mb={3}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1" color="textSecondary">
                      Réservations acceptées
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <Typography variant="h5" fontWeight="bold" color="success.main">
                        {reservationStats.acceptees}
                      </Typography>
                    </Box>
                  </Box>
                  <Box mt={1}>
                    <Typography variant="caption" color="textSecondary">
                      {reservationStats.total > 0
                        ? Math.round((reservationStats.acceptees / reservationStats.total) * 100)
                        : 0}
                      % du total
                    </Typography>
                  </Box>
                </Box>

                <Box mb={3}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1" color="textSecondary">
                      Réservations refusées
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <Typography variant="h5" fontWeight="bold" color="error.main">
                        {reservationStats.refusees}
                      </Typography>
                    </Box>
                  </Box>
                  <Box mt={1}>
                    <Typography variant="caption" color="textSecondary">
                      {reservationStats.total > 0
                        ? Math.round((reservationStats.refusees / reservationStats.total) * 100)
                        : 0}
                      % du total
                    </Typography>
                  </Box>
                </Box>

                <Box>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1" color="textSecondary">
                      En attente
                    </Typography>
                    <Box display="flex" alignItems="center">
                      <Typography variant="h5" fontWeight="bold" color="warning.main">
                        {reservationStats.enAttente}
                      </Typography>
                    </Box>
                  </Box>
                  <Box mt={1}>
                    <Typography variant="caption" color="textSecondary">
                      {reservationStats.total > 0
                        ? Math.round((reservationStats.enAttente / reservationStats.total) * 100)
                        : 0}
                      % du total
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

// Styles
const cardSx = {
  p: 2,
  bgcolor: "#fff",
  borderRadius: 2,
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.08)",
  transition: "transform 0.3s, box-shadow 0.3s",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.12)",
  },
  height: "100%",
};

const cardContentSx = {
  display: "flex",
  alignItems: "center",
};

const chartCardSx = {
  p: 3,
  bgcolor: "#fff",
  borderRadius: 2,
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.08)",
  height: "100%",
};
