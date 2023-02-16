import { useEffect, useState } from "react";
import CountryCars from "./components/countryCard/CountryCard";
import { allCountries, countriesByName } from "./utils/helpers/data/country";
import { Country } from "./utils/helpers/types/Country";
import styles from "./App.module.scss";
import Select from "./components/select/Select";

function App() {
  const [allCountriesData, setAllCountriesData] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSort, setSelectedSort] = useState("");
  const [search, setSearch] = useState("");

  const fetchAllCountries = async () => {
    setLoading(true);
    const { data, error } = await allCountries();

    if (!error && data) {
      setAllCountriesData(data);
    }

    setLoading(false);
  };

  const fetchCountriesByname = async () => {
    setLoading(true);
    const { data, error } = await countriesByName(search);

    if (!error && data) {
      setAllCountriesData(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchAllCountries();
  }, []);

  const sortOptions = [
    { value: "asc", label: "Asc" },
    { value: "desc", label: "Desc" },
  ];

  useEffect(() => {
    if (search) {
      fetchCountriesByname();
    } else {
      fetchAllCountries();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div className={styles.wrapper}>
      <h1>Qoosi Test</h1>
      <div className={styles["input-wrapper"]}>
        <input
          type="text"
          className={styles.search}
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {loading ? (
        <img src="spinner.svg" alt="loading" className={styles.spinner} />
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
