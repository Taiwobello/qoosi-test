import { useEffect, useState } from "react";
import CountryCars from "./components/countryCard/CountryCard";
import { allCountries } from "./utils/helpers/data/country";
import { Country } from "./utils/helpers/types/Country";
import styles from "./App.module.scss";

function App() {
  const [allCountriesData, setAllCountriesData] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAllCountries = async () => {
    setLoading(true);
    const { data, error } = await allCountries();

    if (!error && data) {
      setAllCountriesData(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchAllCountries();
  }, []);

  console.log(allCountriesData);

  return (
    <div className={styles.wrapper}>
      <h1>Qoosi Test</h1>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className={styles["country-wrapper"]}>
          {allCountriesData.map((country, index) => (
            <CountryCars key={index} country={country} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
