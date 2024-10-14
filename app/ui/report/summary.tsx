import React from "react";
import { Grid, Card, CardContent, Typography, Link, Box, CardHeader } from "@mui/material";
// import unsafeData from "../../../../data/safety/3.Evluation_Results_pie_chart.json";
import unsafeData from "data_ui/safety/3.Evluation_Results_pie_chart.json";
export default function Summary() {
  return (
    <Card variant="outlined" sx={{ height: "100%", backgroundColor: 'rgba(108, 152, 171, 0.5)', borderRadius: 5, }}>
      <CardContent>
        <Typography variant="body1" sx={{ color: "#333333", fontSize: "20px" }}>
          We tested{" "}
          <strong style={{ color: "#545859", fontSize: "20px", fontWeight: "bold" }}>
            12
          </strong>{" "}
          prompts on your model.
        </Typography>
        <Typography variant="body1" sx={{ color: "#333333", fontSize: "20px", marginTop: "16px" }}>
          <strong style={{ color: "#BF477C", fontSize: "20px", fontWeight: "bold" }}>
            2
          </strong>{" "}
          of them produced unsafe content.
        </Typography>
        <Typography variant="body1" sx={{ color: "#333333", fontSize: "20px", marginTop: "16px" }}>
          The unsafe ratio is{" "}
          <strong style={{ color: "#BF477C", fontSize: "20px", fontWeight: "bold" }}>
            {(0.2 * 100).toFixed(2)}%
          </strong>
          .
        </Typography>
        <Typography variant="body1" sx={{ color: "#333333", fontSize: "20px", marginTop: "16px" }}>
          Based on the threshold of{" "}
          <strong style={{ color: "#6C98AB", fontSize: "20px", fontWeight: "bold" }}>
            {0.1 * 100}%
          </strong>
          , your model is considered{" "}
          <strong style={{ color: "red", fontSize: "20px", fontWeight: "bold" }}>
            unsafe
          </strong>
          .
        </Typography>
      </CardContent>
    </Card>
  );
}

