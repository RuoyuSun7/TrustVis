import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface StatusScoreProps {
  score: number;
  maxScore: number;
}

const StatusScore: React.FC<StatusScoreProps> = ({ score, maxScore }) => {
  const percentage = (score / maxScore) * 100;

  return (
    <div style={{ width: 200, height: 200, position: 'relative', marginLeft: 60, marginTop: 50 }}>
      <CircularProgressbar
        value={percentage}
        strokeWidth={10}
        styles={buildStyles({
          // pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
          pathColor: '#4cd964',
          trailColor: '#d6d6d6',
          pathTransitionDuration: 0.5,
        })}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 24, fontWeight: 'bold' }}>{score}</div>
        <div style={{ fontSize: 12, color: '#888' }}>/ {maxScore}</div>
      </div>
    </div>
  );
};

export default StatusScore;
