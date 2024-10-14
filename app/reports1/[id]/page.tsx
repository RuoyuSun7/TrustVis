"use client";
import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Tabs, Tab, Box, Paper, CardHeader } from '@mui/material';
import StatusScore from '@/app/ui/report/scores';
import Summary from '@/app/ui/report/summary';
import CategoryStatus from '@/app/ui/report/categoryStatus';
import Link from 'next/link';
import CategoryStatusCard from '@/app/ui/report/categoryStatusCard';
import { Category } from '@mui/icons-material';

const categories = [
  { name: 'Privacy', score: 96, maxScore: 100 },
  { name: 'Commitment to workers', score: 95, maxScore: 100 },
  { name: 'Equality', score: 88, maxScore: 100 },
  { name: 'Civil Rights', score: 92, maxScore: 100 },
  { name: 'Fraud Protection', score: 85, maxScore: 100 },
  { name: 'Creative Rights', score: 90, maxScore: 100 },
  { name: 'Crime Prevention', score: 89, maxScore: 100 },
];

export default function Page() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h1">Reports</Typography>
      </Grid>
      <Grid item xs={6}>
        <StatusScore score={78} maxScore={100} />
      </Grid>
      <Grid item xs={6}>
        <Summary />
      </Grid>
      {categories.map((category, index) => (
        <Grid item xs={6} key={index}>
          <CategoryStatusCard score={category.score} maxScore={category.maxScore} name={category.name} />
        </Grid>
      ))}
    </Grid>
  );
}