import { useState } from "react";
import { Row, Col, Form, Button, Container } from "react-bootstrap";

//fungsi utama dari komponen konversi
export default function CurrencyConverter() {
  //variabel untuk menampung nilai value dari pecahan mata uang
  const [inputValues, setInputValues] = useState([[]]);

  //variabel untuk memunculkan hasil konversi
  const [showResultTable, setShowResultTable] = useState(false);

  //variabel yang menampung value untuk list di opsi pemilihan mata uang
  const [currencies, setCurrencies] = useState([
    "USD",
    "AUD",
    "SGD",
    "CAD",
    "GBP",
    "EUR",
    "CHF",
    "JPY",
    "NZD",
    "KRW",
    "IDR",
  ]);

  //variabel yang menampung pecahan dari masing masing mata uang
  const currencyDenominationsMap = {
    USD: [100, 50, 20, 10, 5, 1],
    AUD: [100, 50, 20, 10, 5, 2, 1],
    SGD: [1000, 500, 200, 100, 50, 10],
    IDR: [100000, 50000, 20000, 10000, 5000, 2000, 1000, 500],
    CAD: [100, 50, 20, 10, 5, 1, 0.5, 0.25, 0.1, 0.05, 0.01],
    GBP: [100, 50, 20, 10, 5, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01],
    EUR: [500, 200, 100, 50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.01],
    CHF: [1000, 200, 100, 50, 20, 10, 5, 2, 1],
    JPY: [10000, 5000, 2000, 1000, 500, 100, 50, 10, 5, 1],
    NZD: [100, 50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1],
    KRW: [50000, 10000, 5000, 1000, 500, 100, 50, 10],
  };

  /*variabel bertipe object untuk menampung exchange rate masing masing pecahan
  exchange rates berikut berdasarkan update terakhir pada tanggal 29 desember 2023*/
  const [exchangeRates, setExchangeRates] = useState({
    USD: {
      EUR: 0.85,
      GBP: 0.73,
      JPY: 110.15,
      AUD: 1.46,
      SGD: 1.32,
      IDR: 15415,
      CAD: 1.32,
      CHF: 0.84,
      NZD: 1.58,
      KRW: 1287.06,
    },
    EUR: {
      USD: 1.18,
      AUD: 1.62,
      SGD: 1.46,
      IDR: 17059.78,
      CAD: 1.46,
      GBP: 0.86,
      CHF: 0.93,
      NZD: 1.75,
      JPY: 129.88,
      KRW: 1423.05,
    },
    AUD: {
      USD: 0.68,
      EUR: 0.62,
      SGD: 0.9,
      IDR: 10533.07,
      CAD: 0.9,
      GBP: 0.54,
      CHF: 0.58,
      NZD: 1.08,
      JPY: 96.64,
      KRW: 878.54,
    },
    SGD: {
      USD: 0.76,
      EUR: 0.68,
      AUD: 1.11,
      IDR: 11677.15,
      CAD: 1.0,
      GBP: 0.59,
      CHF: 0.64,
      NZD: 1.19,
      JPY: 107.15,
      KRW: 973.96,
    },
    IDR: {
      USD: 0.000065,
      EUR: 0.000059,
      AUD: 0.000095,
      SGD: 0.000086,
      CAD: 0.000086,
      GBP: 0.000051,
      CHF: 0.000055,
      NZD: 0.0001,
      JPY: 0.0092,
      KRW: 0.083,
    },
    CAD: {
      USD: 0.76,
      EUR: 0.68,
      AUD: 1.11,
      SGD: 1.0,
      IDR: 11655.07,
      GBP: 0.59,
      CHF: 0.64,
      NZD: 1.19,
      JPY: 106.93,
      KRW: 971.9,
    },
    GBP: {
      USD: 1.27,
      EUR: 1.15,
      AUD: 1.86,
      SGD: 1.68,
      IDR: 19629.46,
      CAD: 1.68,
      CHF: 1.07,
      NZD: 2.0,
      JPY: 180.08,
      KRW: 1637.25,
    },
    CHF: {
      USD: 1.19,
      EUR: 1.07,
      AUD: 1.74,
      SGD: 1.57,
      IDR: 18283.71,
      CAD: 1.57,
      GBP: 0.93,
      NZD: 1.87,
      JPY: 167.75,
      KRW: 1525.37,
    },
    NZD: {
      USD: 0.63,
      EUR: 0.57,
      AUD: 0.93,
      SGD: 0.84,
      IDR: 9770.03,
      CAD: 0.84,
      GBP: 0.5,
      CHF: 0.53,
      JPY: 89.66,
      KRW: 814.9,
    },
    JPY: {
      USD: 0.0071,
      EUR: 0.0064,
      AUD: 0.01,
      SGD: 0.0093,
      IDR: 108.95,
      CAD: 0.0093,
      GBP: 0.0055,
      CHF: 0.006,
      NZD: 0.011,
      KRW: 9.09,
    },
    KRW: {
      USD: 0.00078,
      EUR: 0.0007,
      AUD: 0.0011,
      SGD: 0.001,
      IDR: 11.97,
      CAD: 0.001,
      GBP: 0.00061,
      CHF: 0.00065,
      NZD: 0.0012,
      JPY: 0.11,
    },
  });

  //variabel yang menampung data konversi berupa objek yaitu pecahan mata uang asal, pecahan mata uang tujuan beserta dengan pecahan nilai yang berlaku
  const [conversionData, setConversionData] = useState([
    { fromCurrency: "", toCurrency: "", denominations: [] }, //variabel ini berstruktur data array of objek, yang mana atribut di dalamnya yaitu ada konversi asal, tujuan konversi dan juga pecahan mata uang yang berlaku di konversi
  ]);

  //variabel yang berfungsi untuk mengupdate value dari array konversi data, mulai dari konversi asal hingga pecahan mata uang yang berlaku
  const handleFromCurrencyChange = (index, value) => {
    const updatedData = [...conversionData];
    updatedData[index].fromCurrency = value;
    updatedData[index].denominations = currencyDenominationsMap[value] || []; //update akan dilakukan ketika user melakukan atau memberikan event pada tombol from currency berikut
    setConversionData(updatedData);

    // mengupdate input value / kolom value kosong ketika tambah pecahan yang baru
    const updatedValues = [...inputValues];
    updatedValues[index] = Array(updatedData[index].denominations.length).fill(
      ""
    );
    setInputValues(updatedValues);
  };

  //input jumlah pecahan uang
  const handleInputChange = (rowIndex, denominationIndex, value) => {
    const updatedValues = [...inputValues];
    updatedValues[rowIndex][denominationIndex] = value;
    setInputValues(updatedValues);
  };

  //mengupdate variabel konversi mata uang tujuan
  const handleToCurrencyChange = (index, value) => {
    const updatedData = [...conversionData];
    updatedData[index].toCurrency = value;
    setConversionData(updatedData);
  };

  //melakukan kalkulasi masing-masing pecahan mata uang yang diinputkan
  const calculateTotal = (rowIndex) => {
    const denominations = conversionData[rowIndex].denominations;
    const values = inputValues[rowIndex] || [];
    const total = denominations.reduce((accumulation, denomination, index) => {
      //
      return accumulation + denomination * (parseFloat(values[index]) || 0);
    }, 0);
    return total.toFixed(2);
  };

  //variabel untuk tambah baris
  const handleAddRow = () => {
    const newToCurrency =
      conversionData.length > 0
        ? conversionData[conversionData.length - 1].toCurrency //mengambil value dari tujuan konversi untuk digunakan di konversi data ke-dua dan seterusnya
        : currencies[0];

    const newConversionData = {
      fromCurrency: "",
      toCurrency: newToCurrency,
      denominations: [],
    };

    setConversionData([...conversionData, newConversionData]);

    //menginisialisasi input value dengan nilai kosong untuk masing masing pecahan di baris yang baru
    const newInputValues = [
      ...inputValues,
      Array(newConversionData.denominations.length).fill(""), //input values disediakan string kosong
    ];
    setInputValues(newInputValues);
  };

  //variabel untuk menghapus baris sekaligus menghapus index paling terakhir dari pecahan mata uang
  const handleRemoveRow = (index) => {
    const updatedData = [...conversionData];
    updatedData.splice(index, 1);
    setConversionData(updatedData);

    const updatedValues = [...inputValues];
    updatedValues.splice(index, 1);
    setInputValues(updatedValues);
  };

  //variabel untuk mengkalkulasi konversi mata uang untuk keperluan total konversi
  const calculateConvercy = (index) => {
    const fromCurrency = conversionData[index].fromCurrency;
    const toCurrency = conversionData[index].toCurrency;

    // Ambil nilai tukar dari exchangeRates
    const exchangeRate =
      exchangeRates[fromCurrency] && exchangeRates[fromCurrency][toCurrency]
        ? exchangeRates[fromCurrency][toCurrency]
        : 1.0;

    // Kalikan total dengan nilai tukar
    const convertedTotal = calculateTotal(index) * exchangeRate;
    return convertedTotal.toFixed(2);
  };

  //melakukan kalkulasi total konversi yang dihasilkan
  const calculateTotalConvertedAmount = () => {
    let totalConvertedAmount = 0;

    conversionData.forEach((item, index) => {
      //perulangan dari setiap elemen yang ada di konversi data (terutama untuk konversi yang lebih dari 1 mata uang asal)
      totalConvertedAmount += parseFloat(calculateConvercy(index)) || 0;
    });

    return totalConvertedAmount.toFixed(2);
  };

  //fungsi untuuk melakukan pemecahan ke masing-masing nominal yang berlaku
  const greedyBreakdown = (total, targetCurrency) => {
    let remainingAmount = total;

    const counts = currencyDenominationsMap[targetCurrency].map(
      (denomination) => {
        const count = Math.floor(remainingAmount / denomination); //dimulai dari pembagian dengan pembulatan kebawah
        remainingAmount = remainingAmount % denomination; //update nilai remaining untuk digunakan di pengecekan berikutnya
        return count;
      }
    );

    //result disini untuk menampung hasil nominal pecahan sesuai dengan nominal pecahannya masing-masing
    let result = "";
    counts.forEach((count, index) => {
      result += `${currencyDenominationsMap[targetCurrency][index]} x ${count}, `;
    });

    return { result, remainingAmount };
  };

  return (
    <>
      {/* container untuk tabel input pemilihan mata uang */}
      <Container className="tabel-data-konversi text-align-center">
        <h1>Konversi Mata Uang Anda.</h1>
        {conversionData.map((item, index) => (
          <Row
            md={4}
            key={index}
            style={{ border: "1px solid black" }}
            className="text-center"
          >
            <Col md={4}>
              <Form.Select
                value={item.fromCurrency}
                onChange={(e) =>
                  handleFromCurrencyChange(index, e.target.value)
                }
              >
                <option value="" disabled>
                  {"Pecahan Mata Uang Asal"}
                </option>
                {currencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col md={4}>Konversi ke {item.toCurrency}</Col>
            <Col md={4}>
              <Form.Select
                value={item.toCurrency}
                onChange={(e) => handleToCurrencyChange(index, e.target.value)}
              >
                <option value={conversionData[0].toCurrency} disabled>
                  {conversionData[0].toCurrency}
                </option>
                {currencies.map((currency) => (
                  <option
                    key={currency}
                    value={currency}
                    disabled={
                      index > 0 && currency !== conversionData[0].toCurrency
                    }
                  >
                    {currency}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col md={12}>
              <Button
                className="mb-2"
                variant="danger"
                onClick={() => handleRemoveRow(index)}
              >
                Hapus Data Konversi
              </Button>
            </Col>
          </Row>
        ))}
        <Row className="text-center">
          <Col md={12}>
            <Button className="mt-4" variant="primary" onClick={handleAddRow}>
              Tambah Data Konversi
            </Button>
          </Col>
        </Row>
      </Container>

      <Container className="tabel-input-uang mt-5">
        <h2>Input Jumlah Mata Uang yang Dimiliki: </h2>
        {conversionData.map((item, index) => (
          <Row
            md={4}
            key={index}
            style={{ border: "1px solid black" }}
            className="text-center"
          >
            <Col md={12}>
              <h3 className="my-3">Pecahan Mata Uang: {item.fromCurrency}</h3>
            </Col>
            <Col md={12} className="d-flex flex-wrap justify-content-center">
              {item.denominations.map((denomination, dIndex) => (
                <Col style={{ margin: "12px" }} key={dIndex} size="lg" sm={3}>
                  {denomination} x{" "}
                  <input
                    type="number"
                    value={inputValues[index][dIndex] || ""}
                    onChange={(e) =>
                      handleInputChange(index, dIndex, e.target.value)
                    }
                  />
                </Col>
              ))}
            </Col>
            <Col md={12}>
              <p className="border bolder">Total: {calculateTotal(index)}</p>
            </Col>
          </Row>
        ))}
        <Row className="text-center">
          <Col md={12}>
            <Button
              className="mt-4"
              variant="success"
              onClick={() => setShowResultTable(true)}
            >
              Konversi
            </Button>
          </Col>
        </Row>
      </Container>

      {showResultTable && (
        <Container className="tabel-hasil-konversi">
          <h2>Hasil Konversi Pecahan Anda: </h2>
          {conversionData.map((item, index) => (
            <Row
              md={4}
              key={index}
              style={{ border: "1px solid black" }}
              className="text-center"
            >
              <Col md={12}>
                <h3 className="my-3">
                  Konversi Mata Uang ke {item.fromCurrency} ke {item.toCurrency}
                </h3>
                <p>
                  Total: {calculateTotal(index)} {item.fromCurrency}
                </p>
                <strong>
                  Konversi: {calculateConvercy(index)} {item.toCurrency}
                </strong>
              </Col>
            </Row>
          ))}
          <Row style={{ border: "1px solid black" }} className="mb-5">
            <Col md={12}>
              <h4 className="text-center mt-3">
                Total Uang Pecahan Anda: {calculateTotalConvertedAmount()}
              </h4>
              <p className="text-center">
                Hasil Pembagian:{" "}
                {
                  greedyBreakdown(
                    calculateTotalConvertedAmount(),
                    conversionData[0].toCurrency
                  ).result
                }
              </p>
              <p className="text-center">
                Sisa Uang:{" "}
                {greedyBreakdown(
                  calculateTotalConvertedAmount(),
                  conversionData[0].toCurrency
                ).remainingAmount.toFixed(2)}
              </p>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}
