import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import "../Components/EnhancedLoading.css";
const EnhancedLoading = ({ isLoading }) => {
  const [loadingStage, setLoadingStage] = useState(0);
  const loadingStages = [
    'Analysing relevant sites.....',
    'Extracting from relevant sites.....',
    'Analysing data.....'
  ];

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setLoadingStage((prevStage) => (prevStage + 1) % loadingStages.length);
      }, 3000); // Change stage every 2 seconds

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="loading-container">
      <p className="loading-stage">{loadingStages[loadingStage]}</p>
    </div>
  );
};

EnhancedLoading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default EnhancedLoading;