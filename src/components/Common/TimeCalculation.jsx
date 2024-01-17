import React, { useEffect, useState } from "react";


const TimeCalculation = ({ data }) => {
  const [timeDifference, setTimeDifference] = useState(null);

  useEffect(() => {
    // Given date
    const givenDate = new Date(data);

    // Current date
    const currentDate = new Date();

    // Calculate the difference in milliseconds
    const differenceInMilliseconds = currentDate - givenDate;

    // Calculate seconds, minutes, hours, days, months, and years
    const seconds = Math.floor(differenceInMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30); // This is a rough estimate
    const years = Math.floor(months / 12); // This is a rough estimate

    // Set the calculated difference in state
    setTimeDifference({
      years,
      months,
      days,
      hours,
      minutes,
      seconds,
    });
  }, [data]);

  const getFirstNonZeroUnit = () => {
    if (!timeDifference) {
      return null;
    }

    if (timeDifference.years !== 0) {
      return { unit: "Years", value: timeDifference.years };
    }
    if (timeDifference.months !== 0) {
      return { unit: "Months", value: timeDifference.months };
    }
    if (timeDifference.days !== 0) {
      return { unit: "Days", value: timeDifference.days };
    }
    if (timeDifference.hours !== 0) {
      return { unit: "Hours", value: timeDifference.hours };
    }
    if (timeDifference.minutes !== 0) {
      return { unit: "Minutes", value: timeDifference.minutes };
    }
    if (timeDifference.seconds !== 0) {
      return { unit: "Seconds", value: timeDifference.seconds };
    }

    return null; // No non-zero units found
  };

  const firstNonZeroUnit = getFirstNonZeroUnit();

  return (
    <>
      {firstNonZeroUnit && (
        <p style={{ position: "absolute", right: "10px", fontSize: "10px" }}>
          {firstNonZeroUnit.value}&nbsp;{firstNonZeroUnit.unit}&nbsp;Ago
        </p>
      )}
    </>
  );
};

export default TimeCalculation;
