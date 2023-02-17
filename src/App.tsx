import { useEffect, useState } from "react";
import { allCountries, countriesByName } from "./utils/helpers/data/country";
import { Country } from "./utils/helpers/types/Country";
import styles from "./App.module.scss";
import Select from "./components/select/Select";
import CountryCards from "./components/countryCard/CountryCard";
import Pagination from "./components/paginate/Paginate";

function App() {
  const [allCountriesData, setAllCountriesData] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSort, setSelectedSort] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 25;
  const indexOfLastItem: number = currentPage * itemsPerPage;
  const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;
  const [currentCountries, setCurrentCountries] = useState<Country[]>([]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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

  function sortCountryOrder(order: string) {
    if (order === "asc") {
      const sortedCountries = [...currentCountries].sort(function (a, b) {
        return a.name.official.localeCompare(b.name.official);
      });
      setCurrentCountries(sortedCountries);
    } else {
      const sortedCountries = [...currentCountries].sort(function (a, b) {
        return b.name.official.localeCompare(a.name.official);
      });
      setCurrentCountries(sortedCountries);
    }
  }

  const sortOptions = [
    { value: "asc", label: "Ascending" },
    { value: "desc", label: "Descending" },
  ];

  useEffect(() => {
    fetchAllCountries();
  }, []);

  useEffect(() => {
    if (search) {
      fetchCountriesByname();
    } else {
      fetchAllCountries();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    if (selectedSort) {
      sortCountryOrder(selectedSort);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSort]);

  useEffect(() => {
    setCurrentCountries(
      allCountriesData.slice(indexOfFirstItem, indexOfLastItem)
    );
  }, [allCountriesData, indexOfFirstItem, indexOfLastItem]);

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
        <Select
          options={sortOptions}
          onSelect={(value) => setSelectedSort(value as string)}
          value={selectedSort}
          placeholder="Select Sort"
          className={styles.select}
        />
      </div>
      {loading ? (
        <img src="spinner.svg" alt="loading" className={styles.spinner} />
      ) : (
        <div className={styles["country-wrapper"]}>
          {currentCountries.map((country, index) => (
            <CountryCards key={index} country={country} />
          ))}
        </div>
      )}
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={allCountriesData.length}
        paginate={paginate}
      />
    </div>
  );
}

export default App;
