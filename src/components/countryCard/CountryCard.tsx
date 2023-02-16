import { Country } from "../../utils/helpers/types/Country";
import styles from "./CountryCard.module.scss";

interface CountryCardProps {
  country: Country;
}

export default function CountryCards(props: CountryCardProps) {
  const { country } = props;
  const { altSpellings, cca2, cca3, flag, idd, name } = country;

  return (
    <div className={styles.card}>
      <img src={flag.png} alt={flag.alt} />
      <div className={styles.details}>
        <p>
          <strong>Name:</strong> <span>{name.official}</span>{" "}
        </p>
        <p>
          <strong>Alt Name: </strong> <span>{altSpellings}</span>{" "}
        </p>
        <p>
          <strong>Code: </strong>{" "}
          <span>
            {idd.root}
            {idd.suffixes && idd.suffixes[0]}
          </span>
        </p>
        <p>
          <strong>Character Code:</strong> <span>{cca2}</span>{" "}
        </p>
        <p>
          <strong>Character Code:</strong> <span>{cca3}</span>{" "}
        </p>
      </div>
    </div>
  );
}
