import React, { useState } from "react";
import { GoArrowRight } from "react-icons/go";
import axios from "axios";

//istek atacağımız api ve token
let BASE_URL = "https://api.freecurrencyapi.com/v1/latest";
let API_KEY = "fca_live_FWEcxAaRlzMPkBKxuznItsdnl072AG67fNDhWr1q";

function Currency() {
  const [amount, setAmount] = useState(); //çevrilmesini istediğimiz para miktarı
  const [fromCurrency, setFromCurrency] = useState("USD"); //girdiğimiz dövizin türü usd,eur,tl
  const [toCurrency, setToCurrency] = useState("TRY"); //çevrilmesini istediğimiz döviz türü
  const [result, setResult] = useState(); //çevirme sonucundaki değer

  //çevirme işlemi
  const exchange = async () => {
    // console.log(amount);
    // console.log(fromCurrency);
    // console.log(toCurrency);

    //girilen döviz türüne göre sonucunu istediğimiz türün değerlerini getirdik
    const response = await axios.get(
      `${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurrency}`
    );
    const result = (response.data.data[toCurrency] * amount).toFixed(2);
    setResult(result);
  };

  return (
    <div>
      <div className="h-screen  place-content-center">
        <div className=" w-1/2 h-96 bg-slate-50 bg-opacity-70 mx-auto shadow-md border ">
          <div className="h-20 bg-t_green flex items-center justify-center">
            <h2 className="text-2xl font-bold  uppercase text-white text-center">
              Dövİz Kuru Hesapla
            </h2>
          </div>
          <div className="flex justify-center items-center space-x-3 pt-10 ">
            <div>
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="input_style"
                type="number"
              />
              <select
                onChange={(e) => setFromCurrency(e.target.value)}
                className="input_style w-32"
                name=""
                id=""
              >
                <option>USD</option>
                <option>TRY</option>
                <option>EUR</option>
              </select>
            </div>
            <div>
              {/* <img src="/src/assets/images/Arrow 1.png" alt="" /> */}
              <GoArrowRight className="text-3xl text-t_green" />
            </div>
            <div>
              <select
                onChange={(e) => setToCurrency(e.target.value)}
                className="input_style"
                name=""
                id=""
              >
                <option>TRY</option>
                <option>USD</option>
                <option>EUR</option>
              </select>
              <input
                value={result}
                onChange={(e) => setResult(e.target.value)}
                className="input_style w-32"
                type="number"
              />
            </div>
          </div>
          <div className="text-center mt-8">
            <button
              onClick={exchange}
              className=" cursor-pointer px-16 py-2 bg-t_green text-white font-bold rounded-md"
            >
              ÇEVİR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Currency;
