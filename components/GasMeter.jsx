import { useState, useEffect } from "react";
import styles from "../styles/GasMeter.module.css";

const GasMeter = ({ birthDate }) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    const calculateElapsedSeconds = () => {
      const birth = new Date(birthDate);
      const now = new Date();
      const diffInSeconds = Math.floor((now - birth) / 1000);
      setElapsedSeconds(diffInSeconds);
    };

    calculateElapsedSeconds();
    const interval = setInterval(calculateElapsedSeconds, 1000);

    return () => clearInterval(interval);
  }, [birthDate]);

  // 숫자를 개별 자릿수 배열로 변환
  const digits = String(elapsedSeconds).padStart(9, "0").split("");

  return (
    <div className={styles.gasMeter}>
      {digits.map((digit, index) => (
        <div key={index} className={styles.digitContainer}>
          <div
            className={styles.digit}
            style={{ transform: `translateY(-${digit * 10}%)` }}
          >
            {[...Array(10)].map((_, i) => (
              <div key={i} className={styles.number}>
                {i}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GasMeter;
