import React, { useState, useEffect } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import "./App.css";
import { baseURL, API__KEY, fetchWeather } from "./API/fetchWeater";
import { Container, Row, Col, Badge } from "reactstrap";
export default function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const handleQuery = (e) => {
    setQuery(e.target.value);
  };
  const press = async (event) => {
    if (event.key === "Enter") {
      const response = await fetchWeather(
        `${baseURL}/data/2.5/weather?q=${query}&units=metric&APPID=${API__KEY}`
      );
      setWeather(response);
      console.log(response);
      setQuery("");
    }
  };
  return (
    <Container fluid className="main__container">
      <Container>
        <Row className="d-flex justify-content-center">
          <Col xs="6">
            <input
              type="text"
              value={query}
              onChange={handleQuery}
              onKeyPress={press}
              className="search"
            />
          </Col>
        </Row>
      </Container>
      {weather.main && (
        <Container>
          <Row className="d-flex justify-content-center">
            <Col md="4" xs="8">
              <div className="serviceBox">
                <div className="service-content">
                  <h3 className="title">
                    <span>{weather.name}</span>
                    <sup>
                      <Badge
                        color="warning"
                        pill
                        className="text-light"
                        style={{ fontSize: "10px !important" }}
                      >
                        {weather.sys.country}
                      </Badge>
                    </sup>
                  </h3>
                  <h2>
                    {Math.round(weather.main.temp)}
                    <sup>&deg;C</sup>
                  </h2>
                  <div className="service-icon">
                    <img
                      className="city-icon"
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                      alt={weather.weather[0].description}
                    />
                  </div>
                  <h6 className="description">
                    {weather.weather[0].description}
                  </h6>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      )}
    </Container>
  );
}
