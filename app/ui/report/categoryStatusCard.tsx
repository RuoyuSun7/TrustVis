import { Card, CardHeader, colors, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { VictoryLabel, VictoryLegend, VictoryPie, VictoryTooltip } from 'victory';
import CategoryStatus from './categoryStatus';

interface StatusScoreProps {
  name: string;
  score: number;
  maxScore: number;
}

const CategoryStatusCard: React.FC<StatusScoreProps> = ({ name, score, maxScore }) => {
  return (
    <Link href="/tests" passHref>
      <Card sx={{ bgcolor: '#f3f6ff' }}>
        <CardHeader sx={{ marginLeft: 2, marginRight: 2 }}
          title={
            <Typography variant="h6" style={{ fontWeight: 'bold' }}>
              {name}
            </Typography>
          }
          action={
            <Typography gutterBottom variant="h6" component="div">
              {'>>'}
            </Typography>
          }
        />

        <CategoryStatus score={score} maxScore={100} />
      </Card>
    </Link>
  );
};

export default CategoryStatusCard;
