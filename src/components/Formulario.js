import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import useMoneda from "../hooks/useMoneda";
import useCriptomonedas from "../hooks/useCriptomonedas";
import axios from "axios";
import Error from "./Error";

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;

  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;

const Formulario = ({setMoneda, setCriptoMoneda}) => {
  const [listaCripto, setListaCripto] = useState([]);

  const [error, setError] = useState(false);

  const MONEDAS = [
    { codigo: "USD", nombre: "Dólar Americano" },
    { codigo: "MXN", nombre: "Peso Mexicano" },
    { codigo: "EUR", nombre: "Euro" },
    { codigo: "GBP", nombre: "Libra esterlina" },
  ];

  const [moneda, SelectMoneda] = useMoneda("Elige tu Moneda", "", MONEDAS);

  const [cripto, SeleccionarCripto] = useCriptomonedas(
    "Elige tu Criptomoneda",
    "",
    listaCripto
  );

  useEffect(() => {
    const consultarAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

      const resultado = await axios.get(url);

      setListaCripto(resultado.data.Data);
    };

    consultarAPI();
  }, []);

  const cotizarMoneda = (e) => {
    e.preventDefault();

    if (moneda === "" || cripto === "") {
      setError(true);
      return;
    }

    setError(false);

    setMoneda(moneda);
    setCriptoMoneda(cripto);
  };

  return (
    <form onSubmit={cotizarMoneda}>
      {error ? <Error mensaje="Hay un error"></Error> : null}
      <SelectMoneda></SelectMoneda>
      <SeleccionarCripto></SeleccionarCripto>
      <Boton type="submit" value="Calcular" />
    </form>
  );
};

export default Formulario;
