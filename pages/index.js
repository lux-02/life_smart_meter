import { useState } from "react";
import GasMeter from "../components/GasMeter";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [dateInput, setDateInput] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");

  const formatDateInput = (input) => {
    // 숫자가 아닌 문자 제거
    const numbers = input.replace(/\D/g, "");

    // 최대 8자리로 제한
    const trimmed = numbers.slice(0, 8);

    // YYYY-MM-DD 형식으로 포맷팅
    if (trimmed.length > 4) {
      if (trimmed.length > 6) {
        return `${trimmed.slice(0, 4)}-${trimmed.slice(4, 6)}-${trimmed.slice(
          6
        )}`;
      }
      return `${trimmed.slice(0, 4)}-${trimmed.slice(4)}`;
    }
    return trimmed;
  };

  const validateDate = (dateString) => {
    // YYYYMMDD 형식으로 변환
    const cleanDate = dateString.replace(/-/g, "");
    if (cleanDate.length !== 8) return false;

    const year = parseInt(cleanDate.substring(0, 4));
    const month = parseInt(cleanDate.substring(4, 6));
    const day = parseInt(cleanDate.substring(6, 8));

    // 날짜 유효성 검사
    const date = new Date(year, month - 1, day);
    if (
      date.getFullYear() !== year ||
      date.getMonth() + 1 !== month ||
      date.getDate() !== day
    ) {
      return false;
    }

    // 미래 날짜 검사
    if (date > new Date()) {
      return false;
    }

    return true;
  };

  const handleInputChange = (e) => {
    const formattedInput = formatDateInput(e.target.value);
    setDateInput(formattedInput);

    // 입력이 완료되었을 때 유효성 검사
    if (formattedInput.replace(/-/g, "").length === 8) {
      if (validateDate(formattedInput)) {
        setError("");
        const [year, month, day] = formattedInput.split("-");
        const isoDate = `${year}-${month}-${day}`;
        setBirthDate(isoDate);
        setIsValid(true);
      } else {
        setError("ERROR");
        setIsValid(false);
      }
    } else {
      setIsValid(false);
    }
  };

  return (
    <div className={styles.container}>
      {!isValid && (
        <div className={styles.introSection}>
          <div className={styles.readmeContent}>
            <div className={styles.logoBox}>
              <img
                className={styles.logoImg}
                src="/screenshots/lsm_ico.png"
              ></img>
            </div>
            <p>
              Life is like a meter. The moment we are born, a sealed valve is
              released, and the numbers begin to rise—quietly yet steadily, one
              by one.
            </p>
            <p>
              These numbers are not merely measures of time; they are the traces
              of our journey, the evidence of our experiences, our joys, and our
              sorrows.
            </p>
            <p>
              The soaring numbers symbolize the unforeseen uncertainty of the
              future. In the relentless flow of time, I embrace the knowledge
              that my existence is etched into these ever-increasing digits.
            </p>
          </div>
        </div>
      )}

      <div
        className={`${styles.inputSection} ${
          isValid ? styles.counterMode : ""
        }`}
      >
        <div className={styles.inputContainer}>
          <input
            type="text"
            value={dateInput}
            onChange={handleInputChange}
            placeholder="YYYYMMDD"
            className={styles.input}
            maxLength="10"
          />
          {error && <p className={styles.error}>{error}</p>}
        </div>
      </div>

      {isValid && <GasMeter birthDate={birthDate} />}
    </div>
  );
}
