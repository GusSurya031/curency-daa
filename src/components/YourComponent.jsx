import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const YourComponent = () => {
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

  const [conversionData, setConversionData] = useState([
    { fromCurrency: "", toCurrency: "" },
  ]);

  const handleFromCurrencyChange = (index, value) => {
    const updatedData = [...conversionData];
    updatedData[index].fromCurrency = value;
    setConversionData(updatedData);
  };

  const handleToCurrencyChange = (index, value) => {
    const updatedData = [...conversionData];
    updatedData[index].toCurrency = value;
    setConversionData(updatedData);
  };

  const handleAddRow = () => {
    setConversionData([
      ...conversionData,
      { fromCurrency: "", toCurrency: "" },
    ]);
  };
  const handleRemoveRow = (index) => {
    if (indeks >= 0 && indeks < data.length) {
      const newData = [...data.slice(0, indeks), ...data.slice(indeks + 1)];
      // const updatedData = [...conversionData];
      // updatedData.splice(index, 1);
      setConversionData(updatedData);
    }
    return (
      <>
        <Container>
          {conversionData.map((item, index) => (
            <Row
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
                    {" "}
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
                  onChange={(e) =>
                    handleToCurrencyChange(index, e.target.value)
                  }
                >
                  <option value="" disabled>
                    {" "}
                  </option>
                  {currencies.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          ))}
          <Row className="text-align-center">
            <Col md={6}>
              <Button variant="primary" onClick={handleAddRow}>
                Tambah Data Konversi
              </Button>
            </Col>
            <Button
              variant="danger"
              onClick={() => handleRemoveRow(data.length)}
            >
              Hapus Data Konversi
            </Button>
            <Col md={6}></Col>
          </Row>
        </Container>
      </>
    );
  };

  export default YourComponent;
};
