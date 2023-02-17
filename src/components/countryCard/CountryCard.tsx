import { useState } from "react";
import { Country } from "../../utils/helpers/types/Country";
import Modal from "../modal/Modal";
import styles from "./CountryCard.module.scss";

interface CountryCardProps {
  country: Country;
}

export default function CountryCards(props: CountryCardProps) {
  const { country } = props;
  const { altSpellings, cca2, cca3, flag, idd, name } = country;

  const [showCountryViewModal, setShowCountryViewModal] = useState(false);
  const [record, setRecord] = useState<Country | null>(null);

  const displayCountryViewModal = () => {
    setShowCountryViewModal(true);
    setRecord(country);
  };

  const dismissCountryViewModal = () => {
    setShowCountryViewModal(false);
    setRecord(null);
  };

  return (
    <>
      <CountryViewModal
        visible={showCountryViewModal}
        cancel={dismissCountryViewModal}
        record={record}
      />
      <div className={styles.card} onClick={() => displayCountryViewModal()}>
        <img src={flag.png} alt={flag.alt} className={styles["flag-img"]} />
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
    </>
  );
}

interface CountryViewProps {
  visible: boolean;
  cancel: () => void;
  record: Country | null;
}

const CountryViewModal = (props: CountryViewProps) => {
  const { visible, cancel, record } = props;

  return (
    <Modal visible={visible} cancel={cancel} className={styles.modal}>
      <img
        src={record?.flag.png}
        alt={record?.flag.alt}
        className={styles["modal-flag"]}
      />
      <div className={styles.details}>
        <p>
          <strong>Name:</strong> <span>{record?.name.official}</span>{" "}
        </p>
        <p>
          <strong>Alt Name: </strong> <span>{record?.altSpellings}</span>{" "}
        </p>
        <p>
          <strong>Code: </strong>{" "}
          <span>
            {record?.idd.root}
            {record?.idd.suffixes && record?.idd.suffixes[0]}
          </span>
        </p>
        <p>
          <strong>Character Code:</strong> <span>{record?.cca2}</span>{" "}
        </p>
        <p>
          <strong>Character Code:</strong> <span>{record?.cca3}</span>{" "}
        </p>
      </div>
    </Modal>
  );
};
