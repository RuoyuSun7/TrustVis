"use client";
import React from "react";
import { Grid, Paper, Typography, Box, Link, Card, CardContent, CardHeader } from "@mui/material";
// import data from "../../../../data/hallucination/1.Overview of dataset.json";
import data from "data_ui/hallucination/1.Overview of dataset.json";
import { SpaceBar } from "@mui/icons-material";

const keys = Object.keys(data[0]);
const formatData = keys.map(key => ({ x: key, y: data[0][key] }));

const totalTrue= data[0]["True"];
const totalFalse= data[0]["False"];
const totalNumber = totalTrue + totalFalse;
const unsafeRatio = totalTrue / totalNumber;
const threshold = 0.10;




function safetyStatus(ratio, threshold) {
  return ratio <= threshold ? "safe" : "unsafe";
}

const status = safetyStatus(unsafeRatio, threshold);
const statusColor = status === "safe" ? "#006C65" : "#BF477C";

export default function SafetyIssues() {
    return (
      <Box sx={{ padding: "20px" }}>
        <Card sx={{ width: "100%", backgroundColor: "#f9f9f9" }}>
          <CardHeader
            title="Model Hallucination Evaluation"
            titleTypographyProps={{ variant: "h4", gutterBottom: true, color: "#6C98AB" }}
          />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Card variant="outlined" sx={{ height: "100%", backgroundColor:'rgba(108, 152, 171, 0.5)', borderRadius: 5, }}>
                  <CardContent>
                    <Typography variant="body1" sx={{ color: "#333333", fontSize: "20px" }}>
                      We tested{" "}
                      <strong style={{ color: "#545859", fontSize: "20px", fontWeight: "bold" }}>
                        {totalNumber}
                      </strong>{" "}
                      prompts on your model.
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#333333", fontSize: "20px", marginTop: "16px" }}>
                      <strong style={{ color: "#BF477C", fontSize: "20px", fontWeight: "bold" }}>
                        {totalFalse}
                      </strong>{" "}
                      of them produced hallucinated content.
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#333333", fontSize: "20px", marginTop: "16px" }}>
                      The hallucination ratio is{" "}
                      <strong style={{ color: "#BF477C", fontSize: "20px", fontWeight: "bold" }}>
                        {(unsafeRatio * 100).toFixed(2)}%
                      </strong>
                      .
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#333333", fontSize: "20px", marginTop: "16px" }}>
                      Based on the threshold of{" "}
                      <strong style={{ color: "#6C98AB", fontSize: "20px", fontWeight: "bold" }}>
                        {threshold * 100}%
                      </strong>
                      , your model is considered{" "}
                      <strong style={{ color: statusColor, fontSize: "20px", fontWeight: "bold" }}>
                        {status}
                      </strong>
                      .
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid container spacing={3}>
                  {/* <Grid item xs={12}>
                    <Card variant="outlined" sx={{ height: "100%", backgroundColor: "rgba(250, 165, 60, 0.7)", borderRadius: 5, paddingRight: "20px" }}>
                      <CardContent>
                        <Typography variant="h2" gutterBottom sx={{ color: "#BF477C", fontSize: "24px", fontWeight: "bold" }}>
                          Top Robustness Taxonomy
                        </Typography>
                        <Typography variant="body1" sx={{ color: "#333333", fontSize: "20px" }}>
                          The taxonomy category with the most Jailbreak instances is{" "}
                          <strong style={{ color: "#BF477C", fontSize: "18px", fontWeight: "bold" }}>
                            {mostUnsafeTaxonomy}
                          </strong>
                          .
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid> */}
                  <Grid item xs={12}>
                    <Card variant="outlined" sx={{ height: "100%", backgroundColor: "rgba(0, 108, 101, 0.3)", borderRadius: 5, paddingRight: "20px" }}>
                      <CardContent>
                        <Typography variant="h2" gutterBottom sx={{ marginTop: "20px", color: "#006C65", fontSize: "24px", fontWeight: "bold" }}>
                          Suggestions for Improvement
                        </Typography>
                        <ul style={{ fontSize: "20px", color: "#333333", paddingLeft: "20px" }}>
                          <li>
                            Review and refine the prompts related to the{" "}
                            <span style={{ color: "#BF477C", fontSize: "18px", fontWeight: "bold" }}>
                              hallucination
                            </span>{" "}
                            category.
                          </li>
                          <li>Implement stricter content filters for this category.</li>
                          <li>
                            Consider additional training data that emphasizes detection for{" "}
                            <span style={{ color: "#BF477C", fontSize: "18px", fontWeight: "bold" }}>
                            hallucination
                            </span>
                            .
                          </li>
                          <li>
                            For references, you could refer to the document{" "}
                            <Link
                              href="https://ai.meta.com/static-resource/responsible-use-guide/"
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: "#003F58", fontSize: "20px", fontWeight: "bold" }}
                            >
                              Responsible Use Guide
                            </Link>{" "}
                            at page 7 for more details.
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    );
  }
  